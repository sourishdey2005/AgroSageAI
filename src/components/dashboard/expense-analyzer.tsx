
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { mockExpenseData } from '@/lib/mock-data';
import { Label, Pie, PieChart, Cell } from 'recharts';

const chartConfig = {
    value: {
        label: 'Expenses',
    },
    ...Object.fromEntries(
        mockExpenseData.map((item) => [
        item.name,
        { label: item.name, color: item.color },
        ])
    ),
};

export default function ExpenseAnalyzer() {
  const totalExpenses = mockExpenseData.reduce(
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
          data={mockExpenseData}
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
                      ₹{totalExpenses.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="text-sm fill-muted-foreground"
                    >
                      Total Expenses
                    </tspan>
                  </text>
                );
              }
            }}
          />
           {mockExpenseData.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.color}
              className="outline-none"
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
