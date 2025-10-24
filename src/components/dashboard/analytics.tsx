
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfitProjectionMeter from './profit-projection-meter';
import YieldWeatherCorrelation from './yield-weather-correlation';

export default function AnalyticsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
