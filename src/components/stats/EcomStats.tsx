import { Button, Col, Row, Spinner, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
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

type StatType = {
  id: number | string;
  icon: IconProp;
  title: string | number;
  subTitle: string | number;
  color: string;
};

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
  const URL = 'https://engine.qberi.com/api/totalPortfolioValue/portfolioValue/cache';
  const URL2 = 'https://engine.qberi.com/api/totalPortfolioValue/portfolioValue/force';

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
  }

  return (
    <Row className="align-items-center g-4 border-bottom pb-4 mb-6">
      <Col xs={12} md="auto">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <FontAwesomeIcon
              icon={faRefresh}
              onClick={handleRefresh}
            />
            <Stat stat={ourStats} />
          </>
        )}
      </Col>
    </Row>
  );
};

const Stat = ({ stat }: { stat: StatType }) => {
  return (
    <Stack direction="horizontal" className="align-items-center">
      <span
        className="fa-layers"
        style={{ minHeight: '46px', minWidth: '46px' }}
      >
        <FontAwesomeIcon
          icon={faSquare}
          size="2x"
          className={`text-${stat.color}-300`}
          transform="down-4 rotate--10 left-4"
        />
        <FontAwesomeIcon
          icon={faCircle}
          size="2x"
          className={`text-${stat.color}-100 fa-layers-circle`}
          transform="up-4 right-3 grow-2"
        />
        <FontAwesomeIcon
          icon={stat.icon}
          size="1x"
          className={`text-${stat.color}`}
          transform="shrink-2 up-8 right-6"
        />
      </span>

      <div className="ms-3">
        <h4 className="mb-0">{stat.title}</h4>
        <p className="text-800 fs-9 mb-0">{stat.subTitle}</p>
      </div>
    </Stack>
  );
};

export default EcomStats;
