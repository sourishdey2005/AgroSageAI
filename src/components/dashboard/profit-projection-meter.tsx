
'use client';

import { mockProfitProjections } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, LabelList } from 'recharts';

const chartConfig = {
  achieved: {
    label: 'Achieved',
    color: 'hsl(var(--chart-1))',
  },
  projected: {
    label: 'Projected',
    color: 'hsl(var(--muted))',
  },
};

export default function ProfitProjectionMeter() {
  const { projected, achieved, month } = mockProfitProjections;
  const percentage = (achieved / projected) * 100;
  const chartData = [{ name: 'Profit', projected, achieved }];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-40">
        <svg
          className="h-full w-full"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-muted"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 45 * (percentage / 100)} ${
              2 * Math.PI * 45
            }`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-headline text-primary">
            {percentage.toFixed(0)}%
          </span>
          <span className="text-xs text-muted-foreground">of target</span>
        </div>
      </div>
      <div className="w-full">
        <ChartContainer config={chartConfig} className="h-[80px] w-full">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="projected" stackId="a" fill="var(--color-projected)" radius={[5,5,5,5]}>
                 <LabelList 
                    dataKey="projected" 
                    position="right"
                    formatter={(value: number) => `Projected: ₹${value.toLocaleString()}`}
                    className="fill-muted-foreground text-xs"
                    offset={10}
                 />
            </Bar>
            <Bar dataKey="achieved" stackId="a" fill="var(--color-achieved)" radius={[5,0,0,5]}>
                <LabelList 
                    dataKey="achieved" 
                    position="insideLeft"
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    className="fill-primary-foreground text-xs"
                    offset={10}
                 />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
       <p className="text-sm text-muted-foreground text-center">
        Monthly earnings for {month}
      </p>
    </div>
  );
}
