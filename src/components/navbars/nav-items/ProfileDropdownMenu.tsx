import Avatar from 'components/base/Avatar';
import { useEffect, useState } from 'react';
import { Card, Dropdown, Nav } from 'react-bootstrap';
// import avatar from 'assets/img/team/72x72/57.webp';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import Scrollbar from 'components/base/Scrollbar';
import classNames from 'classnames';

const ProfileDropdownMenu = ({ className }: { className?: string }) => {
  const [navItems] = useState([
    {
      label: 'Profile',
      icon: 'user',
      link: '/profile'
    },
    {
      label: 'Dashboard',
      icon: 'pie-chart',
      link: '/dashboard'
    },
    {
      label: 'Posts & Activity',
      icon: 'lock',
      link: '/posts'
    },
    {
      label: 'Settings & Privacy ',
      icon: 'settings',
      link: '/settings'
    },
    {
      label: 'Help Center',
      icon: 'help-circle',
      link: '/help'
    },
    {
      label: 'Language',
      icon: 'globe',
      link: '/language'
    }
  ]);
  const [email, setEmail] = useState('Email Not Found');
  const [profileUrl, setProfileUrl] = useState('');
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    setEmail(session.email);
    setProfileUrl(profile.pictureUrl);
  });
  return (
    <Dropdown.Menu
      align="end"
      className={classNames(
        className,
        'navbar-top-dropdown-menu navbar-dropdown-caret py-0 dropdown-profile shadow border border-300'
      )}
    >
      <Card className="position-relative border-0">
        <Card.Body className="p-0">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 pt-4 pb-3">
            <Avatar src={profileUrl} size="xl" />
            <h6 className="text-black">{email}</h6>
          </div>
          {/* <div className="mb-3 mx-3">
            <Form.Control
              type="text"
              placeholder="Update your status"
              size="sm"
            />
          </div> */}
          <div style={{ height: '10rem' }}>
            <Scrollbar>
              <Nav className="nav flex-column mb-2 pb-1">
                {navItems.map(item => (
                  <Nav.Item key={item.label}>
                    <Nav.Link href={item.link} className="px-3">
                      <FeatherIcon
                        icon={item.icon}
                        size={16}
                        className="me-2 text-900"
                      />
                      <span className="text-1000">{item.label}</span>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Scrollbar>
          </div>
        </Card.Body>
        <Card.Footer className="p-0 border-top">
          {/* <Nav className="nav flex-column my-3">
            <Nav.Item>
              <Nav.Link href="#!" className="px-3">
                <FeatherIcon
                  icon="user-plus"
                  size={16}
                  className="me-2 text-900"
                />
                <span>Add another account</span>
              </Nav.Link>
            </Nav.Item>
          </Nav> */}
          <hr />
          <div className="px-3">
            <Link
              to="/auth/sign-out"
              className="btn btn-phoenix-secondary d-flex flex-center w-100"
            >
              <FeatherIcon icon="log-out" className="me-2" size={16} />
              Sign out
            </Link>
          </div>
          <div className="my-2 text-center fw-bold fs-10 text-600">
            <Link className="text-600 me-1" to="/privacy-policy">
              Privacy policy
            </Link>
            •
            <Link className="text-600 mx-1" to="/terms-conditions">
              Terms
            </Link>
            •
            {/* <Link className="text-600 ms-1" to="#!">
              Cookies
            </Link> */}
          </div>
        </Card.Footer>
      </Card>
    </Dropdown.Menu>
  );
};

export default ProfileDropdownMenu;
