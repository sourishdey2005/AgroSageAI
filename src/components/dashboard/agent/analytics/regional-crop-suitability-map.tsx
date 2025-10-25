
'use client';

import { mockCropSuitability } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const getSuitabilityColor = (score: number) => {
  if (score > 80) return 'bg-green-500/80 hover:bg-green-500/90 border-green-700';
  if (score > 60) return 'bg-green-500/60 hover:bg-green-500/70 border-green-600';
  if (score > 40) return 'bg-yellow-500/70 hover:bg-yellow-500/80 border-yellow-600';
  if (score > 20) return 'bg-yellow-500/50 hover:bg-yellow-500/60 border-yellow-500';
  return 'bg-red-500/60 hover:bg-red-500/70 border-red-500';
};

export default function RegionalCropSuitabilityMap() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
        {mockCropSuitability.map((item) => (
          <Tooltip key={item.region}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  'aspect-square border flex items-center justify-center rounded-md p-2 text-center text-xs font-semibold text-white transition-colors cursor-pointer',
                  getSuitabilityColor(item.suitabilityScore)
                )}
              >
                {item.region}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{item.region}</p>
              <p>Best Crop: {item.bestCrop}</p>
              <p>Suitability: {item.suitabilityScore}%</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
