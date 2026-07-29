'use server';

/**
 * @fileOverview A linguistic assistant that provides bi-directional word lookup, translation, and mnemonic suggestions, including intelligent conjugation patterns.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TenseConjugationSchema = z.object({
  eu: z.string(),
  voce: z.string(),
  nos: z.string(),
  eles: z.string(),
});

const ConjugationMatrixSchema = z.object({
  present: TenseConjugationSchema,
  past: TenseConjugationSchema,
  future: TenseConjugationSchema,
});

const CardSuggestionsInputSchema = z.object({
  text: z.string().describe('The word or phrase to look up in Portuguese or English.'),
});
export type CardSuggestionsInput = z.infer<typeof CardSuggestionsInputSchema>;

const CardSuggestionsOutputSchema = z.object({
  portuguese: z.string().describe('The correct Portuguese spelling.'),
  english: z.string().describe('The accurate English translation.'),
  pronunciation: z.string().describe('Phonetic pronunciation guide.'),
  mnemonic: z.string().describe('A Michel Thomas/Memory Palace style mnemonic story.'),
  phrases: z.array(z.string()).describe('A few useful phrases incorporating the word.'),
  conjugations: ConjugationMatrixSchema.optional().describe('If the input is a verb, provide core conjugation patterns.'),
});
export type CardSuggestionsOutput = z.infer<typeof CardSuggestionsOutputSchema>;

export async function suggestCardContent(input: CardSuggestionsInput): Promise<CardSuggestionsOutput> {
  return suggestCardContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCardContentPrompt',
  input: {schema: CardSuggestionsInputSchema},
  output: {schema: CardSuggestionsOutputSchema},
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are a linguistic genius combining the teaching methods of Michel Thomas with the mnemonic techniques of a World Memory Champion.

A student is building a flashcard for Portuguese learning. They have provided the following input:

Input: "{{{text}}}"

Your tasks:
1. **Language Detection**: Determine if the input is Portuguese or English.
2. **Translation**: Provide the accurate translation.
3. **Correctness**: Ensure the Portuguese word is correctly spelled and accented.
4. **Phonetics**: Provide a clear, phonetic pronunciation guide for the Portuguese word.
5. **Mnemonic Creation**: 
    - Use the "Magnetic Memory Palace" approach: make it VIVID, ABSURD, and ACTION-ORIENTED.
    - Ground it in a specific "Station" (a location).
    - Ensure there is a strong "Phonetic Bridge".
6. **Verbal Scaffolding (Michel Thomas Style)**: 
    - IF the word is a VERB (like "ser", "comer", "falar"), you MUST provide the core conjugation patterns in the 'conjugations' field.
    - Focus on the high-frequency handles: Eu (I), Você/Ele/Ela (You/He/She), Nós (We), Eles/Elas/Vocês (They/You plural).
    - Provide these for Present, Past (Preterite), and Simple Future.

Output the result strictly in the requested JSON format.`,
});

const suggestCardContentFlow = ai.defineFlow(
  {
    name: 'suggestCardContentFlow',
    inputSchema: CardSuggestionsInputSchema,
    outputSchema: CardSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Neural link failed to materialize suggestions. Please try a different word or phrase.');
    }
    return output;
  }
);
