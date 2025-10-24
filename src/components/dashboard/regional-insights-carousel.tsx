
'use client';

import * as React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { mockRegionalData } from '@/lib/mock-data';
import { Wheat, TriangleAlert, TrendingUp, TrendingDown } from 'lucide-react';

export default function RegionalInsightsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const getPriceTrendIcon = (trend: string) => {
    if (trend === 'Increasing') return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (trend === 'Decreasing') return <TrendingDown className="h-5 w-5 text-red-500" />;
    return null;
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {mockRegionalData.map((data, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-muted-foreground">{data.region}</p>
                        <p className="text-2xl font-bold font-headline">{data.crop}</p>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                        <div className="flex flex-col items-center">
                             <p className="text-sm font-semibold text-muted-foreground">Outbreaks</p>
                             <div className="flex items-center gap-1">
                                <TriangleAlert className="h-5 w-5 text-destructive" />
                                <p className="text-xl font-bold">{data.diseaseOutbreaks}</p>
                             </div>
                        </div>
                        <div className="flex flex-col items-center">
                             <p className="text-sm font-semibold text-muted-foreground">Price Trend</p>
                             <div className="flex items-center gap-1">
                                {getPriceTrendIcon(data.priceTrend)}
                                <p className="text-xl font-bold">{data.priceTrend}</p>
                             </div>
                        </div>
                    </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
