'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Tomato: 4.0, Wheat: 2.4, Rice: 2.4 },
  { name: 'Feb', Tomato: 3.0, Wheat: 1.3, Rice: 2.2 },
  { name: 'Mar', Tomato: 2.0, Wheat: 9.8, Rice: 2.2 },
  { name: 'Apr', Tomato: 2.7, Wheat: 3.9, Rice: 2.0 },
  { name: 'May', Tomato: 1.8, Wheat: 4.8, Rice: 2.1 },
  { name: 'Jun', Tomato: 2.3, Wheat: 3.8, Rice: 2.5 },
  { name: 'Jul', Tomato: 3.4, Wheat: 4.3, Rice: 2.1 },
];

export function MarketVolatility() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Tomato" stroke="#8884d8" />
        <Line type="monotone" dataKey="Wheat" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Rice" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
