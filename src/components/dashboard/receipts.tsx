'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateYieldAndProfitReceipt } from '@/ai/flows/yield-and-profit-receipt';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const formSchema = z.object({
  cropName: z.string().min(1, 'Crop name is required.'),
  predictedYield: z.coerce.number().positive('Yield must be a positive number.'),
  predictedPrice: z.coerce.number().positive('Price must be a positive number.'),
  bestSellDate: z.string().min(1, 'Sell date is required.'),
  recommendedMandi: z.string().min(1, 'Mandi is required.'),
});

type FormValues = z.infer<typeof formSchema>;

const mockTransactions = [
  { id: 'txn_001', cropName: 'Tomato', date: '2023-10-25', mandi: 'Pune', status: 'Generated' },
  { id: 'txn_002', cropName: 'Wheat', date: '2023-10-22', mandi: 'Lucknow', status: 'Generated' },
  { id: 'txn_003', cropName: 'Rice', date: '2023-10-20', mandi: 'Nagpur', status: 'Generated' },
];

export default function ReceiptsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { cropName: 'Tomato', predictedYield: 5000, predictedPrice: 54, bestSellDate: 'Oct 29', recommendedMandi: 'Pune' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const { receipt: base64Pdf } = await generateYieldAndProfitReceipt(values);
      
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${base64Pdf}`;
      link.download = `AgroSage_Receipt_${values.cropName}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Receipt Generated',
        description: 'Your PDF receipt has been downloaded.',
      });

    } catch (error) {
      console.error('Error generating receipt:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the PDF receipt from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Yield & Profit Forecast</CardTitle>
          <CardDescription>Generate a digital PDF receipt with your predicted earnings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField control={form.control} name="cropName" render={({ field }) => (
                <FormItem><FormLabel>Crop Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="predictedYield" render={({ field }) => (
                <FormItem><FormLabel>Predicted Yield (kg/acre)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="predictedPrice" render={({ field }) => (
                <FormItem><FormLabel>Predicted Price (₹/kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="bestSellDate" render={({ field }) => (
                <FormItem><FormLabel>Best Sell Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="recommendedMandi" render={({ field }) => (
                <FormItem><FormLabel>Recommended Mandi</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="w-full !mt-6">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Generate & Download PDF
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A list of your recently generated receipts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mandi</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.cropName}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.mandi}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
