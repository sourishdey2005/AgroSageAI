import { RegionalSupplyDemand } from "@/components/dashboard/agent/regional-supply-demand";
import { QualityAssessment } from "@/components/dashboard/agent/quality-assessment";
import { MarketVolatility } from "@/components/dashboard/agent/market-volatility";
import { LogisticsPlanner } from "@/components/dashboard/agent/logistics-planner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
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
                <Card className="lg:col-span-2">
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
