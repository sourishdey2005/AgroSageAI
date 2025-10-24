
'use client';

import { mockGoals } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';

const CircularProgress = ({ percentage, colorClass }: { percentage: number; colorClass: string }) => {
  return (
    <div className="relative h-24 w-24">
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
          className={cn(colorClass)}
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
        <span className="text-xl font-bold font-headline">
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};


export default function GoalTrackerWidget() {
  const goalColors = [
    'text-primary',
    'text-chart-2',
    'text-chart-4',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {mockGoals.map((goal, index) => {
        const percentage = (goal.current / goal.target) * 100;
        const formattedCurrent = goal.unit === '₹' 
            ? `₹${(goal.current / 100000).toFixed(1)}L` 
            : `${goal.current.toLocaleString()}`;
        const formattedTarget = goal.unit === '₹'
            ? `₹${(goal.target / 100000).toFixed(1)}L`
            : `${goal.target.toLocaleString()}`;

        return (
          <div key={goal.name} className="flex flex-col items-center gap-2">
            <CircularProgress percentage={percentage} colorClass={goalColors[index % goalColors.length]} />
            <p className="font-semibold">{goal.name}</p>
            <p className="text-sm text-muted-foreground">
                {formattedCurrent} / {formattedTarget} {goal.unit !== '₹' && goal.unit}
            </p>
          </div>
        );
      })}
    </div>
  );
}

    