'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { crops, mandis } from '@/lib/data';
import { analyzeMarketPriceTrend, type MarketPriceTrendOutput } from '@/ai/flows/market-price-trend-analysis';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Calendar as CalendarIcon, MapPin, TrendingUp, BarChart } from 'lucide-react';
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Area, AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const formSchema = z.object({
  crop: z.string().min(1, 'Please select a crop.'),
  location: z.string().min(1, 'Please select a location.'),
  currentPrices: z.string().min(1, 'Please enter current prices.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function MarketInsightsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MarketPriceTrendOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { crop: '', location: '', currentPrices: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    const prices = values.currentPrices.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    
    if (prices.length === 0) {
        toast({
            variant: 'destructive',
            title: 'Invalid Prices',
            description: 'Please enter a comma-separated list of numbers.',
        });
        setIsLoading(false);
        return;
    }

    try {
      const response = await analyzeMarketPriceTrend({
        crop: values.crop,
        location: values.location,
        currentPrices: prices,
      });
      setResult(response);
    } catch (error) {
      console.error('Error analyzing market price:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not get a market price analysis from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = result?.predictedPriceTrend.map((price, index) => ({
    day: `Day ${index + 1}`,
    price: price,
  })) || [];

  const chartConfig = {
    price: {
      label: 'Price (₹)',
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Market Price Prediction</CardTitle>
          <CardDescription>Enter crop details to predict the 7-day price trend.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a crop" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop.value} value={crop.value}>{crop.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mandi (Market)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a mandi" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mandis.map((mandi) => (
                          <SelectItem key={mandi.value} value={mandi.value}>{mandi.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPrices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Prices (last few days)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 48, 50, 52" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
                Predict Trend
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Analysis</CardTitle>
            <CardDescription>Insights based on your inputs and market data.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {!isLoading && !result && <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4">Your analysis and price chart will appear here.</div>}
            {result && (
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <Card className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">{result.bestSellDate}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2"><CalendarIcon className="h-4 w-4" />Best Sell Date</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-accent">{result.recommendedMandi}</CardTitle>
                    <CardDescription className="flex items-center justify-center gap-2"><MapPin className="h-4 w-4" />Recommended Mandi</CardDescription>
                  </CardHeader>
                </Card>
                 <Card className="md:col-span-3 bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-left">{result.analysis}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Predicted Price Trend (Next 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke=""
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    stroke=""
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
                 <div className="flex items-center justify-center h-[250px] text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
                    The price trend graph will be displayed here once you generate a prediction.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    