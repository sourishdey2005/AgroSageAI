'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Upload, AlertCircle, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCropDiseaseTreatmentSuggestion } from '@/ai/flows/crop-disease-treatment-suggestion';
import { useToast } from '@/hooks/use-toast';

type AnalysisResult = {
  diseaseName: string;
  severity: string;
  confidence: number;
  treatment: string;
};

export default function CropHealthTab() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

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
    <Card>
      <CardHeader>
        <CardTitle>Crop Health Monitor</CardTitle>
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
  );
}
