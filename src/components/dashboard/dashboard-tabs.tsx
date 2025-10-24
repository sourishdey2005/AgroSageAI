
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Leaf, LineChart, Receipt, AreaChart } from 'lucide-react';
import CropHealthTab from './crop-health';
import MarketInsightsTab from './market-insights';
import ReceiptsTab from './receipts';
import ChatbotTab from './chatbot';
import AnalyticsTab from './analytics';

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="crop-health" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="crop-health" className="py-2">
          <Leaf className="mr-2" />
          Crop Health
        </TabsTrigger>
        <TabsTrigger value="market-insights" className="py-2">
          <LineChart className="mr-2" />
          Market Insights
        </TabsTrigger>
        <TabsTrigger value="receipts" className="py-2">
          <Receipt className="mr-2" />
          Receipts
        </TabsTrigger>
        <TabsTrigger value="analytics" className="py-2">
            <AreaChart className="mr-2" />
            Analytics
        </TabsTrigger>
        <TabsTrigger value="chatbot" className="py-2">
          <Bot className="mr-2" />
          AgroBot
        </TabsTrigger>
      </TabsList>
      <TabsContent value="crop-health" id="crop-health" className="mt-4">
        <CropHealthTab />
      </TabsContent>
      <TabsContent value="market-insights" id="market-insights" className="mt-4">
        <MarketInsightsTab />
      </TabsContent>
      <TabsContent value="receipts" id="receipts" className="mt-4">
        <ReceiptsTab />
      </TabsContent>
      <TabsContent value="analytics" id="analytics" className="mt-4">
        <AnalyticsTab />
      </TabsContent>
      <TabsContent value="chatbot" id="chatbot" className="mt-4">
        <ChatbotTab />
      </TabsContent>
    </Tabs>
  );
}
