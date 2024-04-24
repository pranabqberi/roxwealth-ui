import { Col, Row } from 'react-bootstrap';
import Button from 'components/base/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import bg1 from 'assets/img/bg/bg-36.png';
// import bg2 from 'assets/img/bg/34-2.png';
// import bg3 from 'assets/img/bg/34-2.png';
import bg4 from 'assets/img/bg/bg-39.png';
import LegoLight from 'assets/img/bg/LegoDefender-fotor-2024030610292_compressed-2.png';
import LegoDark from 'assets/img/gallery/LegoDefender-fotor-2024030610292_compressed.png';
import redirect from 'Actions/Redirect';
import { useEffect, useState } from 'react';
import validateSession from 'Actions/validateSession';

const HeroHeader = () => {
  const [nextPath, setNextPath] = useState('/auth/sign-in');
  useEffect(() => {
    if (validateSession()) {
      setNextPath(redirect());
    }
  }, []);
  return (
    <section id="home" className="pb-8 overflow-hidden">
      <div className="hero-header-container-alternate position-relative">
        <div className="container-small px-lg-7 px-xxl-3">
          <Row className="align-items-center">
            <Col
              lg={6}
              className="pt-5 pb-3 position-relative z-index-5 text-center text-lg-start"
            >
              <h1 className="fs-3 fs-md-2 fs-xl-1 fw-black mb-4">
                The <span className="text-gradient-info me-3">World </span>{' '}
                <br />
                is our Playground
              </h1>
              <p className="mb-5 pe-xl-10">
                Quietly Building Excellence, Resilience and Ingenuity.
                <span className="text-gradient-info me-3">
                  {' '}
                  <Link to="/about-us">Read more here.</Link>
                </span>
              </p>
              <Button
                as={Link}
                to="/auth/sign-up"
                variant="primary"
                size="lg"
                className="rounded-pill me-3"
              >
                Register
              </Button>
              <Button
                as={Link}
                to={nextPath}
                variant="link"
                endIcon={
                  <FontAwesomeIcon icon={faAngleRight} className="ms-2 fs-9" />
                }
                className="me-2 fs-8 p-0"
              >
                See Profile
              </Button>
            </Col>
            <Col lg="auto" className="d-none d-lg-block">
              <div className="hero-image-container position-absolute h-120 end-0 d-flex align-items-center">
                <div className="position-relative">
                  <div className="position-absolute end-0 hero-image-container-overlay" />
                  <img
                    src={bg1}
                    alt=""
                    className="position-absolute end-0 hero-image-container-bg"
                  />
                  <img
                    src={LegoLight}
                    alt=""
                    className="w-100 d-dark-none rounded-2 hero-image-shadow"
                  />
                  <img
                    src={LegoDark}
                    alt=""
                    className="w-100 d-light-none rounded-2 hero-image-shadow"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container-small px-md-8 mb-8 d-lg-none">
          <div className="position-relative">
            <div className="position-absolute end-0 hero-image-container-overlay" />
            <img
              src={bg4}
              alt=""
              className="position-absolute top-50 hero-image-container-bg"
            />
            <img
              src={LegoLight}
              alt=""
              className="img-fluid ms-auto d-dark-none rounded-2 hero-image-shadow"
            />
            <img
              src={LegoDark}
              alt=""
              className="img-fluid ms-auto d-light-none rounded-2 hero-image-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHeader;
