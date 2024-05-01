// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from 'components/base/Button';
// import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from 'Actions/UpdateProfile';
import redirect from 'Actions/Redirect';
import { decrypt, encrypt } from 'Actions/AESUtil';
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ToastContext } from 'providers/ToastProvider';

interface SessionData {
  isLoggedIn: boolean;
  sessionToken: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const getEmailFromJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jwt = JSON.parse(window.atob(base64));
  return jwt.email;
};

// Function to update session in localStorage
const updateSession = (sessionToken: string, email: string) => {
  const date = new Date();
  const session: SessionData = {
    sessionToken: sessionToken,
    isLoggedIn: true,
    email: email,
    created_at: date.toISOString(),
    updated_at: date.toISOString()
  };

  // Save session to localStorage
  localStorage.setItem('session', JSON.stringify(session));
};

const AuthSocialButtons = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const onGoogleSuccess = (response: any) => {
    const credential = response.credential;
    // const URL = 'https://engine.qberi.com/api/googleLogin';
    const URL = 'http://localhost:8080/api/googleLogin';
    const data = {
      idToken: credential
    };
    const encryptedData = encrypt(JSON.stringify(data));
    axios
      .post(URL, encryptedData, { headers: { 'Content-Type': 'text/plain' } })
      .then(async response => {
        const data = response.data;
        const decryptedData = decrypt(data);
        const sessionToken = decryptedData.split('=')[1].split(';')[0];
        if (!sessionToken) {
          console.error('Invalid email or password in ', title);
          showToast('Invalid email or password', 'error');
          return;
        }
        localStorage.setItem('sessionToken', sessionToken);
        updateSession(sessionToken, getEmailFromJWT(credential));
        await UpdateProfile();
        showToast('Login Successful', 'success');
        setTimeout(() => {
          const nextPath = redirect();
          navigate(nextPath);
        }, 1000);
      })
      .catch(error => {
        console.error('Error fetching profile data: in ', error);
        showToast('Error fetching profile data', 'error');
      });
  };

  return (
    <>
      {/* <Button
        variant="phoenix-secondary"
        className="w-100 mb-3"
        startIcon={
          <FontAwesomeIcon icon={faGoogle} className="text-danger me-2 fs-9" />
        }
      >
        {title} with google
      </Button> */}
      <GoogleLogin
        theme="outline"
        onSuccess={onGoogleSuccess}
        onError={() => console.log('Login Failed')}
        size="large"
        text="continue_with"
        useOneTap
        width={400}
      />
      {/* <Button
        variant="phoenix-secondary"
        className="w-100"
        startIcon={
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-primary me-2 fs-9"
          />
        }
      >
        {title} with facebook
      </Button> */}
    </>
  );
};

export default AuthSocialButtons;
