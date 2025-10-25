
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Bot, Pickaxe, Route, TestTube2 } from 'lucide-react';
import TradeVolumeOverview from '@/components/dashboard/agent/analytics/trade-volume-overview';
import SupplyChainFlow from '@/components/dashboard/agent/analytics/supply-chain-flow';
import AiPricePredictor from '@/components/dashboard/agent/analytics/ai-price-predictor';
import RegionalCropSuitabilityMap from '@/components/dashboard/agent/analytics/regional-crop-suitability-map';

export default function AgentAnalyticsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-headline tracking-tight">
                    Agent Analytics
                </h1>
                <p className="text-muted-foreground">
                    Advanced tools for supply chain, volume, and predictive analysis.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart3 /> Trade Volume Overview</CardTitle>
                        <CardDescription>Track buying/selling volume by crop and region.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TradeVolumeOverview />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Route /> Supply Chain Flow</CardTitle>
                        <CardDescription>Visual diagram showing the movement of goods from farm to market.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SupplyChainFlow />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> AI Price Predictor</CardTitle>
                        <CardDescription>Predict price spikes based on historical data and market signals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AiPricePredictor />
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Pickaxe /> Regional Crop Suitability Map</CardTitle>
                        <CardDescription>Heatmap of crop feasibility based on soil type and weather patterns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RegionalCropSuitabilityMap />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
