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

// const NavItem = ({
//   label,
//   url,
//   isLast
// }: {
//   label: string;
//   url: string;
//   isLast?: boolean;
// }) => {
//   return (
//     <Nav.Item
//       as="li"
//       className={classNames({ 'border-bottom border-bottom-lg-0': !isLast })}
//     >
//       <Nav.Link href={url} className="lh-1 py-0 fs-9 fw-bold py-3">
//         {label}
//       </Nav.Link>
//     </Nav.Item>
//   );
// };

const NavItemsHome = () => {
  return (
    <>
      {/* <NavItem label="Home" url="#home" /> */}

      <Nav.Link
        href="#home"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Home</p>
      </Nav.Link>
      <Link
        to="/about-us"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">About Us</p>
      </Link>
      {/* <NavItem label="Solutions" url="/#features" /> */}
      <Nav.Link
        href="#features"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Business Units</p>
      </Nav.Link>
      {/* <NavItem label="News" url="/#blog" /> */}
      {/* <Nav.Link
        href="#blog"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">News</p>
      </Nav.Link> */}

      {/* <NavItem label="Team" url="/#team" /> */}
      <Nav.Link
        href="#team"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Team</p>
      </Nav.Link>

      {/* <NavItem label="Contact" url="/#contact" isLast /> */}
      <Nav.Link
        href="#contact"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Contact Us</p>
      </Nav.Link>
    </>
  );
};

const NavItemsNotHome = () => {
  return (
    <>
      <Link
        to="/"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Home</p>
      </Link>
      <Link
        to="/about-us"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">About Us</p>
      </Link>
      <Link
        to="/privacy-policy"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Privacy Policy</p>
      </Link>
      <Link
        to="/terms-conditions"
        className="btn btn-link p-0 text-900 order-1 order-lg-0 px-2"
      >
        <p className="lh-1 py-0 fs-9 fw-bold py-3">Terms of Service</p>
      </Link>
    </>
  );
};

const DefaultLandingNavbar = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    const toggleShadowClass = () => {
      if (window.scrollY > 300) {
        containerRef.current?.classList.add('navbar-shadow');
      } else {
        containerRef.current?.classList.remove('navbar-shadow');
      }
    };

    setIsHomePage(window.location.pathname === '/');

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

            <Nav className="me-auto pt-3 mb-lg-0" as="ul">
              {/* <NavItem label="Home" url="#home" />
              <NavItem label="Solutions" url="/#features" />
              <NavItem label="News" url="/#blog" />
              <NavItem label="Team" url="/#team" />
              <NavItem label="About" url="/about-us" />
              <NavItem label="Contact" url="/#contact" isLast /> */}
              {isHomePage ? <NavItemsHome /> : <NavItemsNotHome />}
            </Nav>

            <div className="d-grid d-lg-flex gap-4 align-items-center">
              <ThemeToggler className="d-none d-lg-block" />
              <Button
                className="p-0 text-700 hover-text-1100 d-none d-lg-inline lh-sm"
                onClick={() => setOpenSearchModal(!openSearchModal)}
              >
                <FeatherIcon icon="search" size={20} />
              </Button>
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
                Sign up
              </Link>
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
