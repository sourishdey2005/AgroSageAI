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
  
  const mockData = [
    {
      region: 'Maharashtra',
      crop: 'Tomato',
      diseaseOutbreaks: 5,
      priceTrend: 'Stable',
    },
    {
      region: 'Uttar Pradesh',
      crop: 'Wheat',
      diseaseOutbreaks: 2,
      priceTrend: 'Increasing',
    },
    {
      region: 'Punjab',
      crop: 'Rice',
      diseaseOutbreaks: 1,
      priceTrend: 'Decreasing',
    },
    {
      region: 'West Bengal',
      crop: 'Potato',
      diseaseOutbreaks: 8,
      priceTrend: 'Stable',
    },
  ];
  
  export function GovernmentDashboard() {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Government Dashboard
        </h1>
        <p className="text-muted-foreground">
          Regional agricultural overview.
        </p>
        <Card>
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
                  <TableHead>Disease Outbreaks (Last 30 Days)</TableHead>
                  <TableHead>Price Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((data) => (
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
      </div>
    );
  }
  