import { useState, useEffect } from 'react';
import sampleJson from '../../assets/SampleData.json';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Col, Form, Row } from 'react-bootstrap';
// import axios from 'axios';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const decodeDate = date => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const monthName = monthNames[parseInt(month) - 1];
  return `${day}-${monthName}-${year}`;
};

const decodeMonth = month => {
  const year = month.substring(0, 4);
  const monthName = month.substring(4, 6);
  const mm = monthNames[parseInt(monthName) - 1];
  return `${mm}-${year}`;
};

const PerformanceNAVS = () => {
  const [graphDataDaily, setGraphDataDaily] = useState([]);
  const [graphDataMonthly, setGraphDataMonthly] = useState([]);
  const [mode, setMode] = useState('Monthly');

  useEffect(() => {
    const userData = sampleJson.nav;
    if (userData) {
      const dates = userData.dates;
      const navs = userData.data[0].navs;
      const data = [];
      const eachMonthSum = {};
      const eachMonthCount = {};

      for (let i = 0; i < dates.length; i++) {
        const date = decodeDate(dates[i]);
        const nav = navs[i];
        const month = monthNames[parseInt(dates[i].substring(4, 6)) - 1];
        const diff = nav - navs[i - 1];
        data.push({ date, NAV: nav, month, diff });

        const monthKey = parseInt(dates[i].substring(0, 6));
        eachMonthSum[monthKey] = (eachMonthSum[monthKey] || 0) + nav;
        eachMonthCount[monthKey] = (eachMonthCount[monthKey] || 0) + 1;
      }

      const dataMonthly = Object.entries(eachMonthSum).map(([key, value]) => ({
        month: decodeMonth(key),
        NAV: (value / eachMonthCount[key]).toFixed(2) // Average NAV for the month, rounded to 2 decimal places
      }));

      setGraphDataMonthly(dataMonthly);
      setGraphDataDaily(data);
    }
  }, []);

  // useEffect(() => {
  //   const session = JSON.parse(localStorage.getItem('session') || '{}');
  //   const sessionToken = session.sessionToken || '';

  //   const URL = 'https://engine.qberi.com/api/portfolioValueGraph';
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${sessionToken}`
  //   };

  //   axios
  //     .get(URL, { headers })
  //     .then(response => {
  //       console.log(response.data);
  //       const userData = response.data[0];
  //       if (userData) {
  //         const dates = userData.dates;
  //         const navs = userData.data[0].navs;
  //         const data = [];
  //         const eachMonthSum = {};
  //         const eachMonthCount = {};

  //         for (let i = 0; i < dates.length; i++) {
  //           const date = decodeDate(dates[i]);
  //           const nav = navs[i];
  //           const month = monthNames[parseInt(dates[i].substring(4, 6)) - 1];
  //           const diff = nav - navs[i - 1];
  //           data.push({ date, NAV: nav, month, diff });

  //           const monthKey = parseInt(dates[i].substring(0, 6));
  //           eachMonthSum[monthKey] = (eachMonthSum[monthKey] || 0) + nav;
  //           eachMonthCount[monthKey] = (eachMonthCount[monthKey] || 0) + 1;
  //         }

  //         const dataMonthly = Object.entries(eachMonthSum).map(
  //           ([key, value]) => ({
  //             month: decodeMonth(key),
  //             NAV: (value / eachMonthCount[key]).toFixed(2) // Average NAV for the month, rounded to 2 decimal places
  //           })
  //         );

  //         setGraphDataMonthly(dataMonthly);
  //         setGraphDataDaily(data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  const handleModeChange = e => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Row>
        <Col xs="auto">
          <h2>Net Asset Value(NAV) - {mode}</h2>
        </Col>
        <Col>
          <Form.Select size="sm" onChange={handleModeChange}>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </Form.Select>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={400}
          data={mode === 'Daily' ? graphDataDaily : graphDataMonthly}
          margin={{ top: 20, right: 0, left: 10, bottom: 70 }}
        >
          <XAxis
            dataKey={mode === 'Daily' ? 'date' : 'month'}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="NAV" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceNAVS;
