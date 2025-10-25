
'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { mockTradeVolume } from '@/lib/mock-data';

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

export default function TradeVolumeOverview() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <BarChart data={mockTradeVolume}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="crop" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value / 1000}k`}
            label={{ value: 'Volume (tons)', angle: -90, position: 'insideLeft' }}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="Pune"
            stackId="a"
            fill="var(--color-Pune)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="Nagpur"
            stackId="a"
            fill="var(--color-Nagpur)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="Lucknow"
            stackId="a"
            fill="var(--color-Lucknow)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
