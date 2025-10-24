'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a list of farming best practices.
 *
 * - `getFarmingKnowledge`: An async function that returns AI-curated knowledge for a given crop.
 * - `FarmingKnowledgeInput`: The input type for the `getFarmingKnowledge` function.
 * - `FarmingKnowledgeOutput`: The return type for the `getFarmingKnowledge` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FarmingKnowledgeInputSchema = z.object({
  crop: z.string().describe('The crop for which to get best practices.'),
});
export type FarmingKnowledgeInput = z.infer<typeof FarmingKnowledgeInputSchema>;

const KnowledgeItemSchema = z.object({
    title: z.string().describe('The title of the best practice.'),
    tip: z.string().describe('A detailed tip or explanation.'),
});

const FarmingKnowledgeOutputSchema = z.object({
  knowledge: z.array(KnowledgeItemSchema).describe('A list of farming best practices.'),
});
export type FarmingKnowledgeOutput = z.infer<typeof FarmingKnowledgeOutputSchema>;

export async function getFarmingKnowledge(
  input: FarmingKnowledgeInput
): Promise<FarmingKnowledgeOutput> {
  return farmingKnowledgeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'farmingKnowledgePrompt',
  input: {schema: FarmingKnowledgeInputSchema},
  output: {schema: FarmingKnowledgeOutputSchema},
  prompt: `You are an agricultural expert. Provide a list of 5-7 concise, actionable best practices for cultivating the specified crop.

    Crop: {{{crop}}}
    `,
});

const farmingKnowledgeFlow = ai.defineFlow(
  {
    name: 'farmingKnowledgeFlow',
    inputSchema: FarmingKnowledgeInputSchema,
    outputSchema: FarmingKnowledgeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
