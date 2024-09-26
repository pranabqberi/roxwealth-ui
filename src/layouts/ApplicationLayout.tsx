import classNames from 'classnames';
import Footer from 'components/footers/Footer';
import NavbarDual from 'components/navbars/navbar-dual/NavbarDual';
// import NavbarTopHorizontal from 'components/navbars/navbar-horizontal/NavbarTopHorizontal';
import NavbarTopDefault from 'components/navbars/navbar-top/NavbarTopDefault';
// import NavbarVertical from 'components/navbars/navbar-vertical/NavbarVertical';
import { useAppContext } from 'providers/AppProvider';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import validateSession from 'Actions/validateSession';
import { useNavigate } from 'react-router-dom';
import { UpdateOrgs } from 'Actions/UpdateOrgs';
import NavbarApp from 'components/navbars/navbar-vertical/NavBarApplication';

const updateApplications = () => {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const token = session.sessionToken;
  const URL = `https://engine.qberi.com/api/allApplications/`;
  fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('applications', JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const ApplicationLayout = () => {
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
    updateApplications();
  }, []);

  return (
    <Container fluid className="px-0">
      {isLoggedIn ? (
        <>
          {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
            <NavbarApp />
          )}
          {navbarPosition === 'vertical' && <NavbarTopDefault />}
          {/* {(navbarPosition === 'horizontal' || navbarPosition === 'combo') && (
            <NavbarTopHorizontal />
          )} */}
          This is a application Layout
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

export default ApplicationLayout;
