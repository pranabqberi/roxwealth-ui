import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import validateSession from 'Actions/validateSession';
import onSuccessLogin from 'Actions/login';
import redirect from 'Actions/Redirect';
import { ToastContext } from 'providers/ToastProvider';
import { decrypt, encrypt } from 'Actions/AESUtil';

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
      const nextPath = redirect();
      history(nextPath);
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

  const { showToast } = useContext(ToastContext);

  // Handle login button click
  const handleLogin = async () => {
    // const URL = 'https://engine.qberi.com/api/login';
    const URL = 'http://localhost:8080/api/login';

    const data = {
      email: email,
      password: password
    };

    const encryptedData = encrypt(JSON.stringify(data));

    const headers = {
      'Content-Type': 'text/plain'
    };
    try {
      const response = await axios.post(URL, encryptedData, { headers: headers });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        const responseData = response.data;
        const decryptedData = decrypt(responseData);
        onSuccessLogin(decryptedData, email);
        setSuccessMessage('Login successful. Redirecting...');
        setError('');
        showToast('Login successful', 'success');
        setTimeout(() => {
          const nextPath = redirect();
          history(nextPath);
        }, 1000);
      } else {
        showToast('Invalid email or password', 'error');
        return setError('Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
      showToast('Invalid email or password', 'error');
    }
  };
  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Sign In</h3>
        <p className="text-700">Get access to your account</p>
      </div>
      <Row className="align-items-center">
        <Col
          xs={12}
          className="mb-3 text-center d-flex justify-content-center gap-3"
        >
          <AuthSocialButtons title="Sign in" />
        </Col>
      </Row>
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
