import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

const URL = 'https://engine.qberi.com/api/portfolioValueGraph/force';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

const PerformanceNAVS = () => {
  const [graphData, setGraphData] = useState([]);
  const [mode, setMode] = useState('Monthly');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL, { headers: headers });
      setGraphData(response.data.graphData);
      setIsLoading(false); // Set loading to false after data is fetched
      console.log(response.data.graphData);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); // Also set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getChartData = mode => {
    switch (mode) {
      case '1D':
        return graphData[0]?.nav?.data[0]?.navs.map((nav, index) => ({
          date: graphData[0]?.nav?.dates[index],
          NAV: nav
        }));
      case 'Weekly':
        return graphData[1]?.nav?.data[0]?.navs.map((nav, index) => ({
          date: graphData[1]?.nav?.dates[index],
          NAV: nav
        }));
      case 'MTD':
        return graphData[2]?.nav?.data[0]?.navs.map((nav, index) => ({
          date: graphData[2]?.nav?.dates[index],
          NAV: nav
        }));
      case 'Monthly':
        return graphData[3]?.nav?.data[0]?.navs.map((nav, index) => ({
          month: graphData[3]?.nav?.dates[index],
          NAV: nav
        }));
      case 'YTD':
        return graphData[4]?.nav?.data[0]?.navs.map((nav, index) => ({
          date: graphData[4]?.nav?.dates[index],
          NAV: nav
        }));
      case 'Yearly':
        return graphData[5]?.nav?.data[0]?.navs.map((nav, index) => ({
          year: graphData[5]?.nav?.dates[index],
          NAV: nav
        }));
      default:
        return [];
    }
  };

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
          <Form.Select size="sm" onChange={handleModeChange} value={mode}>
            <option value="1D">1D</option>
            <option value="Weekly">7D</option>
            <option value="MTD">MTD</option>
            <option value="Monthly">1M</option>
            <option value="YTD">YTD</option>
            <option value="Yearly">1Y</option>
          </Form.Select>
        </Col>
      </Row>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={getChartData(mode)}
            margin={{ top: 20, right: 0, left: 10, bottom: 70 }}
          >
            <XAxis
              dataKey={mode === 'Monthly' ? 'month' : 'date'}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="NAV" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PerformanceNAVS;
