import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import axios from 'axios';
import validateSession from 'Actions/validateSession';
import redirect from 'Actions/Redirect';
import { InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faMailBulk, faMailReply, faUser } from '@fortawesome/free-solid-svg-icons';

const addProfile = async (name: string, email: string, mobile: string) => {
  const URL = 'https://engine.qberi.com/api/addProfile';
  const data = {
    name: name,
    email: email,
    mobile: mobile,
    profilePicture: 'https://www.w3schools.com/howto/img_avatar.png'
  };
  const headers = {
    'Content-Type': 'application/json'
  };
  try {
    const response = await axios.post(URL, data, { headers });
    console.log('Success in adding profile');
    console.log(response.data);
  } catch (error) {
    console.log('Error in adding profile');
    console.error(error);
  }
};

const SignUpForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  // const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>({});

  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    // Clear error message for the field when user interacts with it
    setErrorMessages(prevErrors => ({
      ...prevErrors,
      [id]: ''
    }));

  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Qberi | Sign Up';
    // check if user is already logged in
    if (validateSession()) {
      const nextPath = redirect();
      navigate(nextPath);
    }
  }, []);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById('confirmPassword') as HTMLInputElement
    ).value;
    const termsService = (
      document.getElementById('termsService') as HTMLInputElement
    ).checked;
    const mobile = (document.getElementById('mobile') as HTMLInputElement)
      .value;

    const errors: any = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!termsService) {
      errors.termsService = 'Please accept the terms and conditions';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }


    const data = {
      name,
      email,
      password
    };

    const URL = 'https://engine.qberi.com/api/register';

    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post(URL, data, { headers });
      console.log(response.data);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        setErrorMessages({});
        setSuccessMessage(
          'You have successfully signed up, redirecting to the Sign-In Page ...'
        );
        console.log('Profile added');
        addProfile(name, email, mobile);
        setTimeout(() => {
          // window.location.href = '/auth/sign-in';
          navigate('/auth/sign-in');
        }, 1000);
      } else {
        // setErrorMessages(['Registration failed']);
      }
    } catch (error) {
      console.error(error);
      // setErrorMessages(['Registration failed']);
    }
  };

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Register</h3>
        <p className="text-700">Create your account today</p>
      </div>
      <AuthSocialButtons title="Sign up" />
      {/* <GoogleLogin
        theme="filled_blue"
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        // make size="large" for larger button
        size="large"

      /> */}

      <div className="position-relative mt-4">
        <hr className="bg-200" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="name">Full Name</Form.Label>
          <div className="form-icon-container">
            <Form.Control id="name" type="text" className="form-icon-input" placeholder="Full Name" onChange={handleInputChange} />
            <FontAwesomeIcon icon={faUser} className="text-900 fs-9 form-icon" />
          </div>

          <small className="text-danger">
            {errorMessages.name}
          </small>
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <div className="form-icon-container">
            <Form.Control id="email" type="text" className="form-icon-input" placeholder="Email address" onChange={handleInputChange} />
            <FontAwesomeIcon icon={faEnvelope} className="text-900 fs-9 form-icon" />
          </div>
          <small className="text-danger">
            {errorMessages.email}
          </small>
        </Form.Group>
        {/* Take Input Mobile */}
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="mobile">Mobile</Form.Label>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="+91"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <Form.Control id="mobile" type="number" placeholder="Mobile" />
          </InputGroup>
        </Form.Group>
        {/* <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="mobile">Mobile</Form.Label>
          <Form.Control id="mobile" type="number" placeholder="Mobile" />
        </Form.Group> */}
        <Row className="g-3 mb-3">
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="form-icon-container">
                <Form.Control id="password" type="password" className="form-icon-input" placeholder="Password" onChange={handleInputChange} />
                <FontAwesomeIcon icon={faKey} className="text-900 fs-9 form-icon" />
              </div>
            </Form.Group>
          </Col>
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <div className="form-icon-container">
                <Form.Control id="confirmPassword" type="password" className="form-icon-input" placeholder="Confirm Password" onChange={handleInputChange} />
                <FontAwesomeIcon icon={faKey} className="text-900 fs-9 form-icon" />
              </div>
            </Form.Group>
          </Col>
          <small className="text-danger">
            {errorMessages.password}
          </small>
        </Row>
        <Form.Check type="checkbox" className="mb-3">
          <Form.Check.Input
            type="checkbox"
            name="termsService"
            id="termsService"
            required
          />
          <Form.Check.Label htmlFor="termsService" className="fs-9 text-none">
            I accept the{' '}
            <a href="/terms-conditions" target="_blank">
              terms
            </a>{' '}
            and{' '}
            <a href="/privacy-policy" target="_blank">
              privacy policy
            </a>
          </Form.Check.Label>
        </Form.Check>
        <small className="text-danger">
          {errorMessages.termsService}
        </small>
        {/* <div className="mb-3">
          <small className="text-danger">
            {errorMessages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </small>
        </div> */}
        <div className="mb-3">
          <small className="text-success">{successMessage}</small>
        </div>
        <Button variant="primary" className="w-100 mb-3" onClick={signUp}>
          Register
        </Button>
        <div className="text-center">
          <Link to={`/auth/sign-in`} className="fs-9 fw-bold">
            Sign in to an existing account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
