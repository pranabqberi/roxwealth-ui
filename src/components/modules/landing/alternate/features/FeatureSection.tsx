import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Feature } from 'data/landing/alternate-landing-data';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface FeatureSectionProps {
  feature: Feature;
  isLast: boolean;
}

const FeatureSection = ({ feature, isLast }: FeatureSectionProps) => {
  const link_to = feature.link;

  return (
    <Row
      className={classNames('flex-between-center px-xl-11', {
        'mb-10 mb-md-9': !isLast
      })}
    >
      <Col md={7} className="order-1 order-md-0 text-center text-md-start">
        <h4 className="mb-3">{feature.title}</h4>
        <p className="mb-1">{feature.description}</p>
        <p className="mb-5">{feature.additional}</p>
        <div className="mt-5">
          {/* <Link to={link_to} className="btn btn-outline-primary">
            {feature.linkText}{' '}
            <FontAwesomeIcon icon={faAngleRight} transform="down-1" />
          </Link> */}
          {feature.redirect ? (
            <a
              href={link_to}
              className="btn btn-outline-primary"
              target="_blank"
              rel="noreferrer"
            >
              {feature.linkText}{' '}
              <FontAwesomeIcon icon={faAngleRight} transform="down-1" />
            </a>
          ) : (
            <Link to={link_to} className="btn btn-outline-primary">
              {feature.linkText}{' '}
              <FontAwesomeIcon icon={faAngleRight} transform="down-1" />
            </Link>
          )}
        </div>
      </Col>
      <Col md={5} className="mb-5 mb-md-0 text-center">
        <img
          src={feature.lightImg}
          alt=""
          className="w-100 w-md-120 d-dark-none"
        />
        <img
          src={feature.darkImg}
          alt=""
          className="w-100 w-md-120 d-light-none"
        />
      </Col>
    </Row>
  );
};

export default FeatureSection;
