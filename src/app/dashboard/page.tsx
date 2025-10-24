
'use client';

import CropHealthRadar from '@/components/dashboard/crop-health-radar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Bot, Leaf, LineChart, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Welcome, Farmer!
        </h1>
        <p className="text-muted-foreground">
          Here is an overview of your farm's current status and tools.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <CropHealthRadar />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Leaf /> Crop Health</CardTitle>
                <CardDescription>Monitor diseases and analyze crop vitality.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/dashboard/crop-health">Go to Crop Health</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><LineChart /> Market Insights</CardTitle>
                <CardDescription>Predict prices and find the best time to sell.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/dashboard/market-insights">Go to Market Insights</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Receipt /> Receipts</CardTitle>
                <CardDescription>Manage your sales and generate PDF receipts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/dashboard/receipts">Go to Receipts</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AreaChart /> Analytics</CardTitle>
                <CardDescription>Analyze profits and weather correlations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/dashboard/analytics">Go to Analytics</Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot /> AgroBot</CardTitle>
                <CardDescription>Ask our AI assistant for farming advice.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/dashboard/chatbot">Go to Chatbot</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
