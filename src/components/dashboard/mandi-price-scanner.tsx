
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ScanBarcode, IndianRupee, MapPin } from 'lucide-react';
import { mockInstantPrices } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

type ScanResult = {
  price: number;
  mandi: string;
};

export default function MandiPriceScanner() {
  const [cropName, setCropName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { toast } = useToast();

  const handleScan = () => {
    if (!cropName) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please enter a crop name to scan.',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const formattedCropName = cropName.charAt(0).toUpperCase() + cropName.slice(1).toLowerCase();
      const priceData = mockInstantPrices[formattedCropName as keyof typeof mockInstantPrices];
      
      if (priceData) {
        setResult(priceData);
      } else {
        toast({
          variant: 'default',
          title: 'Not Found',
          description: `Could not find an instant price for "${formattedCropName}".`,
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ScanBarcode /> Mandi Price Scanner</CardTitle>
        <CardDescription>Get instant market prices for any crop with a barcode-style search.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium">Enter Crop Name</p>
          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="e.g., Tomato"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              disabled={isLoading}
            />
            <Button onClick={handleScan} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanBarcode className="h-4 w-4" />}
              <span className="ml-2">Scan</span>
            </Button>
          </div>
        </div>
        <div>
          {isLoading && (
            <div className="flex items-center justify-center h-full min-h-[100px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {!isLoading && !result && (
            <div className="flex items-center justify-center h-full min-h-[100px] text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
              Scanned price information will appear here.
            </div>
          )}
          {!isLoading && result && (
            <Alert variant="default" className="border-primary/50">
              <AlertTitle className="font-bold text-lg text-primary">{cropName.charAt(0).toUpperCase() + cropName.slice(1).toLowerCase()}</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    <span className="text-xl font-bold">₹{result.price}</span>
                    <span className="text-muted-foreground">/kg</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>in {result.mandi} Mandi</span>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
