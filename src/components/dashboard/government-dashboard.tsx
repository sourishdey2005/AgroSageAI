import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { mockRegionalData, mockCropDistribution } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Map } from 'lucide-react';
  
const getSeverityColor = (severity: 'Low' | 'Medium' | 'High' | 'Critical') => {
    switch (severity) {
        case 'Low': return 'bg-green-500/80 border-green-700';
        case 'Medium': return 'bg-yellow-500/80 border-yellow-700';
        case 'High': return 'bg-orange-500/80 border-orange-700';
        case 'Critical': return 'bg-red-600/80 border-red-800';
        default: return 'bg-muted';
    }
}
  
  export function GovernmentDashboard() {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Government Dashboard
        </h1>
        <p className="text-muted-foreground">
          Regional agricultural overview of crop health, market trends, and distribution.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Regional Data</CardTitle>
                <CardDescription>
                Summary of crop health and market trends by region.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Primary Crop</TableHead>
                    <TableHead>Disease Outbreaks (30d)</TableHead>
                    <TableHead>Price Trend</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockRegionalData.map((data) => (
                    <TableRow key={data.region}>
                        <TableCell className="font-medium">{data.region}</TableCell>
                        <TableCell>{data.crop}</TableCell>
                        <TableCell>{data.diseaseOutbreaks}</TableCell>
                        <TableCell>{data.priceTrend}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map /> Geo-Crop Distribution</CardTitle>
                    <CardDescription>Crop map with color-coded disease severity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video w-full bg-muted rounded-md p-4 flex flex-col items-center justify-center text-center text-muted-foreground">
                        <p className="text-sm font-semibold mb-4">Simulated Map of India</p>
                        <div className="w-full max-w-sm space-y-2">
                           {mockCropDistribution.map((region) => (
                             <div key={region.region} className={cn(
                                "p-2 rounded-md border text-sm text-white font-semibold flex justify-between items-center",
                                getSeverityColor(region.diseaseSeverity)
                             )}>
                                <span>{region.region}</span>
                                <span className="text-xs opacity-80">{region.crop}</span>
                             </div>
                           ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }
  