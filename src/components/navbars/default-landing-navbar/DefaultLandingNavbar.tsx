import Logo from 'components/common/Logo';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import SearchBox from 'components/common/SearchBox';
import Button from 'components/base/Button';
import ThemeToggler from 'components/common/ThemeToggler';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import DropdownSearchBox from 'components/common/DropdownSearchBox';
import SearchResult from 'components/common/SearchResult';
import { Dropdown } from 'react-bootstrap';
import validateSession from 'Actions/validateSession';
import Avatar from 'components/base/Avatar';
import ProfileDropdownMenu from '../nav-items/ProfileDropdownMenu';

const NavItem = ({
  label,
  url,
  isLast
}: {
  label: string;
  url: string;
  isLast?: boolean;
}) => {
  return (
    <Nav.Item
      as="li"
      className={classNames({ 'border-bottom border-bottom-lg-0': !isLast })}
    >
      <Nav.Link href={url} className="lh-1 py-0 fs-9 fw-bold py-3">
        {label}
      </Nav.Link>
    </Nav.Item>
  );
};

const DropdownComponent = () => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item as={Link} to="/privacy-policy">
        Privacy Policy
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/terms-conditions">
        Terms of Service
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/business/units">
        Business Units
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const MyNavBar = () => {
  return (
    <Nav className="me-auto pt-3 mb-lg-1" as="ul">
      <NavItem label="Home" url="/#home" />
      <NavItem label="About Us" url="/about-us" />
      <NavItem label="Business units" url="/#features" />
      <NavItem label="Team" url="/#team" />
      <NavItem label="Contact Us" url="/#contact" isLast />
      {/* Add the dropdown menu, saying more  */}
      {/* things to add: terms and conditions, privacy policy, business units */}
      <Dropdown as="li" className="border-bottom border-bottom-lg-0">
        <Dropdown.Toggle
          className="lh-1 fs-9 fw-bold py-3"
          variant="transparent"
          id="dropdown-basic"
        >
          More
        </Dropdown.Toggle>
        <DropdownComponent />
      </Dropdown>
    </Nav>
  );
};

const DefaultLandingNavbar = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pictureUrl, setPictureUrl] = useState('');

  useEffect(() => {
    const toggleShadowClass = () => {
      if (window.scrollY > 300) {
        containerRef.current?.classList.add('navbar-shadow');
      } else {
        containerRef.current?.classList.remove('navbar-shadow');
      }
    };
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    setPictureUrl(profile.pictureUrl);

    const isLogged = validateSession();
    setIsLoggedIn(isLogged);

    document.addEventListener('scroll', () => toggleShadowClass());

    return () => document.removeEventListener('scroll', toggleShadowClass);
  }, []);

  return (
    <>
      <div
        className={classNames(className, 'bg-white sticky-top landing-navbar')}
        ref={containerRef}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className="px-3 px-lg-7 px-xxl-3 container-small"
        >
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-decoration-none flex-1 flex-lg-grow-0"
          >
            <Logo />
          </Navbar.Brand>
          <ThemeToggler className="mx-2 d-lg-none" />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="border-bottom d-lg-none mb-2">
              <SearchBox
                placeholder="Search"
                className="w-100"
                inputClassName="rounded-pill my-4"
              />
            </div>

            <MyNavBar />
            <div className="d-grid d-lg-flex gap-4 align-items-center">
              <ThemeToggler className="d-none d-lg-block" />
              <Button
                className="p-0 text-700 hover-text-1100 d-none d-lg-inline lh-sm"
                onClick={() => setOpenSearchModal(!openSearchModal)}
              >
                <FeatherIcon icon="search" size={20} />
              </Button>
              {isLoggedIn ? (
                <Dropdown autoClose="outside" className="h-100">
                  <Dropdown.Toggle
                    as={Link}
                    to="#!"
                    className="dropdown-caret-none nav-link pe-0 py-0 lh-1 h-100 d-flex align-items-center"
                    variant=""
                  >
                    <Avatar src={pictureUrl} size="l" />
                  </Dropdown.Toggle>
                  <ProfileDropdownMenu />
                </Dropdown>
              ) : (
                <>
                  <Link
                    to="/auth/sign-in"
                    className="btn btn-link p-0 text-900 order-1 order-lg-0"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/sign-up"
                    className="btn btn-phoenix-primary order-0"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Modal
        show={openSearchModal}
        onHide={() => setOpenSearchModal(false)}
        className="search-box-modal mt-15"
      >
        <Modal.Body className="p-0 bg-transparent">
          <DropdownSearchBox
            size="lg"
            className="navbar-top-search-box"
            inputClassName="rounded-pill"
            style={{ width: 'auto' }}
          >
            <SearchResult />
          </DropdownSearchBox>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DefaultLandingNavbar;
