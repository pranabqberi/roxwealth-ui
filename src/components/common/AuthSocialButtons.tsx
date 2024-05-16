import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { SitemapContext } from 'providers/SitemapProvider';

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
  const onGoogleSuccess = async (response: any) => {
    const credential = response.credential;
    const URL = 'https://engine.qberi.com/api/googleLogin';
    const data = {
      idToken: credential
    };
    try {
      const response = await axios.post(URL, data);
      const responseData = response.data;
      const sessionToken = responseData.split('=')[1].split(';')[0];
      if (!sessionToken) {
        console.error('Invalid email or password in ', title);
        return;
      }
      localStorage.setItem('sessionToken', sessionToken);
      updateSession(sessionToken, getEmailFromJWT(credential));
      navigate('/profile');
    } catch (error) {
      console.error('Error fetching profile data: in ', error);
    }
  };

  return (
    <>
      <GoogleLogin
        theme="outline"
        onSuccess={onGoogleSuccess}
        onError={() => console.log('Login Failed')}
        size="large"
        text="continue_with"
        useOneTap
        width={400}
      />
    </>
  );
};

export default AuthSocialButtons;
