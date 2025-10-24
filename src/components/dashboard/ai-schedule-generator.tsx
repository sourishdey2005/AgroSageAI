
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, CalendarCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineTitle, TimelineIcon, TimelineContent } from './timeline';

const growthStages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting'];

// Mock AI-generated schedule
const mockSchedule = {
  Seedling: [
    { activity: 'Light Watering', frequency: 'Daily' },
    { activity: 'Check for Damping-off', frequency: 'Every 2 days' },
    { activity: 'Thinning', frequency: 'Once, after 2 weeks' },
  ],
  Vegetative: [
    { activity: 'Nitrogen-rich Fertilization', frequency: 'Every 2 weeks' },
    { activity: 'Regular Watering', frequency: 'Every 2-3 days' },
    { activity: 'Pest Scouting (Aphids)', frequency: 'Weekly' },
  ],
  Flowering: [
    { activity: 'Phosphorus/Potassium-rich Fertilization', frequency: 'Weekly' },
    { activity: 'Pollinator-friendly Practices', frequency: 'Ongoing' },
    { activity: 'Monitor for Blossom Drop', frequency: 'Daily' },
  ],
  Fruiting: [
    { activity: 'Consistent Watering', frequency: 'Daily' },
    { activity: 'Support for Heavy Fruits', frequency: 'As needed' },
    { activity: 'Check for Blight/Rot', frequency: 'Every 3 days' },
  ],
};

export default function AiScheduleGenerator() {
  const [growthStage, setGrowthStage] = useState('Vegetative');
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<typeof mockSchedule.Vegetative | null>(mockSchedule.Vegetative);

  const handleGenerateSchedule = () => {
    setIsLoading(true);
    setSchedule(null);

    setTimeout(() => {
      const result = mockSchedule[growthStage as keyof typeof mockSchedule];
      setSchedule(result);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <div>
          <label className="text-sm font-medium">Select Growth Stage</label>
          <Select onValueChange={setGrowthStage} defaultValue={growthStage}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {growthStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerateSchedule} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Generate Plan
        </Button>
      </div>
      <div className="md:col-span-2">
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!isLoading && !schedule && (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
            Your generated maintenance schedule will appear here.
          </div>
        )}
        {!isLoading && schedule && (
          <Alert>
            <Timeline>
              {schedule.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon>
                      <CalendarCheck className="h-4 w-4" />
                    </TimelineIcon>
                    <TimelineTitle>{item.activity}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>
                    <p className="text-muted-foreground">{item.frequency}</p>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Alert>
        )}
      </div>
    </div>
  );
}
