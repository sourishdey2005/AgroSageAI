'use server';

/**
 * @fileOverview This flow answers questions about crop treatment, prices, and other agricultural topics.
 *
 * - answerCropQuestion - A function that handles answering crop-related questions.
 * - AnswerCropQuestionInput - The input type for the answerCropQuestion function.
 * - AnswerCropQuestionOutput - The return type for the answerCropQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerCropQuestionInputSchema = z.object({
  question: z.string().describe('The question about crops or agriculture.'),
});
export type AnswerCropQuestionInput = z.infer<typeof AnswerCropQuestionInputSchema>;

const AnswerCropQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerCropQuestionOutput = z.infer<typeof AnswerCropQuestionOutputSchema>;

export async function answerCropQuestion(input: AnswerCropQuestionInput): Promise<AnswerCropQuestionOutput> {
  return answerCropQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCropQuestionPrompt',
  input: {schema: AnswerCropQuestionInputSchema},
  output: {schema: AnswerCropQuestionOutputSchema},
  prompt: `You are an AI agricultural assistant. Answer the following question about crops, agriculture, or farming to the best of your ability.\n\nQuestion: {{{question}}}`,
});

const answerCropQuestionFlow = ai.defineFlow(
  {
    name: 'answerCropQuestionFlow',
    inputSchema: AnswerCropQuestionInputSchema,
    outputSchema: AnswerCropQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
