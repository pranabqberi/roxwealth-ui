import { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

const URL = 'https://engine.qberi.com/api/portfolioValueGraph';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

const PerformanceNAVS = () => {
  const [graphData, setGraphData] = useState([]);

  const [graphData1D, setGraphData1D] = useState({});
  const [graphData7D, setGraphData7D] = useState({});
  const [graphDataMTD, setGraphDataMTD] = useState({});
  const [graphData1M, setGraphData1M] = useState({});
  const [graphDataYTD, setGraphDataYTD] = useState({});
  const [graphData1Y, setGraphData1Y] = useState({});
  const [mode, setMode] = useState('Daily');
  let data = [];
  const fetchData = useCallback(() => {
    axios
      .get(URL, { headers: headers })
      .then(response => {
        // Use Promise.all to wait for all state updates to complete
        Promise.all([
          (data = response.data),
          setGraphData1D(data[0]),
          setGraphData7D(data[1]),
          setGraphDataMTD(data[2]),
          setGraphData1M(data[3]),
          setGraphDataYTD(data[4]),
          setGraphData1Y(data[5])
        ]).then(() => {
          console.log('All graph data has been set:', data);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    console.log(data);
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
            <option value="1D">1D</option>
            <option value="Weekly">7D</option>
            <option value="MTD">MTD</option>
            <option value="Monthly">1M</option>
            <option value="YTD">YTD</option>
            <option value="Yearly">1Y</option>
          </Form.Select>
        </Col>
      </Row>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={400}
          data={
            mode === '1D'
              ? data[0].nav.data[0].navs
              : mode === 'Weekly'
              ? graphData7D
              : mode === 'MTD'
              ? graphDataMTD
              : mode === 'Monthly'
              ? graphData1M
              : mode === 'YTD'
              ? graphDataYTD
              : graphData1Y
          }
          margin={{ top: 20, right: 0, left: 10, bottom: 70 }}
        >
          <XAxis
          // dataKey={mode === 'Daily' ? 'date' : 'month'}
          // angle={-45}
          // textAnchor="end"
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
