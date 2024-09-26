import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from 'components/base/Button';
import { features } from 'data/landing/alternate-landing-data';
import FeatureSection from './FeatureSection';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <section id="features" className="pt-13 pb-10">
      <div className="container-small px-lg-7 px-xxl-3">
        <div className="text-center mb-10 mb-md-5">
          <h5 className="text-info mb-3">Business Units</h5>
          <h2 className="mb-3 lh-base">
            We think, every life should be interesting
          </h2>
          <p className="mb-0">
            Qberi, a multinational organization headquartered in Boulder,
            Colorado, thrives on its diverse array of business units, each a
            strategic pillar dedicated to the pursuit of excellence, resilience,
            and ingenuity. With our mantra guiding us silently, we explore how
            each division quietly builds success, adapts to unique industry
            demands, and contributes to our mission of global growth and impact.
          </p>
          <div className="text-center mt-5">
            <Link to="/business/units" className="btn btn-outline-primary">
              See more{' '}
              <FontAwesomeIcon icon={faAngleRight} transform="down-1" />
            </Link>
          </div>
        </div>
        {features.map((feature, index) => (
          <FeatureSection
            key={feature.id}
            feature={feature}
            isLast={index === features.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
