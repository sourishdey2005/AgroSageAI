
'use server';

/**
 * @fileOverview This flow simulates a negotiation between a farmer's agent and a buyer.
 *
 * - simulateNegotiation - A function that takes an agent's offer and returns a simulated buyer response.
 * - NegotiationInput - The input type for the simulateNegotiation function.
 * - NegotiationOutput - The return type for the simulateNegotiation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiationInputSchema = z.object({
  agentOffer: z.string().describe("The agent's offer or message to the buyer."),
  conversationHistory: z.array(z.string()).describe("The history of the conversation so far."),
});
export type NegotiationInput = z.infer<typeof NegotiationInputSchema>;

const NegotiationOutputSchema = z.object({
  buyerResponse: z.string().describe("The AI-simulated response from the buyer."),
  dealConfidence: z.number().min(0).max(1).describe("A confidence score (0-1) on whether a deal is likely."),
});
export type NegotiationOutput = z.infer<typeof NegotiationOutputSchema>;

export async function simulateNegotiation(input: NegotiationInput): Promise<NegotiationOutput> {
  return negotiationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiationPrompt',
  input: {schema: NegotiationInputSchema},
  output: {schema: NegotiationOutputSchema},
  prompt: `You are a tough but fair buyer at a major agricultural market (mandi). You are negotiating with an agent representing a farmer. Your goal is to get the best price for good quality produce, but you are willing to make a deal if the offer is reasonable.

Analyze the conversation history and the agent's latest offer. Respond with a counter-offer, a question about quality, or an acceptance. Be concise and professional. Also, provide a confidence score on the likelihood of a deal being reached.

Conversation History:
{{#each conversationHistory}}
- {{{this}}}
{{/each}}

Agent's latest message: {{{agentOffer}}}

Your response should be from the buyer's perspective.
`,
});

const negotiationFlow = ai.defineFlow(
  {
    name: 'negotiationFlow',
    inputSchema: NegotiationInputSchema,
    outputSchema: NegotiationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
