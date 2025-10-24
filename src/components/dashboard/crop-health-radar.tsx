
'use client';

import { useState, useEffect } from 'react';
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
import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

const chartData = [
  { metric: 'Disease Risk', value: 45, fullMark: 100 },
  { metric: 'Soil Quality', value: 78, fullMark: 100 },
  { metric: 'Humidity', value: 65, fullMark: 100 },
  { metric: 'Pest Activity', value: 30, fullMark: 100 },
  { metric: 'Nutrient Level', value: 85, fullMark: 100 },
];

const chartConfig = {
  value: {
    label: 'Score',
    color: 'hsl(var(--primary))',
  },
};

export default function CropHealthRadar() {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: Math.floor(Math.random() * (item.fullMark - 20)) + 20,
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>🌱 Crop Health Radar</CardTitle>
        <CardDescription>
          A real-time overview of key health metrics for your crops.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <RadarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
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
      </CardContent>
    </Card>
  );
}
