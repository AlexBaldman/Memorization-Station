'use server';

/**
 * @fileOverview A mnemonic remixer AI agent inspired by Anthony Metivier's Magnetic Memory Palace and Michel Thomas techniques.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MnemonicRemixInputSchema = z.object({
  mnemonic: z.string().describe('The current mnemonic story to remix.'),
  portuguese: z.string().optional(),
  english: z.string().optional(),
});
export type MnemonicRemixInput = z.infer<typeof MnemonicRemixInputSchema>;

const MnemonicRemixOutputSchema = z.object({
  remixedMnemonic: z.string().describe('The remixed, more memorable mnemonic story.'),
});
export type MnemonicRemixOutput = z.infer<typeof MnemonicRemixOutputSchema>;

export async function remixMnemonic(input: MnemonicRemixInput): Promise<MnemonicRemixOutput> {
  return remixMnemonicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mnemonicRemixPrompt',
  input: {schema: MnemonicRemixInputSchema},
  output: {schema: MnemonicRemixOutputSchema},
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are a world-class memory expert specialized in the "Magnetic Memory Palace" and "Michel Thomas" methods.

Given the following card details:
Word: {{{portuguese}}}
Translation: {{{english}}}
Original Mnemonic: {{{mnemonic}}}

Your task is to REGENERATE this mnemonic to be 10x more effective. 

Rules for your creative process:
1. **The Bridge**: Ensure the mnemonic uses an English word that SOUNDS like the Portuguese word to bridge to the meaning.
2. **The "Action"**: Use the Anthony Metivier approach: Make the story VIVID, ABSURD, and ACTION-ORIENTED. 
3. **The "Station"**: Imagine this happening in a specific, bizarre location (e.g., inside a giant toaster, on top of a flying shark).
4. **Michel Thomas Logic**: If it's a verb or a structural word, mention a logical reason *why* it's useful or how it relates to other words.
5. **Comix Style**: Use exaggerated, cross-hatched, satirical imagery in your description (R. Crumb style).

Remixed Mnemonic:`,
});

const remixMnemonicFlow = ai.defineFlow(
  {
    name: 'remixMnemonicFlow',
    inputSchema: MnemonicRemixInputSchema,
    outputSchema: MnemonicRemixOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to remix the mnemonic.');
    }
    return output;
  }
);
