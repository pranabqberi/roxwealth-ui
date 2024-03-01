import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import validateSession from 'Actions/validateSession';

// Define interface for session data
interface SessionData {
  isLoggedIn: boolean;
  sessionToken: string;
  created_at: string;
  updated_at: string;
}

// Define interface for application data
interface AppData {
  session?: SessionData;
  userData?: {
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
    profileUrl: string;
    role: string;
  };
}

// List of admin emails
const admins = [
  'nitish2@qberi.com',
  'rohan2@qberi.com',
  'pranab@qberi.com',
  'jaco@qberi.com'
];

// Function to update user data in localStorage
const updateUserData = async (email: string, sessionToken: string) => {
  const URL = 'https://engine.qberi.com/api/getProfile/' + email;

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    };
    const response = await axios.get(URL, { headers: headers });
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202
    ) {
      const res = response.data;
      console.log('User data:', res);
      const userData = {
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        mobile: res.mobile,
        profileUrl: res.profileUrl,
        role: admins.includes(res.email) ? 'admin' : 'user'
      };
      saveUserData(userData); // Save user data to localStorage
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Function to save user data to localStorage
const saveUserData = (userData: AppData['userData']) => {
  const data = localStorage.getItem('appData');
  const appData: AppData = data ? JSON.parse(data) : {};
  appData.userData = userData;
  localStorage.setItem('appData', JSON.stringify(appData));
};

// Function to update session in localStorage
const updateSession = (sessionToken: string) => {
  const date = new Date();
  const session: SessionData = {
    sessionToken: sessionToken,
    isLoggedIn: true,
    created_at: date.toISOString(),
    updated_at: date.toISOString()
  };

  const data = localStorage.getItem('appData');
  const appData: AppData = data ? JSON.parse(data) : {};
  appData.session = session;
  localStorage.setItem('appData', JSON.stringify(appData));
};

// SignInForm component
const SignInForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const history = useNavigate(); // useHistory hook to manipulate browser history

  useEffect(() => {
    document.title = 'Qberi | Sign In';
    if (validateSession()) {
      history('/dashboard/roxwealth');
    }
  }, [history]);

  // Handle email input change
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle login button click
  const handleLogin = async () => {
    const URL = 'https://engine.qberi.com/api/login';

    const data = {
      email: email,
      password: password
    };

    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await axios.post(URL, data, { headers: headers });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        const responseData = response.data;
        const sessionToken = responseData.split('=')[1].split(';')[0];
        if (!sessionToken) {
          setError('Invalid email or password');
          return;
        }
        localStorage.setItem('sessionToken', sessionToken);
        updateSession(sessionToken); // Update session in localStorage
        updateUserData(email, sessionToken); // Update user data in localStorage

        setSuccessMessage('Logged in successfully');
        setTimeout(() => {
          history('/dashboard/roxwealth');
        }, 1000);
      } else {
        return setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };
  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Sign In</h3>
        <p className="text-700">Get access to your account</p>
      </div>
      <AuthSocialButtons title="Sign in" />
      <div className="position-relative">
        <hr className="bg-200 mt-5 mb-4" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="email"
            type="email"
            className="form-icon-input"
            placeholder="name@example.com"
            onChange={changeEmail}
            value={email}
          />
          <FontAwesomeIcon icon={faUser} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="password">Password</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="password"
            type="password"
            className="form-icon-input"
            placeholder="Password"
            onChange={changePassword}
            value={password}
          />
          <FontAwesomeIcon icon={faKey} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Row className="flex-between-center mb-7">
        <Col xs="auto">
          <Form.Check type="checkbox" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              defaultChecked
            />
            <Form.Check.Label htmlFor="remember-me" className="mb-0">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>
        <Col xs="auto">
          <Link
            to={`/pages/authentication/${layout}/forgot-password`}
            className="fs-9 fw-semi-bold"
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>
      <p className="text-danger">{error}</p>
      <p className="text-success text-3xl">{successMessage}</p>

      <Button variant="primary" className="w-100 mb-3" onClick={handleLogin}>
        Sign In
      </Button>
      <div className="text-center">
        <Link to={`/auth/sign-up`} className="fs-9 fw-bold">
          Create an account
        </Link>
      </div>
    </>
  );
};

export default SignInForm;
