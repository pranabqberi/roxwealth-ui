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
// import { Col, Form, Row } from 'react-bootstrap';

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
const decodeMonth = month => {
  const year = month.substring(0, 4);
  const monthName = month.substring(4, 6);
  const mm = monthNames[parseInt(monthName) - 1];
  return `${mm}-${year}`;
};

const PerformanceCPS = data => {
  const [cpsData, setCpsData] = useState([]);
  useEffect(() => {
    const userData = sampleJson.cps;
    if (userData) {
      const cps = userData.data[0].returns;
      const freq = userData.dates;
      const data = [];
      for (let i = 0; i < cps.length; i++) {
        const value = cps[i];
        const date = freq[i];
        data.push({ date, value });
      }
      setCpsData(data);
    }
  }, []);
  return (
    <div>
      <h2>Performance CPS</h2>
      {/* <p>{data}</p> */}
      {/* <Row>
        <Col>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Show Performance" />
          </Form.Group>
        </Col>
      </Row> */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cpsData}>
          <XAxis dataKey="date" tickFormatter={decodeMonth} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceCPS;
