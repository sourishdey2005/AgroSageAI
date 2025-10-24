
'use client';

import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { mockBenchmarkingData } from '@/lib/mock-data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  yourYield: {
    label: 'Your Yield',
    color: 'hsl(var(--chart-1))',
  },
  districtAverage: {
    label: 'District Average',
    color: 'hsl(var(--muted))',
  },
} satisfies ChartConfig;

export default function PeerBenchmarkingGraph() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={mockBenchmarkingData}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="crop"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent separator=": " />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="districtAverage" fill="var(--color-districtAverage)" radius={4} />
        <Bar dataKey="yourYield" fill="var(--color-yourYield)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
