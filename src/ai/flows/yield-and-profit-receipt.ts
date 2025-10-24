'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a digital receipt
 * summarizing predicted yield and profit for farmers, including crop details,
 * price forecasts, and buyer suggestions.
 *
 * - generateYieldAndProfitReceipt - An async function that takes
 *   YieldAndProfitInput as input and returns YieldAndProfitOutput.
 * - YieldAndProfitInput - The input type for the
 *   generateYieldAndProfitReceipt function.
 * - YieldAndProfitOutput - The return type for the
 *   generateYieldAndProfitReceipt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const YieldAndProfitInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  predictedYield: z.number().describe('The predicted yield in kg/acre.'),
  predictedPrice: z.number().describe('The predicted price per kg in ₹.'),
  bestSellDate: z.string().describe('The recommended date to sell the crop.'),
  recommendedMandi: z.string().describe('The recommended market (mandi) to sell the crop at.'),
});

export type YieldAndProfitInput = z.infer<typeof YieldAndProfitInputSchema>;

const YieldAndProfitOutputSchema = z.object({
  receipt: z
    .string()
    .describe(
      'A PDF receipt (base64 encoded) containing the yield and profit summary.'
    ),
});

export type YieldAndProfitOutput = z.infer<typeof YieldAndProfitOutputSchema>;

export async function generateYieldAndProfitReceipt(
  input: YieldAndProfitInput
): Promise<YieldAndProfitOutput> {
  return yieldAndProfitReceiptFlow(input);
}

const yieldAndProfitReceiptPrompt = ai.definePrompt({
  name: 'yieldAndProfitReceiptPrompt',
  input: {schema: YieldAndProfitInputSchema},
  output: {schema: YieldAndProfitOutputSchema},
  prompt: `You are an AI assistant that generates a PDF receipt summarizing the predicted yield and profit for a farmer.\n\n  Create a detailed PDF summary with the following information:\n  - Crop Name: {{{cropName}}}\n  - Predicted Yield: {{{predictedYield}}} kg/acre\n  - Predicted Price: ₹{{{predictedPrice}}} per kg\n  - Best Sell Date: {{{bestSellDate}}}\n  - Recommended Mandi: {{{recommendedMandi}}}\n\n  The PDF receipt should be base64 encoded. Return the base64 encoded PDF in the 'receipt' field.
\n  Make sure that you return a valid base64 encoded PDF. Do not include any additional information or commentary. Return ONLY the base64 string.
  Ensure that the PDF is well-formatted and easy to read. Include appropriate headers and labels for each data point.\n  `,
});

const yieldAndProfitReceiptFlow = ai.defineFlow(
  {
    name: 'yieldAndProfitReceiptFlow',
    inputSchema: YieldAndProfitInputSchema,
    outputSchema: YieldAndProfitOutputSchema,
  },
  async input => {
    // Call the prompt to generate the PDF receipt as a base64 string
    const {output} = await yieldAndProfitReceiptPrompt(input);
    return output!;
  }
);
