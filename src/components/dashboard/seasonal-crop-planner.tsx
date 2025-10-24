
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles, Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty'];
const seasons = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'];

// Mock AI suggestions based on inputs
const mockSuggestions = {
  'Loamy-Kharif (Monsoon)': {
    crop: 'Rice',
    reason: 'Loamy soil provides good water retention and aeration, ideal for rice cultivation during the high-rainfall Kharif season. Market trends show stable demand for rice post-harvest.',
  },
  'Sandy-Rabi (Winter)': {
    crop: 'Barley',
    reason: 'Sandy soil drains well, which is suitable for Rabi crops that require less water. Barley is drought-tolerant and has a strong market in the winter for animal feed and malt production.',
  },
  'Clay-Zaid (Summer)': {
    crop: 'Watermelon',
    reason: 'Clay soil, while heavy, can retain moisture from winter rains into the Zaid season. Watermelons thrive in the summer heat, and their deep root systems can access this moisture. Market demand for watermelons is highest in summer.',
  },
  // Add more combinations as needed
};

export default function SeasonalCropPlanner() {
  const [soilType, setSoilType] = useState('Loamy');
  const [season, setSeason] = useState('Kharif (Monsoon)');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ crop: string; reason: string } | null>(null);

  const handleGetSuggestion = () => {
    setIsLoading(true);
    setSuggestion(null);

    setTimeout(() => {
      const key = `${soilType}-${season}` as keyof typeof mockSuggestions;
      const result = mockSuggestions[key] || {
        crop: 'Millet',
        reason: 'Millets are highly adaptable crops suitable for a wide range of soil types and weather conditions. They have low water requirements and growing market demand due to their nutritional benefits.',
      };
      setSuggestion(result);
      setIsLoading(false);
    }, 1500); // Simulate AI processing time
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <div>
          <label className="text-sm font-medium">Soil Type</label>
          <Select onValueChange={setSoilType} defaultValue={soilType}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              {soilTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Season</label>
          <Tabs defaultValue={season} onValueChange={(value) => setSeason(value)} className="w-full mt-1">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              {seasons.map((s) => (
                <TabsTrigger key={s} value={s} className="text-xs px-1 py-1.5">{s.split(' ')[0]}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button onClick={handleGetSuggestion} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Get Suggestion
        </Button>
      </div>

      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>AI Recommendation</CardTitle>
            <CardDescription>The best crop to plant based on your selections.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && !suggestion && (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
                Your AI crop suggestion will appear here.
              </div>
            )}
            {!isLoading && suggestion && (
              <Alert>
                <Sprout className="h-4 w-4 text-primary" />
                <AlertTitle className="font-bold text-lg">
                  Suggested Crop: <span className="text-primary">{suggestion.crop}</span>
                </AlertTitle>
                <AlertDescription className="mt-2">
                  <strong className="text-foreground">Reasoning:</strong> {suggestion.reason}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
