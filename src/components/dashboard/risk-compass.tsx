
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { mockRiskData } from '@/lib/mock-data';
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

const chartConfig = {
  value: {
    label: 'Risk Level',
    color: 'hsl(var(--destructive))',
  },
};

export default function RiskCompass() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[180px] w-full"
    >
      <RadarChart
        data={mockRiskData}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
        <PolarGrid gridType="circle" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.6}
          stroke="var(--color-value)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  );
}
