

'use client';

import CropHealthRadar from '@/components/dashboard/crop-health-radar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Bot, Leaf, LineChart, Receipt, Bell, AlertTriangle, TrendingUp as TrendingUpIcon, ArrowRight, BookText, Compass, Zap, ListChecks, GraduationCap, Globe } from 'lucide-react';
import Link from 'next/link';
import { generateWeeklyReport } from '@/ai/flows/weekly-report-flow';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import RiskCompass from '@/components/dashboard/risk-compass';
import EnergyConsumptionDashboard from '@/components/dashboard/energy-consumption-dashboard';
import DailyActionTimeline from '@/components/dashboard/daily-action-timeline';
import KnowledgeHub from '@/components/dashboard/knowledge-hub';
import RegionalInsightsCarousel from '@/components/dashboard/regional-insights-carousel';

const alerts = [
    {
        id: 'alert-1',
        type: 'disease',
        title: 'Leaf Curl Detected',
        description: 'High confidence detection in Zone A3. Immediate action recommended.',
        actionText: 'View Details',
        actionLink: '/dashboard/crop-health',
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />
    },
    {
        id: 'alert-2',
        type: 'market',
        title: 'New Market High for Tomato!',
        description: 'Tomato prices in Pune Mandi have reached a 30-day high. Consider selling now.',
        actionText: 'Analyze Market',
        actionLink: '/dashboard/market-insights',
        icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />
    },
     {
        id: 'alert-3',
        type: 'system',
        title: 'Treatment Overdue',
        description: 'Next dose of Copper Fungicide is overdue by 2 days.',
        actionText: 'View Timeline',
        actionLink: '/dashboard/crop-health',
        icon: <Bell className="h-5 w-5 text-yellow-500" />
    },
]

export default function DashboardPage() {
    const [weeklySummary, setWeeklySummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await generateWeeklyReport({
                    currentWeekPerformance: 15,
                    previousWeekPerformance: -5,
                    topPerformingCrop: 'Tomato',
                    cropPerformance: 25,
                });
                setWeeklySummary(response.summary);
            } catch (error) {
                console.error("Error generating weekly summary:", error);
                setWeeklySummary("Could not load AI summary. Please try again later.");
            } finally {
                setIsSummaryLoading(false);
            }
        };

        fetchSummary();
    }, []);

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
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe /> Regional Insights</CardTitle>
            <CardDescription>A carousel of key agricultural data from various regions.</CardDescription>
        </CardHeader>
        <CardContent>
            <RegionalInsightsCarousel />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookText /> AI Narrative Summary</CardTitle>
                    <CardDescription>Your weekly farm performance report.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isSummaryLoading ? (
                        <div className="flex items-center justify-center h-24">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <p className="text-sm">{weeklySummary}</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Compass /> Risk Compass</CardTitle>
                    <CardDescription>Financial, disease, and weather risk factors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RiskCompass />
                </CardContent>
            </Card>
            <div className="md:col-span-2">
                <CropHealthRadar />
            </div>
         </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell /> Real-Time Alerts</CardTitle>
                    <CardDescription>Immediate notifications for your farm.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg border bg-background/50">
                            <div>{alert.icon}</div>
                            <div className="flex-1">
                                <p className="font-semibold">{alert.title}</p>
                                <p className="text-xs text-muted-foreground">{alert.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={alert.actionLink}>
                                    <span className="hidden sm:inline">{alert.actionText}</span>
                                    <ArrowRight className="h-4 w-4 sm:ml-2" />
                                </Link>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListChecks /> Daily Action Timeline</CardTitle>
                <CardDescription>Your AI-generated hourly plan for today.</CardDescription>
            </CardHeader>
            <CardContent>
                <DailyActionTimeline />
            </CardContent>
        </Card>
         <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GraduationCap /> Knowledge Hub</CardTitle>
                <CardDescription>AI-curated farming best practices for your current crop.</CardDescription>
            </CardHeader>
            <CardContent>
                <KnowledgeHub />
            </CardContent>
        </Card>
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap /> Energy Consumption Dashboard</CardTitle>
                <CardDescription>Track the energy vs. water yield ratio for solar-powered irrigation.</CardDescription>
            </CardHeader>
            <CardContent>
                <EnergyConsumptionDashboard />
            </CardContent>
        </Card>
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
