'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockLiveMandiData } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const chartConfig = {
  Pune: {
    label: 'Pune',
    color: 'hsl(var(--chart-1))',
  },
  Nagpur: {
    label: 'Nagpur',
    color: 'hsl(var(--chart-2))',
  },
  Lucknow: {
    label: 'Lucknow',
    color: 'hsl(var(--chart-3))',
  },
};

export default function LiveMandiAnalyticsBoard() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={mockLiveMandiData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `₹${value}`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="Pune"
            type="monotone"
            stroke="var(--color-Pune)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="Nagpur"
            type="monotone"
            stroke="var(--color-Nagpur)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="Lucknow"
            type="monotone"
            stroke="var(--color-Lucknow)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
