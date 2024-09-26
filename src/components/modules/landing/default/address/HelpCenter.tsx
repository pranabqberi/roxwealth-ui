import {
  faFacebook,
  faLinkedinIn,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UilEnvelope, UilMapMarker, UilPhone } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  return (
    <>
      <h3 className="mb-3">Stay connected</h3>
      <p className="mb-5">
        Stay connected with Qberi's Help Center. Qberi is available for your
        necessities at all times.
      </p>
      <div className="d-flex flex-column align-items-center align-items-md-start gap-4">
        <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
          <div className="icon-wrapper shadow-info">
            <UilPhone
              size={40}
              className="text-primary fs-4 light z-index-1 ms-2"
            />
          </div>
          <div className="flex-1 ms-3">
            <Link to="tel:+871406-7509" className="link-900">
              (+1) 123-456-7890
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
          <div className="icon-wrapper shadow-info">
            <UilEnvelope
              size={40}
              className="text-primary light z-index-1 ms-2"
            />
          </div>
          <div className="flex-1 ms-3">
            <Link
              to="mailto:support@qberi.com"
              className="fw-semi-bold text-900"
            >
              support@qberi.com
            </Link>
          </div>
        </div>
        <div className="mb-6 d-flex flex-column flex-md-row gap-2 align-items-center">
          <div className="icon-wrapper shadow-info">
            <UilMapMarker
              size={40}
              className="text-primary light z-index-1 ms-2"
            />
          </div>
          <div className="flex-1 ms-3">
            <Link to="#!" className="fw-semi-bold text-900">
              39163 Amir Drive Suite 802
            </Link>
          </div>
        </div>
        <div className="d-flex gap-3">
          <a href="#!">
            <FontAwesomeIcon icon={faFacebook} className="text-primary fs-6" />
          </a>
          <a href="#!">
            <FontAwesomeIcon icon={faTwitter} className="text-primary fs-6" />
          </a>
          <a href="#!">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="text-primary fs-6"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
