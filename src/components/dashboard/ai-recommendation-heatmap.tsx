
'use client';

import { mockRecommendationEffectiveness } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function AiRecommendationHeatmap() {
  const crops = Object.keys(mockRecommendationEffectiveness);
  const treatments = Object.keys(mockRecommendationEffectiveness[crops[0]]);

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness > 0.9) return 'bg-green-500/80';
    if (effectiveness > 0.75) return 'bg-green-500/60';
    if (effectiveness > 0.6) return 'bg-yellow-500/70';
    if (effectiveness > 0.4) return 'bg-yellow-500/50';
    if (effectiveness > 0.2) return 'bg-orange-500/60';
    return 'bg-red-500/70';
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-3 font-semibold text-muted-foreground border-b">Crop</th>
              {treatments.map((treatment) => (
                <th key={treatment} className="p-3 font-semibold text-muted-foreground border-b text-center">
                  {treatment}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {crops.map((crop) => (
              <tr key={crop} className="hover:bg-muted/50">
                <td className="p-3 font-semibold border-b">{crop}</td>
                {treatments.map((treatment) => {
                  const effectiveness = mockRecommendationEffectiveness[crop as keyof typeof mockRecommendationEffectiveness][treatment as keyof typeof mockRecommendationEffectiveness[keyof typeof mockRecommendationEffectiveness]];
                  return (
                    <td key={`${crop}-${treatment}`} className="p-1 border-b text-center">
                       <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                'w-full h-10 rounded-md flex items-center justify-center font-bold text-white',
                                getEffectivenessColor(effectiveness)
                                )}
                            >
                                {(effectiveness * 100).toFixed(0)}%
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Effectiveness: {(effectiveness * 100).toFixed(0)}%</p>
                        </TooltipContent>
                       </Tooltip>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
