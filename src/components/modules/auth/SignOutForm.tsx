import lightImg from 'assets/img/spot-illustrations/1.png';
import darkImg from 'assets/img/spot-illustrations/dark_1.png';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Logout from 'Actions/logout';
import { useEffect, useState } from 'react';

const SignOutForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [count, setCount] = useState(5);
  const timer = setInterval(() => setCount(count - 1), 1000);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('SignOutForm : ', layout);
    Logout();
    document.title = 'Qberi | Sign Out';
    return () => {
      clearInterval(timer);
      setTimeout(() => {
        navigate('/');
      }, 6500);
    };
  }, []);

  return (
    <div className="text-center mb-6 mx-auto">
      <img className="mb-7 d-dark-none" src={lightImg} alt="phoenix" />
      <img className="mb-7 d-light-none" src={darkImg} alt="phoenix" />
      <div className="mb-6">
        <h4 className="text-1000">Come back soon!</h4>
        <p className="text-700">
          Thanks for using Qberi. <br className="d-lg-none" />
          You are now successfully signed out.
        </p>
      </div>
      <div className="mb-6">
        <p>Redirecting to home page in {count} seconds...</p>
      </div>
      <div className="d-grid">
        <Button
          variant="primary"
          as={Link}
          to={`/auth/sign-in`}
          startIcon={<FontAwesomeIcon icon={faAngleLeft} className="me-2" />}
        >
          Go to sign in page
        </Button>
        {/* Go to Home Page Button */}
        <Button variant="link" as={Link} to="/" className="mt-3">
          Go to home page
        </Button>
      </div>
    </div>
  );
};

export default SignOutForm;
