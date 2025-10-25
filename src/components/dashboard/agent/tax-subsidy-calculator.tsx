
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, IndianRupee } from 'lucide-react';
import { crops } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock MSP and subsidy data
const mockMsp = {
  Tomato: 20,
  Wheat: 22,
  Rice: 25,
  Potato: 15,
  Onion: 18,
};

const GST_RATE = 0.05; // 5%

export default function TaxSubsidyCalculator() {
  const [crop, setCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState(1000);
  const [price, setPrice] = useState(25);
  const [results, setResults] = useState<{
    totalValue: number;
    gstAmount: number;
    mspDifference: number;
    subsidyEligible: boolean;
    subsidyAmount: number;
  } | null>(null);

  const handleCalculate = () => {
    const msp = mockMsp[crop as keyof typeof mockMsp];
    const totalValue = quantity * price;
    const gstAmount = totalValue * GST_RATE;
    const mspDifference = (msp - price) * quantity;
    const subsidyEligible = price < msp;
    const subsidyAmount = subsidyEligible ? mspDifference : 0;

    setResults({
      totalValue,
      gstAmount,
      mspDifference,
      subsidyEligible,
      subsidyAmount,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Crop</Label>
          <Select onValueChange={setCrop} defaultValue={crop}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {crops.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="quantity">Quantity (kg)</Label>
          <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        </div>
        <div>
          <Label htmlFor="price">Sale Price (₹/kg)</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
      </div>
      <Button onClick={handleCalculate} className="w-full">
        <Calculator className="mr-2 h-4 w-4" /> Calculate
      </Button>

      {results && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h4 className="font-semibold text-center">Calculation Results</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-center p-2 border rounded-md">
                    <p className="text-muted-foreground">Total Value</p>
                    <p className="font-bold text-lg">₹{results.totalValue.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                    <p className="text-muted-foreground">GST (5%)</p>
                    <p className="font-bold text-lg">₹{results.gstAmount.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                    <p className="text-muted-foreground">MSP Difference</p>
                    <p className={`font-bold text-lg ${results.mspDifference > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        ₹{Math.abs(results.mspDifference).toLocaleString()}
                    </p>
                </div>
                 <div className="flex flex-col items-center p-2 border rounded-md">
                    <p className="text-muted-foreground">Subsidy</p>
                    <p className={`font-bold text-lg ${results.subsidyEligible ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {results.subsidyEligible ? `₹${results.subsidyAmount.toLocaleString()}` : 'Not Eligible'}
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
