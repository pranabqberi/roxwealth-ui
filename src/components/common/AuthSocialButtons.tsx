// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from 'components/base/Button';
// import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import UpdateProfile from 'Actions/UpdateProfile';
import redirect from 'Actions/Redirect';
// import { useNavigate } from 'react-router-dom';

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
  const onGoogleSuccess = (response: any) => {
    const credential = response.credential;
    const URL = 'https://engine.qberi.com/api/googleLogin';
    const data = {
      idToken: credential
    };
    axios
      .post(URL, data)
      .then(response => {
        const data = response.data;
        const sessionToken = data.split('=')[1].split(';')[0];
        if (!sessionToken) {
          console.error('Invalid email or password in ', title);
          return;
        }
        localStorage.setItem('sessionToken', sessionToken);
        updateSession(sessionToken, getEmailFromJWT(credential));
        UpdateProfile();
        const nextPath = redirect();
        // delay for 1 second before redirecting
        setTimeout(() => navigate(nextPath), 1000);
      })
      .catch(error => {
        console.error('Error fetching profile data: in ', error);
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
        theme="filled_blue"
        onSuccess={onGoogleSuccess}
        onError={() => console.log('Login Failed')}
        size="large"
        text="continue_with"
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
