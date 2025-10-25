
import { RegionalSupplyDemand } from "@/components/dashboard/agent/regional-supply-demand";
import { QualityAssessment } from "@/components/dashboard/agent/quality-assessment";
import { MarketVolatility } from "@/components/dashboard/agent/market-volatility";
import { LogisticsPlanner } from "@/components/dashboard/agent/logistics-planner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageSquare, BarChart, Map, Bot, Calculator, MessageCircle } from "lucide-react";
import LiveMandiAnalyticsBoard from "@/components/dashboard/agent/live-mandi-analytics-board";
import ProfitOpportunityMap from "@/components/dashboard/agent/profit-opportunity-map";
import FarmerQueryChatPanel from "@/components/dashboard/agent/farmer-query-chat-panel";
import TaxSubsidyCalculator from "@/components/dashboard/agent/tax-subsidy-calculator";
import AiNegotiationChat from "@/components/dashboard/agent/ai-negotiation-chat";

export default function AgentDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-headline tracking-tight">
                    Agent & Trader Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Market analysis, supply/demand, and logistics planning tools.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart /> Live Mandi Analytics Board</CardTitle>
                        <CardDescription>Real-time mandi price graph from multiple regions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LiveMandiAnalyticsBoard />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1 row-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> Farmer Query Chat Panel</CardTitle>
                        <CardDescription>Handle disease or market queries from farmers directly.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <FarmerQueryChatPanel />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map /> Profit Opportunity Map</CardTitle>
                        <CardDescription>Identify where to buy/sell based on price differences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfitOpportunityMap />
                    </CardContent>
                </Card>
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calculator /> Tax & Subsidy Calculator</CardTitle>
                        <CardDescription>Compute GST, MSP difference, and subsidy eligibility.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TaxSubsidyCalculator />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MessageCircle /> AI Negotiation Chat</CardTitle>
                        <CardDescription>AI helps simulate negotiation outcomes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AiNegotiationChat />
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Regional Supply & Demand</CardTitle>
                        <CardDescription>Visualize crop supply and market demand across different regions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegionalSupplyDemand />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Crop Quality Assessment</CardTitle>
                        <CardDescription>Assess crop quality to determine fair market pricing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <QualityAssessment />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Market Volatility</CardTitle>
                        <CardDescription>Analyze price volatility for key crops in major mandis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MarketVolatility />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Logistics Planner</CardTitle>
                        <CardDescription>Optimize transportation routes and storage solutions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LogisticsPlanner />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
