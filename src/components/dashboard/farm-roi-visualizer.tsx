
'use client';

import { mockRoiData } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts';

const chartConfig = {
  roi: {
    label: 'ROI (%)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function FarmRoiVisualizer() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        data={mockRoiData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        layout="vertical"
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="crop"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          width={80}
        />
        <XAxis dataKey="roi" type="number" hide />
        <ChartTooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          content={<ChartTooltipContent />}
        />
        <Bar dataKey="roi" fill="var(--color-roi)" radius={4}>
            <LabelList 
                dataKey="roi"
                position="right"
                offset={8}
                className="fill-foreground font-semibold"
                formatter={(value: number) => `${value}%`}
            />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

    