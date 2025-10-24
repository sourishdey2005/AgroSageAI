import AiRecommendationHeatmap from '@/components/dashboard/ai-recommendation-heatmap';
import FarmRoiVisualizer from '@/components/dashboard/farm-roi-visualizer';
import GoalTrackerWidget from '@/components/dashboard/goal-tracker-widget';
import InventoryTracker from '@/components/dashboard/inventory-tracker';
import PeerBenchmarkingGraph from '@/components/dashboard/peer-benchmarking-graph';
import ProfitProjectionMeter from '@/components/dashboard/profit-projection-meter';
import SeasonalCropPlanner from '@/components/dashboard/seasonal-crop-planner';
import YieldWeatherCorrelation from '@/components/dashboard/yield-weather-correlation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>📅 Seasonal Crop Planner</CardTitle>
          <CardDescription>
            Get AI suggestions for the next best crop based on soil type, rainfall, and market trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SeasonalCropPlanner />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>🪙 Profit Projection Meter</CardTitle>
          <CardDescription>
            Gauge showing projected vs. achieved earnings for the current month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfitProjectionMeter />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>🌦️ Weather-Yield Correlation</CardTitle>
          <CardDescription>
            Chart correlating weather patterns with historical crop yield.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YieldWeatherCorrelation />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>🎯 Goal Tracker</CardTitle>
          <CardDescription>
            Circular progress rings for each of your farming goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoalTrackerWidget />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>💹 Farm ROI Visualizer</CardTitle>
          <CardDescription>
            Bar chart showing the Return on Investment (ROI) per crop type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FarmRoiVisualizer />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>🧠 AI Recommendation Heatmap</CardTitle>
          <CardDescription>
            Heatmap showing which fertilizer or pesticide is most effective per crop type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiRecommendationHeatmap />
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>📦 Inventory Tracker</CardTitle>
          <CardDescription>
            Pie chart showing stock levels of fertilizers, pesticides, and seeds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InventoryTracker />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>🧍‍♂️ Peer Benchmarking Graph</CardTitle>
          <CardDescription>
            Compare your yield with the average yield of other farmers in your district.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PeerBenchmarkingGraph />
        </CardContent>
      </Card>
    </div>
  );
}
