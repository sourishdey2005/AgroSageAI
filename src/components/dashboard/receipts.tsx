
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, FileText, Loader2, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateYieldAndProfitReceipt } from '@/ai/flows/yield-and-profit-receipt';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { mockTransactions, type MockTransaction } from '@/lib/mock-data';

const chartConfig = {
  forecastedPrice: {
    label: 'Forecasted Price',
    color: 'hsl(var(--chart-2))',
  },
  actualPrice: {
    label: 'Actual Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function ReceiptsTab() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<MockTransaction>(mockTransactions[0]);
  const { toast } = useToast();

  const handleGeneratePdf = async (tx: MockTransaction) => {
    setIsGenerating(tx.id);
    try {
      const { receipt: base64Pdf } = await generateYieldAndProfitReceipt({
        cropName: tx.cropName,
        predictedYield: tx.yield,
        predictedPrice: tx.forecastedPrice,
        bestSellDate: new Date(tx.date).toLocaleDateString(),
        recommendedMandi: tx.mandi,
      });

      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${base64Pdf}`;
      link.download = `AgroSage_Receipt_${tx.cropName}_${tx.date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Receipt Downloaded',
        description: `The receipt for ${tx.cropName} has been downloaded.`,
      });
    } catch (error) {
      console.error('Error generating receipt:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the PDF receipt.',
      });
    } finally {
      setIsGenerating(null);
    }
  };

  const chartData = [
    {
      label: 'Price (₹/kg)',
      forecastedPrice: selectedTx.forecastedPrice,
      actualPrice: selectedTx.actualPrice,
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>🧾 Digital Receipt Vault</CardTitle>
          <CardDescription>
            An interactive list of your past crop sales. Select one to analyze.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mandi</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="cursor-pointer"
                  data-state={selectedTx.id === tx.id ? 'selected' : ''}
                >
                  <TableCell className="font-medium">{tx.cropName}</TableCell>
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                  <TableCell>{tx.mandi}</TableCell>
                  <TableCell className="text-right">
                     <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTx(tx);
                      }}
                      className="mr-2"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Analyze
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                         e.stopPropagation();
                         handleGeneratePdf(tx)
                        }}
                      disabled={isGenerating === tx.id}
                    >
                      {isGenerating === tx.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Price Analysis</CardTitle>
          <CardDescription>
            Forecast vs. Actual Price for{' '}
            <span className="font-bold text-primary">{selectedTx.cropName}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Forecasted Price</p>
                    <p className="text-2xl font-bold">₹{selectedTx.forecastedPrice.toLocaleString()}<span className="text-sm text-muted-foreground">/kg</span></p>
                </div>
                 <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Actual Price</p>
                    <p className="text-2xl font-bold">₹{selectedTx.actualPrice.toLocaleString()}<span className="text-sm text-muted-foreground">/kg</span></p>
                </div>
            </div>
          <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <BarChart accessibilityLayer data={chartData} margin={{left: -20, right: 20}}>
              <CartesianGrid vertical={false} />
              <YAxis tickLine={false} axisLine={false} hide />
              <XAxis dataKey="label" tickLine={false} axisLine={false} hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="forecastedPrice" fill="var(--color-forecastedPrice)" radius={4} />
              <Bar dataKey="actualPrice" fill="var(--color-actualPrice)" radius={4} />
            </BarChart>
          </ChartContainer>
            <div className="flex items-center justify-center gap-2 text-sm">
                {selectedTx.actualPrice >= selectedTx.forecastedPrice ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <p>
                    {selectedTx.actualPrice >= selectedTx.forecastedPrice ? 'Exceeded' : 'Below'} forecast by{' '}
                    <span className="font-bold">
                        ₹{Math.abs(selectedTx.actualPrice - selectedTx.forecastedPrice).toLocaleString()}/kg
                    </span>
                </p>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
