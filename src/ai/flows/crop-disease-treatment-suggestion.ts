'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating crop disease treatment suggestions based on an uploaded image and detected disease.
 *
 * - `getCropDiseaseTreatmentSuggestion`: A function that takes an image of a crop and returns an AI-generated suggestion for treating any detected diseases.
 * - `CropDiseaseTreatmentSuggestionInput`: The input type for the `getCropDiseaseTreatmentSuggestion` function.
 * - `CropDiseaseTreatmentSuggestionOutput`: The return type for the `getCropDiseaseTreatmentSuggestion` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropDiseaseTreatmentSuggestionInputSchema = z.object({
  cropImage: z
    .string()
    .describe(
      'A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  diseaseName: z.string().describe('The name of the detected disease.'),
});
export type CropDiseaseTreatmentSuggestionInput = z.infer<
  typeof CropDiseaseTreatmentSuggestionInputSchema
>;

const CropDiseaseTreatmentSuggestionOutputSchema = z.object({
  treatmentSuggestion: z
    .string()
    .describe('An AI-generated suggestion for treating the detected disease.'),
});
export type CropDiseaseTreatmentSuggestionOutput = z.infer<
  typeof CropDiseaseTreatmentSuggestionOutputSchema
>;

export async function getCropDiseaseTreatmentSuggestion(
  input: CropDiseaseTreatmentSuggestionInput
): Promise<CropDiseaseTreatmentSuggestionOutput> {
  return cropDiseaseTreatmentSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropDiseaseTreatmentSuggestionPrompt',
  input: {schema: CropDiseaseTreatmentSuggestionInputSchema},
  output: {schema: CropDiseaseTreatmentSuggestionOutputSchema},
  prompt: `You are an expert in providing treatment suggestions for crop diseases.

  Based on the detected disease, provide a concise and practical treatment suggestion for the farmer.

  Disease Name: {{{diseaseName}}}
  Crop Image: {{media url=cropImage}}
  `,
});

const cropDiseaseTreatmentSuggestionFlow = ai.defineFlow(
  {
    name: 'cropDiseaseTreatmentSuggestionFlow',
    inputSchema: CropDiseaseTreatmentSuggestionInputSchema,
    outputSchema: CropDiseaseTreatmentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
