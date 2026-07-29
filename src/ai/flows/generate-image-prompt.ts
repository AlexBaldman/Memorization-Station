// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Automatically generates an image prompt for a flashcard based on the mnemonic story and a default style preset.
 * 
 * - generateImagePrompt - A function that generates an image prompt.
 * - GenerateImagePromptInput - The input type for the generateImagePrompt function.
 * - GenerateImagePromptOutput - The return type for the generateImagePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImagePromptInputSchema = z.object({
  mnemonicStory: z
    .string()
    .describe('The mnemonic story for the flashcard.'),
  stylePreset: z
    .string()
    .default(
      'Mad Magazine, R. Crumb style, cross-hatched, satirical, underground comix, exaggerated features, bold ink lines'
    )
    .describe(
      'The style preset to be appended to every image prompt by default.'
    ),
});

export type GenerateImagePromptInput = z.infer<typeof GenerateImagePromptInputSchema>;

const GenerateImagePromptOutputSchema = z.object({
  imagePrompt: z
    .string()
    .describe(
      'The generated image prompt based on the mnemonic story and style preset.'
    ),
});

export type GenerateImagePromptOutput = z.infer<typeof GenerateImagePromptOutputSchema>;

export async function generateImagePrompt(
  input: GenerateImagePromptInput
): Promise<GenerateImagePromptOutput> {
  return generateImagePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePromptPrompt',
  input: {schema: GenerateImagePromptInputSchema},
  output: {schema: GenerateImagePromptOutputSchema},
  prompt: `You are an image prompt generator. Your task is to create a detailed image prompt based on the given mnemonic story and style preset.

Mnemonic Story: {{{mnemonicStory}}}
Style Preset: {{{stylePreset}}}

Generated Image Prompt:` // Removed backticks here
});

const generateImagePromptFlow = ai.defineFlow(
  {
    name: 'generateImagePromptFlow',
    inputSchema: GenerateImagePromptInputSchema,
    outputSchema: GenerateImagePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
