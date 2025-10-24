
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a weekly farm performance summary.
 *
 * - `generateWeeklyReport`: An async function that takes performance metrics and returns an AI-generated narrative summary.
 * - `WeeklyReportInput`: The input type for the `generateWeeklyReport` function.
 * - `WeeklyReportOutput`: The return type for the `generateWeeklyReport` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeeklyReportInputSchema = z.object({
    currentWeekPerformance: z.number().describe('The overall farm performance change percentage for the current week.'),
    previousWeekPerformance: z.number().describe('The overall farm performance change percentage for the previous week.'),
    topPerformingCrop: z.string().describe('The name of the best performing crop.'),
    cropPerformance: z.number().describe('The performance increase percentage for the top crop.'),
});
export type WeeklyReportInput = z.infer<typeof WeeklyReportInputSchema>;


const WeeklyReportOutputSchema = z.object({
  summary: z.string().describe('A concise, narrative summary of the weekly farm performance.'),
});
export type WeeklyReportOutput = z.infer<typeof WeeklyReportOutputSchema>;


export async function generateWeeklyReport(
  input: WeeklyReportInput
): Promise<WeeklyReportOutput> {
  return weeklyReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weeklyReportPrompt',
  input: {schema: WeeklyReportInputSchema},
  output: {schema: WeeklyReportOutputSchema},
  prompt: `You are an agricultural analyst. Based on the provided data, generate a short, encouraging narrative summary (2-3 sentences) of the farm's performance for a weekly report.

    Current Week Performance Change: {{{currentWeekPerformance}}}%
    Previous Week Performance Change: {{{previousWeekPerformance}}}%
    Top Performing Crop: {{{topPerformingCrop}}} (up by {{{cropPerformance}}}%)

    Example format: "Your farm performed 15% better than last week. Keep up the great work! Your Tomato crop was the star performer, with a 25% increase in yield."
    `,
});

const weeklyReportFlow = ai.defineFlow(
  {
    name: 'weeklyReportFlow',
    inputSchema: WeeklyReportInputSchema,
    outputSchema: WeeklyReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
