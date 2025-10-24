
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, AlertCircle, Sparkles, History, Camera, SprayCan, Clock, PieChart as PieChartIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCropDiseaseTreatmentSuggestion } from '@/ai/flows/crop-disease-treatment-suggestion';
import { useToast } from '@/hooks/use-toast';
import { mockDiagnoses, type MockDiagnosis, mockTreatments, type MockTreatment } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { differenceInDays, format, formatDistanceToNowStrict } from 'date-fns';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

    return (
        <ChartContainer config={{}} className="mx-auto aspect-square h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
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
      
        <div className="grid lg:grid-cols-2 gap-6">
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PieChartIcon /> Disease Frequency Analysis</CardTitle>
                    <CardDescription>Distribution of detected diseases over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DiseaseFrequencyChart />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    