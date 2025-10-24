'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a daily action plan for a farm.
 *
 * - `generateDailyActionPlan`: An async function that takes the current crop and weather to return an AI-generated hourly schedule.
 * - `DailyActionPlanInput`: The input type for the `generateDailyActionPlan` function.
 * - `DailyActionPlanOutput`: The return type for the `generateDailyActionPlan` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyActionPlanInputSchema = z.object({
  crop: z.string().describe('The primary crop being cultivated.'),
  weather: z.string().describe('The weather forecast for the day (e.g., "Sunny, 32°C").'),
});
export type DailyActionPlanInput = z.infer<typeof DailyActionPlanInputSchema>;

const ActionSchema = z.object({
    time: z.string().describe('The time for the action (e.g., "06:00").'),
    task: z.string().describe('The title of the task (e.g., "Field Inspection").'),
    description: z.string().describe('A brief description of the task.'),
});

const DailyActionPlanOutputSchema = z.object({
  plan: z.array(ActionSchema).describe('A list of actions for the daily plan.'),
});
export type DailyActionPlanOutput = z.infer<typeof DailyActionPlanOutputSchema>;

export async function generateDailyActionPlan(
  input: DailyActionPlanInput
): Promise<DailyActionPlanOutput> {
  return dailyActionPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyActionPlanPrompt',
  input: {schema: DailyActionPlanInputSchema},
  output: {schema: DailyActionPlanOutputSchema},
  prompt: `You are an expert farm manager. Create a simple, hourly action plan for a farmer for today.

    Crop: {{{crop}}}
    Weather: {{{weather}}}

    Generate 5-6 key actions from morning to evening, focusing on critical tasks like inspection, irrigation, treatment, and monitoring.
    `,
});

const dailyActionPlanFlow = ai.defineFlow(
  {
    name: 'dailyActionPlanFlow',
    inputSchema: DailyActionPlanInputSchema,
    outputSchema: DailyActionPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
