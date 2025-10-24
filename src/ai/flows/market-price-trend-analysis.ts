'use server';
/**
 * @fileOverview Analyzes market price trends for crops, providing farmers with
 * insights on the best time and place to sell their produce.
 *
 * - analyzeMarketPriceTrend - A function that analyzes market price trends and returns a recommendation.
 * - MarketPriceTrendInput - The input type for the analyzeMarketPriceTrend function.
 * - MarketPriceTrendOutput - The return type for the analyzeMarketPriceTrend function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketPriceTrendInputSchema = z.object({
  crop: z.string().describe('The crop to analyze (e.g., Tomato, Wheat, Rice).'),
  location: z.string().describe('The location (mandi) to analyze (e.g., Pune, Lucknow, Nagpur).'),
  currentPrices: z.array(z.number()).describe('The current prices of the crop in the specified location for the past few days.'),
});
export type MarketPriceTrendInput = z.infer<typeof MarketPriceTrendInputSchema>;

const MarketPriceTrendOutputSchema = z.object({
  predictedPriceTrend: z.array(z.number()).describe('The predicted price trend for the next 7 days.'),
  bestSellDate: z.string().describe('The recommended date to sell the crop for the best profit.'),
  recommendedMandi: z.string().describe('The recommended mandi to sell the crop.'),
  analysis: z.string().describe('Summary of the market price trend analysis and recommendations.'),
});
export type MarketPriceTrendOutput = z.infer<typeof MarketPriceTrendOutputSchema>;

export async function analyzeMarketPriceTrend(input: MarketPriceTrendInput): Promise<MarketPriceTrendOutput> {
  return analyzeMarketPriceTrendFlow(input);
}

const analyzeMarketPriceTrendPrompt = ai.definePrompt({
  name: 'analyzeMarketPriceTrendPrompt',
  input: {schema: MarketPriceTrendInputSchema},
  output: {schema: MarketPriceTrendOutputSchema},
  prompt: `You are an AI assistant that provides market insights to farmers.

You will receive the crop, location, and current prices of a specific crop in that mandi. You will analyze this data and predict the price trend for the next 7 days. You will also determine the best date to sell the crop and the recommended mandi.

Crop: {{{crop}}}
Location: {{{location}}}
Current Prices: {{{currentPrices}}}

Based on this information, provide the predicted price trend, best sell date, recommended mandi, and a summary of your analysis and recommendations.

Follow the format of the MarketPriceTrendOutputSchema to correctly generate output. Make sure that the currentPrices value is reflected accurately in the predictedPriceTrend, which contains 7 values.
`,
});

const analyzeMarketPriceTrendFlow = ai.defineFlow(
  {
    name: 'analyzeMarketPriceTrendFlow',
    inputSchema: MarketPriceTrendInputSchema,
    outputSchema: MarketPriceTrendOutputSchema,
  },
  async input => {
    const {output} = await analyzeMarketPriceTrendPrompt(input);
    return output!;
  }
);
