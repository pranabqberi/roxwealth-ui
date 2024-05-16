import {
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Stack,
  Tooltip
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCircle,
  faDollarSign,
  faMoneyBill,
  faRefresh,
  // faPause,
  faSquare
  // faXmark,
  // faStar
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EcomStats = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [ourStats, setOurStats] = useState({
    id: 1,
    icon: faMoneyBill,
    title: '$ ' + totalAssets,
    subTitle: 'Assets Under Management',
    color: 'success'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const URL =
    'https://engine.qberi.com/api/totalPortfolioValue/portfolioValue/cache';
  const URL2 =
    'https://engine.qberi.com/api/totalPortfolioValue/portfolioValue/force';

  const fetchData = async (URL: string) => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const sessionToken = session?.sessionToken;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    };
    axios
      .get(URL, { headers: headers })
      .then(response => {
        setTotalAssets(response.data.amountInUsd);
        setLoading(false);
        const amount = response.data.amountInUsd;
        const testStats = {
          id: 1,
          icon: faDollarSign,
          title:
            '$ ' +
            amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }),
          subTitle: 'Assets Under Management',
          color: 'success'
        };
        setOurStats(testStats);
      })
      .catch(error => {
        setError('Error fetching data from API ' + error);
        // Redirect to login page if 401 error
        if (error.response.status === 401) {
          window.location.href = '/auth/sign-out';
        }
      });
  };

  useEffect(() => {
    fetchData(URL);
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleRefresh = () => {
    setLoading(true);
    fetchData(URL2);
  };

  return (
    <Row className="align-items-center g-4 border-bottom pb-4 mb-6">
      <Col xs={12} md="auto">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <Stack direction="horizontal" className="align-items-center">
              <span
                className="fa-layers"
                style={{ minHeight: '46px', minWidth: '46px' }}
              >
                <FontAwesomeIcon
                  icon={faSquare}
                  size="2x"
                  className={`text-${ourStats.color}-300`}
                  transform="down-4 rotate--10 left-4"
                />
                <FontAwesomeIcon
                  icon={faCircle}
                  size="2x"
                  className={`text-${ourStats.color}-100 fa-layers-circle`}
                  transform="up-4 right-3 grow-2"
                />
                <FontAwesomeIcon
                  icon={ourStats.icon}
                  size="1x"
                  className={`text-${ourStats.color}`}
                  transform="shrink-2 up-8 right-6"
                />
              </span>

              <div className="ms-3">
                <h4 className="mb-0">{ourStats.title}</h4>
                <p className="text-800 fs-9 mb-0">{ourStats.subTitle}</p>
              </div>

              <div className="ms-4">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip">Refresh</Tooltip>}
                >
                  <FontAwesomeIcon
                    icon={faRefresh}
                    size="lg"
                    onClick={handleRefresh}
                  />
                </OverlayTrigger>
              </div>
            </Stack>
          </>
        )}
      </Col>
    </Row>
  );
};

// const Stat = ({ stat }: { stat: StatType }) => {
//   return (

//   );
// };

export default EcomStats;
