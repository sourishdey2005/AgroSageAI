
'use client';

import { mockYieldWeatherCorrelation } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = mockYieldWeatherCorrelation;

const chartConfig = {
  yield: {
    label: 'Yield (kg/acre)',
    color: 'hsl(var(--chart-1))',
  },
  rainfall: {
    label: 'Rainfall (mm)',
    color: 'hsl(var(--chart-2))',
  },
  temp: {
    label: 'Temp (°C)',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function YieldWeatherCorrelation() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ComposedChart
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="" />
        <YAxis yAxisId="left" label={{ value: 'Yield (kg/acre)', angle: -90, position: 'insideLeft' }} stroke="" />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Rain / Temp', angle: -90, position: 'insideRight' }} stroke="" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="yield" yAxisId="left" fill="var(--color-yield)" barSize={20} />
        <Line type="monotone" dataKey="temp" yAxisId="right" stroke="var(--color-temp)" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="rainfall" yAxisId="right" fill="var(--color-rainfall)" fillOpacity={0.4} stroke="var(--color-rainfall)" />
      </ComposedChart>
    </ChartContainer>
  );
}
