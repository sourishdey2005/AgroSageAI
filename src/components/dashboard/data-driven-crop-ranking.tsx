
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockCropRankingData } from '@/lib/mock-data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

const getDemandColor = (demand: 'High' | 'Medium' | 'Low') => {
  switch (demand) {
    case 'High':
      return 'bg-green-500/20 text-green-700 border-green-500/50';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/50';
    case 'Low':
      return 'bg-red-500/20 text-red-700 border-red-500/50';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground/50';
}

export default function DataDrivenCropRanking() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>Crop</TableHead>
          <TableHead className="text-right">Profit (per acre)</TableHead>
          <TableHead className="text-right">Yield (kg/acre)</TableHead>
          <TableHead className="text-center">Market Demand</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockCropRankingData.map((crop) => (
          <TableRow key={crop.crop} className="font-medium">
            <TableCell>
                <div className="flex items-center justify-center">
                    <Star className={cn('h-6 w-6', getRankColor(crop.rank))} fill="currentColor" />
                    <span className="absolute text-xs font-bold text-white mix-blend-color-burn">{crop.rank}</span>
                </div>
            </TableCell>
            <TableCell className="font-semibold text-base">{crop.crop}</TableCell>
            <TableCell className="text-right text-green-600">₹{crop.profit.toLocaleString()}</TableCell>
            <TableCell className="text-right">{crop.yield.toLocaleString()} kg</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className={cn('font-semibold', getDemandColor(crop.demand as any))}>{crop.demand}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
