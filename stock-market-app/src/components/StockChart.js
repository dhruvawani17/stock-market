import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStockData } from '../api';

const StockChart = ({ symbol }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getStockData(symbol);
      // Parse and format the data for the chart
      const formattedData = Object.keys(result['Time Series (5min)']).map((key) => ({
        time: key,
        price: result['Time Series (5min)'][key]['4. close'],
      }));
      setData(formattedData);
    };

    fetchStockData();
  }, [symbol]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
