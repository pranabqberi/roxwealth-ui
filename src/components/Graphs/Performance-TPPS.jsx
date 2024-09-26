import React from 'react';
import { useState, useEffect } from 'react';
// import { Line } from "react-chartjs-2";
// import { Chart, registerables} from 'chart.js';
// Chart.register(...registerables);
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';

const PerformanceTPPS = data => {
  const [frequency, setFrequency] = useState('M');
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const userData = data.data;
    if (userData) {
      setFrequency(userData.freq);
      setDates(userData.dates);
      // setValues(userData.data);
      // console.log(userData.data);
      // create random array of 1 to 100
      const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      setGraphData({
        dates: userData.dates,
        value: randomArray
      });
      console.log(graphData);
    }
  }, [data]);

  return (
    <div>
      <h1>Performance TPPS</h1>
      {/* <p>{dates}</p>
            <p>{values}</p>
            <p>{frequency}</p> */}
      <LineChart width={800} height={400} data={graphData}>
        <XAxis dataKey="dates" />
        <YAxis />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default PerformanceTPPS;
