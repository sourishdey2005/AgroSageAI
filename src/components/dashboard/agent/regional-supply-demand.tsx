'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { region: 'Pune', supply: 4000, demand: 2400 },
  { region: 'Nagpur', supply: 3000, demand: 1398 },
  { region: 'Lucknow', supply: 2000, demand: 9800 },
  { region: 'Mumbai', supply: 2780, demand: 3908 },
  { region: 'Delhi', supply: 1890, demand: 4800 },
];

export function RegionalSupplyDemand() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="supply" fill="#8884d8" name="Supply (tons)" />
        <Bar dataKey="demand" fill="#82ca9d" name="Demand (tons)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
