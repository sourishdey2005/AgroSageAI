
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPricePrediction } from '@/lib/mock-data';
import { Bot, Loader2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AiPricePredictor() {
    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState<any | null>(null);

    const handlePredict = () => {
        setIsLoading(true);
        setPrediction(null);
        setTimeout(() => {
            setPrediction(mockPricePrediction);
            setIsLoading(false);
        }, 1500)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-end gap-2">
                <div className="flex-grow">
                    <label className="text-sm font-medium">Crop</label>
                    <Select defaultValue="Tomato">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tomato">Tomato</SelectItem>
                            <SelectItem value="Wheat">Wheat</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <Button onClick={handlePredict} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Predict
                </Button>
            </div>
            {isLoading && <div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {!prediction && !isLoading && <div className="flex justify-center items-center h-48 text-muted-foreground border-2 border-dashed rounded-md">Click Predict to see the AI price forecast.</div>}
            {prediction && (
                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Predicted Spike</p>
                        <p className="text-3xl font-bold text-primary">₹{prediction.spikePrice} <span className="text-lg">in {prediction.spikeDays} days</span></p>
                    </div>
                     <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={prediction.trend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="day" stroke="" />
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} tickFormatter={(v) => `₹${v}`} stroke="" />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}
