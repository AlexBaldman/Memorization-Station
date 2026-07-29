'use server';

/**
 * @fileOverview A high-performance image generation flow using Google's Imagen 4 model.
 * 
 * - generateNeuralImage - A function that generates an image from a prompt.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The visual prompt for the image.'),
  stylePreset: z.string().describe('The artistic style to apply.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  dataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateNeuralImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateNeuralImageFlow(input);
}

const generateNeuralImageFlow = ai.defineFlow(
  {
    name: 'generateNeuralImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const fullPrompt = `${input.prompt}. Style: ${input.stylePreset}`;
    
    // Using the latest Imagen 4 model as per guidelines
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: fullPrompt,
    });

    if (!media || !media.url) {
      throw new Error('The Neural Link failed to manifest a vision. Please try adjusting the prompt.');
    }

    return {
      dataUri: media.url,
    };
  }
);
