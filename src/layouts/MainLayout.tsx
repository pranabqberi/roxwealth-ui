import classNames from 'classnames';
import Footer from 'components/footers/Footer';
import NavbarDual from 'components/navbars/navbar-dual/NavbarDual';
import NavbarTopDefault from 'components/navbars/navbar-top/NavbarTopDefault';
import { useAppContext } from 'providers/AppProvider';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react'; // Import lazy and Suspense

import validateSession from 'Actions/validateSession';
import { useNavigate } from 'react-router-dom';
import { UpdateOrgs } from 'Actions/UpdateOrgs';

// Lazy load the NavbarVertical component
const NavbarVertical = lazy(
  () => import('components/navbars/navbar-vertical/NavbarVertical')
);

const MainLayout = () => {
  const {
    config: { navbarPosition }
  } = useAppContext();

  const { contentClass, footerClass } = useMainLayoutContext();

  // Check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    document.title = 'Qberi';
    if (!validateSession()) {
      navigate('/auth/sign-in');
      return;
    }
    setIsLoggedIn(true);
    UpdateOrgs();
  }, []);

  return (
    <Container fluid className="px-0">
      {isLoggedIn ? (
        <>
          {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
            <Suspense fallback={<div>Loading...</div>}>
              {' '}
              {/* Add Suspense */}
              <NavbarVertical />
            </Suspense>
          )}
          {navbarPosition === 'vertical' && <NavbarTopDefault />}
          {navbarPosition === 'dual' && <NavbarDual />}

          <div className={classNames(contentClass, 'content')}>
            <Outlet />
            <Footer className={classNames(footerClass, 'position-absolute')} />
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MainLayout;
