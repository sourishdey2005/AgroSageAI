
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, AlertCircle, Sparkles, History, Camera, SprayCan, Clock, PieChart as PieChartIcon, Map, LineChart, Sliders, Droplets } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCropDiseaseTreatmentSuggestion } from '@/ai/flows/crop-disease-treatment-suggestion';
import { useToast } from '@/hooks/use-toast';
import { mockDiagnoses, type MockDiagnosis, mockTreatments, type MockTreatment, mockDailyPerformance, mockIrrigationData } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

type AnalysisResult = {
  diseaseName: string;
  severity: string;
  confidence: number;
  treatment: string;
};

const getConfidenceColor = (confidence: number) => {
  if (confidence > 0.9) return 'bg-red-500';
  if (confidence > 0.75) return 'bg-orange-500';
  return 'bg-yellow-500';
};

const TreatmentTimelineItem = ({ treatment, isLast }: { treatment: MockTreatment, isLast: boolean }) => {
    const nextDoseDate = new Date(treatment.nextDose);
    const now = new Date();
    const isOverdue = nextDoseDate < now;
  
    return (
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className={cn("rounded-full h-8 w-8 flex items-center justify-center", isOverdue ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground")}>
            <SprayCan className="h-4 w-4" />
          </div>
          {!isLast && <div className="w-px h-full bg-border flex-grow" />}
        </div>
        <div className="pb-8 flex-1">
          <p className="font-semibold">{treatment.pesticide}</p>
          <p className="text-sm text-muted-foreground">{treatment.diseaseTarget}</p>
          <div className="text-sm mt-1 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {isOverdue ? (
               <span className="text-destructive font-semibold">Overdue by {formatDistanceToNowStrict(nextDoseDate)}</span>
            ) : (
               <span>Next dose in <span className="font-semibold">{formatDistanceToNowStrict(nextDoseDate)}</span> ({format(nextDoseDate, 'MMM d')})</span>
            )}
          </div>
        </div>
      </div>
    );
  };

const DiseaseFrequencyChart = () => {
    const diseaseCounts = mockDiagnoses.reduce((acc, diagnosis) => {
        acc[diagnosis.disease] = (acc[diagnosis.disease] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(diseaseCounts).map(disease => ({
        name: disease,
        value: diseaseCounts[disease]
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3', '#5E4DCD', '#D048B6', '#E87A5D', '#4ECDC4', '#F9D423', '#FF6B6B', '#9370DB', '#00A896', '#F4A261', '#E76F51', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];

    return (
        <ChartContainer config={{}} className="mx-auto aspect-square h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend wrapperStyle={{fontSize: "12px", bottom: -10}}/>
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

const DiseaseHotspotMap = () => {
    const zoneDiagnoses = mockDiagnoses.reduce((acc, diagnosis) => {
      const zone = diagnosis.zone || 'Unknown';
      if (!acc[zone]) {
        acc[zone] = [];
      }
      acc[zone].push(diagnosis);
      return acc;
    }, {} as Record<string, MockDiagnosis[]>);
  
    const zones = Array.from({ length: 16 }, (_, i) => `Zone ${String.fromCharCode(65 + Math.floor(i/4))}${i%4 + 1}`);
  
    const getZoneColor = (count: number) => {
        if (count === 0) return 'bg-green-500/20 hover:bg-green-500/40';
        if (count <= 2) return 'bg-yellow-500/30 hover:bg-yellow-500/50';
        if (count <= 4) return 'bg-orange-500/40 hover:bg-orange-500/60';
        return 'bg-red-500/50 hover:bg-red-500/70';
    };

    const getZoneBorderColor = (count: number) => {
        if (count === 0) return 'border-green-500/30';
        if (count <= 2) return 'border-yellow-500/40';
        if (count <= 4) return 'border-orange-500/50';
        return 'border-red-500/60';
    }
  
    return (
        <TooltipProvider>
            <div className="grid grid-cols-4 grid-rows-4 gap-2 aspect-square max-w-[300px] mx-auto">
                {zones.map((zone) => {
                const diagnosesInZone = zoneDiagnoses[zone] || [];
                const count = diagnosesInZone.length;
                const topDisease = diagnosesInZone.length > 0 ? 
                    Object.entries(diagnosesInZone.reduce((acc, d) => {
                        acc[d.disease] = (acc[d.disease] || 0) + 1;
                        return acc;
                    }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0][0] 
                    : 'None';
        
                return (
                    <Tooltip key={zone}>
                    <TooltipTrigger asChild>
                        <div
                        className={cn(
                            'border-2 rounded-md flex items-center justify-center text-xs font-semibold text-white transition-colors cursor-pointer',
                            getZoneColor(count),
                            getZoneBorderColor(count)
                        )}
                        >
                        {zone}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">{zone}</p>
                        <p>Diagnoses: {count}</p>
                        {count > 0 && <p>Top Issue: {topDisease}</p>}
                    </TooltipContent>
                    </Tooltip>
                );
                })}
            </div>
      </TooltipProvider>
    );
};

const DailyFarmPerformanceGraph = () => {
    const chartConfig = {
        healthy: { label: '% Healthy', color: 'hsl(var(--chart-2))' },
    };

    return (
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ComposedChart data={mockDailyPerformance}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickFormatter={(val) => format(new Date(val), 'MMM d')} stroke="" />
                <YAxis domain={[80, 100]} tickFormatter={(val) => `${val}%`} stroke="" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                    <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Bar dataKey="healthy" fill="url(#colorHealthy)" />
            </ComposedChart>
        </ChartContainer>
    );
}

const AutoFertilizerEstimator = () => {
    const [area, setArea] = useState(5); // Default 5 acres
    const [cropType, setCropType] = useState('tomato'); // Default crop

    // N-P-K recommendation per acre for different crops (in kg)
    const recommendations = {
        tomato: { N: 60, P: 40, K: 40 },
        wheat: { N: 50, P: 25, K: 15 },
        rice: { N: 45, P: 25, K: 25 },
        potato: { N: 80, P: 50, K: 100 },
    };

    const estimate = recommendations[cropType as keyof typeof recommendations];
    const totalN = (estimate.N * area).toFixed(1);
    const totalP = (estimate.P * area).toFixed(1);
    const totalK = (estimate.K * area).toFixed(1);

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="area-slider">Farm Area: {area} acres</Label>
                <Slider
                    id="area-slider"
                    min={1}
                    max={50}
                    step={1}
                    value={[area]}
                    onValueChange={(value) => setArea(value[0])}
                    className="mt-2"
                />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium text-muted-foreground">Nitrogen (N)</p>
                    <p className="text-2xl font-bold text-primary">{totalN} kg</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium text-muted-foreground">Phosphorus (P)</p>
                    <p className="text-2xl font-bold text-accent">{totalP} kg</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                    <p className="text-sm font-medium text-muted-foreground">Potassium (K)</p>
                    <p className="text-2xl font-bold text-chart-2">{totalK} kg</p>
                </div>
            </div>
        </div>
    );
};

const SmartIrrigationTracker = () => {
    const chartConfig = {
      planned: { label: 'Planned', color: 'hsl(var(--chart-1))' },
      actual: { label: 'Actual', color: 'hsl(var(--chart-2))' },
    };
  
    return (
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ComposedChart data={mockIrrigationData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="day" tickFormatter={(val) => format(new Date(val), 'EEE')} stroke="" />
          <YAxis
            label={{
              value: 'Usage (liters)',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
            }}
            stroke=""
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="planned" fill="var(--color-planned)" radius={4} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="var(--color-actual)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ChartContainer>
    );
  };
  

export default function CropHealthTab() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  const [diagnosisHistory, setDiagnosisHistory] = useState<MockDiagnosis[]>([]);

  useEffect(() => {
    // Simulate fetching recent diagnoses
    setDiagnosisHistory(mockDiagnoses.slice(0, 5));

    const interval = setInterval(() => {
      // Simulate real-time updates by shuffling and slicing mock data
      const shuffled = [...mockDiagnoses].sort(() => 0.5 - Math.random());
      setDiagnosisHistory(shuffled.slice(0, 5));
    }, 7000); // Refresh every 7 seconds

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile || !imagePreview) {
      toast({
        variant: 'destructive',
        title: 'No Image Selected',
        description: 'Please upload an image of a crop to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    // Mock disease detection
    const mockDiseaseName = 'Leaf Curl';
    const mockSeverity = 'Moderate';
    const mockConfidence = 0.92;

    try {
      // Get AI-powered treatment suggestion
      const treatmentResponse = await getCropDiseaseTreatmentSuggestion({
        cropImage: imagePreview,
        diseaseName: mockDiseaseName,
      });

      setResult({
        diseaseName: mockDiseaseName,
        severity: mockSeverity,
        confidence: mockConfidence,
        treatment: treatmentResponse.treatmentSuggestion,
      });

      // Add to history (in a real app, this would be persisted)
      const newDiagnosis: MockDiagnosis = {
        id: `diag_${Date.now()}`,
        imageUrl: imagePreview,
        disease: mockDiseaseName,
        confidence: mockConfidence,
        timestamp: new Date().toISOString(),
        zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 4) + 1}`
      };
      setDiagnosisHistory(prev => [newDiagnosis, ...prev.slice(0, 4)]);

    } catch (error) {
      console.error('Error getting treatment suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not get a treatment suggestion from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cropPlaceholder = PlaceHolderImages.find((img) => img.id === 'crop-placeholder');

  return (
    <div className="flex flex-col gap-6">
      <div className="grid lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2"><Camera /> Crop Health Monitor</CardTitle>
            <CardDescription>Upload an image of your crop to detect diseases and get treatment suggestions.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed border-border rounded-lg">
                <div className="relative w-full max-w-[400px] aspect-video rounded-md overflow-hidden bg-muted">
                <Image
                    src={imagePreview || cropPlaceholder?.imageUrl || ''}
                    alt="Crop preview"
                    fill
                    className="object-contain"
                    data-ai-hint={cropPlaceholder?.imageHint}
                />
                </div>
                <div className="w-full max-w-xs grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button asChild variant="outline">
                    <label htmlFor="crop-image-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    </label>
                </Button>
                <Input id="crop-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                <Button onClick={handleAnalyze} disabled={isLoading || !imageFile}>
                    {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Analyze
                </Button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Analysis Result</h3>
                {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                ) : result ? (
                <Card className="bg-background/50">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="text-destructive" />
                        {result.diseaseName} Detected
                    </CardTitle>
                    <CardDescription>Confidence: {(result.confidence * 100).toFixed(0)}% | Severity: {result.severity}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Alert>
                        <Sparkles className="h-4 w-4 text-primary" />
                        <AlertTitle className="font-bold">AI Treatment Suggestion</AlertTitle>
                        <AlertDescription>{result.treatment}</AlertDescription>
                    </Alert>
                    </CardContent>
                </Card>
                ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground p-8 text-center border-2 border-dashed rounded-lg">
                    <p>Your analysis results will appear here.</p>
                </div>
                )}
            </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>💊 Treatment Timeline</CardTitle>
                <CardDescription>Recommended pesticide schedule and countdown to the next application.</CardDescription>
            </CardHeader>
            <CardContent>
            <ScrollArea className="h-96">
                {mockTreatments.map((treatment, index) => (
                    <TreatmentTimelineItem key={treatment.id} treatment={treatment} isLast={index === mockTreatments.length - 1} />
                ))}
            </ScrollArea>
            </CardContent>
        </Card>
      </div>
      
        <div className="grid lg:grid-cols-1 gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><History /> 📸 AI Crop Diagnosis Panel</CardTitle>
                <CardDescription>Last 5 uploaded images with YOLOv8 detection results and confidence levels.</CardDescription>
                </CardHeader>
                <CardContent>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-4 pb-4">
                    {diagnosisHistory.map((diag, index) => (
                        <Card key={diag.id + index} className="w-[250px] shrink-0 overflow-hidden">
                        <div className="relative h-32 w-full">
                            <Image
                                src={diag.imageUrl}
                                alt={`Diagnosis for ${diag.disease}`}
                                fill
                                className="object-cover"
                            />
                            <Badge variant="destructive" className="absolute top-2 right-2">{diag.disease}</Badge>
                        </div>
                        <CardContent className="p-3">
                            <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold">{diag.disease}</p>
                            <div className="flex items-center gap-2">
                                <div className="w-full bg-muted rounded-full h-2.5">
                                    <div 
                                    className={cn("h-2.5 rounded-full", getConfidenceColor(diag.confidence))}
                                    style={{ width: `${diag.confidence * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-mono text-muted-foreground">{ (diag.confidence * 100).toFixed(0) }%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{new Date(diag.timestamp).toLocaleString()}</p>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LineChart /> Daily Farm Performance</CardTitle>
                    <CardDescription>Percentage of healthy crops over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DailyFarmPerformanceGraph />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sliders /> Auto-Fertilizer Estimator</CardTitle>
                    <CardDescription>Estimate N-P-K needs based on your farm size for a Tomato crop.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AutoFertilizerEstimator />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Droplets /> Smart Irrigation Tracker</CardTitle>
                    <CardDescription>Dynamic chart comparing planned vs. actual water usage.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SmartIrrigationTracker />
                </CardContent>
            </Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PieChartIcon /> Disease Frequency Analysis</CardTitle>
                    <CardDescription>Distribution of detected diseases over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DiseaseFrequencyChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Map /> Disease Hotspot Map</CardTitle>
                    <CardDescription>Farm zones with the highest frequency of disease detection.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DiseaseHotspotMap />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    