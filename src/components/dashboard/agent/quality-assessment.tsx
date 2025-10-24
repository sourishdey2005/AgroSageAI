'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';

export function QualityAssessment() {
  const [grade, setGrade] = useState('A');
  const [moisture, setMoisture] = useState(12);
  const [defects, setDefects] = useState(3);
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculatePrice = () => {
    setIsLoading(true);
    // Mock price calculation
    setTimeout(() => {
      let basePrice = 50;
      if (grade === 'B') basePrice = 45;
      if (grade === 'C') basePrice = 40;
      const moisturePenalty = Math.max(0, moisture - 10) * 0.5;
      const defectPenalty = defects * 1.5;
      const finalPrice = basePrice - moisturePenalty - defectPenalty;
      setPrice(finalPrice);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select onValueChange={setGrade} defaultValue={grade}>
            <SelectTrigger id="grade">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Grade A</SelectItem>
              <SelectItem value="B">Grade B</SelectItem>
              <SelectItem value="C">Grade C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
            <Label>Moisture Content (%)</Label>
             <Slider
                value={[moisture]}
                max={25}
                step={1}
                onValueChange={(value) => setMoisture(value[0])}
            />
            <div className="text-center text-sm text-muted-foreground">{moisture}%</div>
        </div>
        <div className="space-y-2">
            <Label>Defect Percentage (%)</Label>
             <Slider
                value={[defects]}
                max={10}
                step={1}
                onValueChange={(value) => setDefects(value[0])}
            />
            <div className="text-center text-sm text-muted-foreground">{defects}%</div>
        </div>
      </div>
      <Button onClick={handleCalculatePrice} disabled={isLoading} className="w-full">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
        Calculate Fair Price
      </Button>
      {price !== null && (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Suggested Fair Price</p>
            <p className="text-3xl font-bold text-primary">₹{price.toFixed(2)} / kg</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
