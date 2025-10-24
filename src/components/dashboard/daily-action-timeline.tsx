
'use client';

import { useEffect, useState } from 'react';
import { generateDailyActionPlan, type DailyActionPlanOutput } from '@/ai/flows/daily-action-plan-flow';
import { mockDailyActions } from '@/lib/mock-data';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Action = DailyActionPlanOutput['plan'][0];

const TimelineItem = ({ action, isLast }: { action: Action; isLast: boolean }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={cn(
            'rounded-full h-8 w-8 flex items-center justify-center border-2 transition-colors',
            isCompleted
              ? 'bg-green-500 border-green-600 text-white'
              : 'bg-background hover:bg-muted'
          )}
        >
          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </button>
        {!isLast && <div className="w-px h-full bg-border flex-grow" />}
      </div>
      <div className="pb-8 flex-1">
        <p className={cn("font-semibold", isCompleted && 'line-through text-muted-foreground')}>
            <span className="font-mono text-sm text-primary mr-2">{action.time}</span>
            {action.task}
        </p>
        <p className={cn("text-sm text-muted-foreground", isCompleted && 'line-through')}>
            {action.description}
        </p>
      </div>
    </div>
  );
};


export default function DailyActionTimeline() {
  const [plan, setPlan] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlan = async () => {
      setIsLoading(true);
      try {
        const response = await generateDailyActionPlan({ crop: 'Tomato', weather: 'Sunny, 32°C' });
        setPlan(response.plan);
      } catch (error) {
        console.error('Error generating daily plan:', error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not generate daily plan. Using mock data.',
        });
        setPlan(mockDailyActions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative h-96 overflow-y-auto pr-4">
      {plan.map((action, index) => (
        <TimelineItem key={index} action={action} isLast={index === plan.length - 1} />
      ))}
    </div>
  );
}
