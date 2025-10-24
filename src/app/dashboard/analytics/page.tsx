import AiRecommendationHeatmap from '@/components/dashboard/ai-recommendation-heatmap';
import AnalyticsTab from '@/components/dashboard/analytics';
import FarmRoiVisualizer from '@/components/dashboard/farm-roi-visualizer';
import GoalTrackerWidget from '@/components/dashboard/goal-tracker-widget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnalyticsTab />
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
    </div>
  );
}
