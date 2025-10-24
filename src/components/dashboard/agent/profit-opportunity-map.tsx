'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ProfitOpportunityMap() {
  const mapPlaceholder = PlaceHolderImages.find(
    (img) => img.id === 'map-placeholder'
  );

  const opportunities = [
    {
      region: 'Nagpur',
      type: 'Buy',
      price: 45,
      style: 'top-[20%] left-[30%] bg-blue-500',
    },
    {
      region: 'Pune',
      type: 'Sell',
      price: 58,
      style: 'top-[50%] left-[15%] bg-green-500',
    },
    {
      region: 'Lucknow',
      type: 'Sell',
      price: 62,
      style: 'top-[35%] right-[25%] bg-green-500',
    },
     {
      region: 'Delhi',
      type: 'Buy',
      price: 48,
      style: 'top-[15%] right-[45%] bg-blue-500',
    },
  ];

  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted">
      {mapPlaceholder && (
        <Image
          src={mapPlaceholder.imageUrl}
          alt="Profit Opportunity Map"
          fill
          className="object-cover opacity-50"
          data-ai-hint={mapPlaceholder.imageHint}
        />
      )}
      <div className="absolute inset-0">
        {opportunities.map((op) => (
          <div
            key={op.region}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${op.style}`}
          >
            <div className="relative">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 shadow-lg text-center w-32">
                <p className="font-bold text-sm">{op.region}</p>
                <p
                  className={`text-lg font-bold ${
                    op.type === 'Sell' ? 'text-green-500' : 'text-blue-500'
                  }`}
                >
                  ₹{op.price}
                </p>
                <p
                  className={`text-xs font-semibold ${
                    op.type === 'Sell' ? 'text-green-500' : 'text-blue-500'
                  }`}
                >
                  {op.type} Here
                </p>
              </div>
               <MapPin className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-5 w-5 ${
                    op.type === 'Sell' ? 'text-green-500' : 'text-blue-500'
                  }`} fill="currentColor" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
