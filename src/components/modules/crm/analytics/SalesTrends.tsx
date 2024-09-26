import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnalyticsSalesTrendsChart from 'components/charts/e-charts/AnalyticsSalesTrendsChart';
import { Col, Row } from 'react-bootstrap';

const SalesTrends = () => {
  return (
    <>
      <Row className="justify-content-between mb-4">
        <Col xs={12}>
          <h3>Sales Trends</h3>
          <p className="text-700">Updated inventory &amp; the sales report.</p>
        </Col>
        <Col xs={12} className="d-flex">
          <div className="d-flex">
            <FontAwesomeIcon icon={faCircle} className="text-info-300 me-2" />
            <h6 className="mb-0 me-3 lh-base">Profit</h6>
          </div>
          <div className="d-flex">
            <FontAwesomeIcon
              icon={faCircle}
              className="text-primary-200 dark__text-primary-300 me-2"
            />
            <h6 className="mb-0 me-3 lh-base">Revenue</h6>
          </div>
        </Col>
      </Row>
      <AnalyticsSalesTrendsChart style={{ width: '100%', height: '270px' }} />
    </>
  );
};

export default SalesTrends;
