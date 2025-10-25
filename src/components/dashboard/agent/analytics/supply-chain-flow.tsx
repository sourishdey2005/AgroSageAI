
'use client';

import { ResponsiveSankey } from '@nivo/sankey';
import { mockSupplyChainData } from '@/lib/mock-data';

// Nivo charts are not themed by default, so we apply colors manually.
// These would ideally come from your Tailwind/CSS variables.
const theme = {
    textColor: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: 'hsl(var(--border))',
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: 'hsl(var(--border))',
          strokeWidth: 1,
        },
      },
    },
    grid: {
      line: {
        stroke: 'hsl(var(--border))',
        strokeWidth: 1,
      },
    },
};

export default function SupplyChainFlow() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveSankey
        data={mockSupplyChainData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        theme={theme}
      />
    </div>
  );
}
