import AuthSimpleLayout from 'layouts/AuthSimpleLayout';
import SignOutForm from 'components/modules/auth/SignOutForm';
import { useEffect, useContext } from 'react';
import { ToastContext } from 'providers/ToastProvider';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  useEffect(() => {
    // Check if the user is logged in
    localStorage.removeItem('session');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('profile');
    localStorage.removeItem('orgs');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('categories');
    localStorage.removeItem('role');
    localStorage.removeItem('organizations');
    localStorage.removeItem('orgs');
    showToast("You've been signed out successfully", 'success');
    navigate('/');
  }, []);

  return (
    <AuthSimpleLayout logo={false}>
      <SignOutForm layout="simple" />
    </AuthSimpleLayout>
  );
};

export default SignOut;
