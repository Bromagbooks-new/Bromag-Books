import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for two-hourly intervals
const data = [
  { time: '12 AM', value: 500 },
  { time: '2 AM', value: 700 },
  { time: '4 AM', value: 200 },
  { time: '6 AM', value: 900 },
  { time: '8 AM', value: 1200 },
  { time: '10 AM', value: 1500 },
  { time: '12 PM', value: 1800 },
  { time: '2 PM', value: 1300 },
  { time: '4 PM', value: 1000 },
  { time: '6 PM', value: 1100 },
  { time: '8 PM', value: 1600 },
  { time: '10 PM', value: 1700 },
];

const OrderHourlyChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 15, right: 20,  bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis tickFormatter={(value) => `${value}`} />
        <Tooltip formatter={(value) => `${value}`} />
        {/* <Legend /> */}
        <Bar dataKey="totalOrders" fill="#8884d8" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderHourlyChart;
