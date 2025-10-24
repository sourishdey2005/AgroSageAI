
'use client';

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { mockEnergyData } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, ComposedChart } from 'recharts';

const chartConfig = {
  energy: {
    label: 'Energy (kWh)',
    color: 'hsl(var(--chart-1))',
  },
  water: {
    label: 'Water Yield (L)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function EnergyConsumptionDashboard() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ComposedChart
        data={mockEnergyData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => format(new Date(value), 'MMM d')}
        />
        <YAxis
          yAxisId="left"
          stroke=""
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value} kWh`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke=""
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value / 1000}k L`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="energy" yAxisId="left" fill="var(--color-energy)" radius={4} />
        <Line dataKey="water" type="monotone" yAxisId="right" stroke="var(--color-water)" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ChartContainer>
  );
}
