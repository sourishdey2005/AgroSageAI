
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { mockInventoryData } from '@/lib/mock-data';
import { Label, Pie, PieChart, Cell } from 'recharts';

const chartConfig = {
  value: {
    label: 'Quantity',
  },
  ...Object.fromEntries(
    mockInventoryData.map((item, index) => [
      item.name,
      { label: item.name, color: `hsl(var(--chart-${index + 1}))` },
    ])
  ),
};

export default function InventoryTracker() {
  const totalQuantity = mockInventoryData.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={mockInventoryData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="text-3xl font-bold fill-foreground"
                    >
                      {totalQuantity.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="text-sm fill-muted-foreground"
                    >
                      Total Items
                    </tspan>
                  </text>
                );
              }
            }}
          />
           {mockInventoryData.map((entry) => (
            <Cell
              key={entry.name}
              fill={`var(--color-${entry.name})`}
              className="outline-none"
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
