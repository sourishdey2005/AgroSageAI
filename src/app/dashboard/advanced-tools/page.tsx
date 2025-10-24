
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockAchievementBadges, mockPriceConfidence } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Award, BrainCircuit, Heart, ShieldCheck, TrendingUp, Ship, FlaskConical, TestTube, ChevronsRight, Crown, Tractor, Leaf, Droplets, Sun, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, LineChart, Line, Tooltip as RechartsTooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BadgeIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      default: return <Award className={className} />;
    }
};

const BeforeAfterVisuals = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2">
                <Image src="https://picsum.photos/seed/before/400/300" alt="Before treatment" width={400} height={300} className="rounded-md" />
                <p className="font-semibold">Before Treatment</p>
                <p className="text-xs text-muted-foreground">July 15, 2024</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Image src="https://picsum.photos/seed/after/400/300" alt="After treatment" width={400} height={300} className="rounded-md" />
                <p className="font-semibold">After Treatment</p>
                <p className="text-xs text-muted-foreground">July 22, 2024</p>
            </div>
        </div>
    );
};

const PriceForecastConfidence = () => {
    const chartConfig = {
        confidence: { label: 'Confidence', color: 'hsl(var(--primary))' },
    };
    return (
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={mockPriceConfidence}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" stroke="" />
                <YAxis domain={[50, 100]} stroke="" tickFormatter={(value) => `${value}%`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="confidence" fill="var(--color-confidence)" radius={4}>
                    <LabelList position="top" offset={5} className="fill-foreground text-sm" formatter={(value: number) => `${value}%`} />
                </Bar>
            </BarChart>
        </ChartContainer>
    );
};

const AchievementBadges = () => {
    return (
        <TooltipProvider>
            <div className="flex justify-center gap-4 flex-wrap">
                {mockAchievementBadges.map((badge) => (
                    <Tooltip key={badge.id}>
                        <TooltipTrigger asChild>
                            <div className={cn("relative h-20 w-20 rounded-full border-4 flex items-center justify-center transition-all", badge.unlocked ? 'border-primary bg-primary/10' : 'border-muted bg-muted/50 opacity-50')}>
                                <BadgeIcon iconName={badge.icon} className={cn("h-8 w-8", badge.unlocked ? 'text-primary' : 'text-muted-foreground')} />
                                {badge.unlocked && <Crown className="absolute -top-3 -right-3 h-6 w-6 text-yellow-500 transform -rotate-12" />}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-bold">{badge.title}</p>
                            <p>{badge.description}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
};

const DeliveryTrackingMap = () => {
    const deliveryMapImage = PlaceHolderImages.find(img => img.id === 'delivery-map-placeholder');
    return (
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted">
            {deliveryMapImage && <Image src={deliveryMapImage.imageUrl} alt="Delivery tracking map" fill className="object-cover" />}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-white">
                <div className="flex items-center gap-4">
                    <Tractor className="h-10 w-10 text-primary animate-pulse" />
                    <ChevronsRight className="h-8 w-8 text-white/50" />
                    <Ship className="h-10 w-10 text-primary" />
                </div>
                <p className="mt-4 font-bold">Live Tracking: En route to Nagpur Mandi</p>
                <p className="text-sm text-gray-300">ETA: 4 hours 32 minutes</p>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent text-white border-white hover:bg-white/10">View Details</Button>
            </div>
        </div>
    );
};

const CropSimulationMode = () => {
    const [delay, setDelay] = useState(3);
    const basePrice = 50;
    const baseProfit = 150000;
    
    // Simulate price changes based on delay. This is a mock simulation.
    const getSimulatedData = (delayDays: number) => {
        let data = [];
        for (let i = 0; i <= 7; i++) {
            const priceVolatility = (Math.sin(i * 0.8) * 5) + (Math.random() * 2 - 1);
            const delayImpact = i <= delayDays ? (delayDays - i) * 0.5 : (i - delayDays) * -1.2;
            const price = basePrice + priceVolatility + delayImpact;

            const yieldChange = 1 - (i * 0.005); // Small yield loss over time
            const profit = (price * 5000 * yieldChange) - 100000; // 5000kg yield, 100k cost

            data.push({
                day: `Day ${i}`,
                price: parseFloat(price.toFixed(2)),
                profit: parseFloat(profit.toFixed(0)),
            });
        }
        return data;
    }
    const [simulatedData, setSimulatedData] = useState(getSimulatedData(delay));

    const handleDelayChange = (value: number[]) => {
        setDelay(value[0]);
        setSimulatedData(getSimulatedData(value[0]));
    }

    const projectedProfit = simulatedData[delay]?.profit || 0;

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="delay-slider" className="flex justify-between">
                    <span>If I delay selling by:</span>
                    <span className="font-bold text-primary">{delay} days</span>
                </Label>
                <Slider
                    id="delay-slider"
                    min={0}
                    max={7}
                    step={1}
                    value={[delay]}
                    onValueChange={handleDelayChange}
                    className="mt-2"
                />
            </div>
            <div className="text-center">
                <p className="text-muted-foreground">Projected Profit at Day {delay}</p>
                <p className="text-4xl font-bold text-primary">₹{projectedProfit.toLocaleString()}</p>
            </div>
            <div>
                <h4 className="text-sm font-semibold mb-2">Profit & Price Simulation (7-day forecast)</h4>
                 <ChartContainer config={{ profit: { label: 'Profit', color: 'hsl(var(--chart-2))' }, price: { label: 'Price', color: 'hsl(var(--chart-1))' } }} className="h-[250px] w-full">
                    <LineChart data={simulatedData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" stroke="" />
                        <YAxis yAxisId="left" stroke="" tickFormatter={(value) => `₹${value / 1000}k`} />
                        <YAxis yAxisId="right" orientation="right" stroke="" tickFormatter={(value) => `₹${value}`} />
                        <RechartsTooltip content={<ChartTooltipContent />} />
                        <Line yAxisId="left" type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Profit" />
                        <Line yAxisId="right" type="monotone" dataKey="price" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Price" />
                    </LineChart>
                </ChartContainer>
            </div>
        </div>
    );
};


export default function AdvancedToolsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TestTube /> Before vs. After Visuals</CardTitle>
                    <CardDescription>Compare leaf images pre and post-treatment to see effectiveness.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BeforeAfterVisuals />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles /> Price Forecast Confidence</CardTitle>
                    <CardDescription>Confidence levels from the AI forecast model for the next 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <PriceForecastConfidence />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Achievement Badges</CardTitle>
                    <CardDescription>Visual rewards for your farming milestones and achievements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AchievementBadges />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Ship /> Delivery Tracking Map</CardTitle>
                    <CardDescription>Simulated post-harvest logistics tracking for your produce.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeliveryTrackingMap />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FlaskConical /> Crop Simulation Mode</CardTitle>
                    <CardDescription>Simulate "what-if" scenarios to see projected profit outcomes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CropSimulationMode />
                </CardContent>
            </Card>
        </div>
    )
}
