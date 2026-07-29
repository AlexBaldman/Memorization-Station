'use client';

import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';
import { generateNeuralImageAction } from '@/app/_actions/generation';

export const geminiServerProvider: ImageProvider = {
    id: 'gemini-server',
    name: 'Neural Link (Gemini 4.0)',
    requiresKey: false,
    requiresProxy: false,
    
    validate: () => [],
    
    generateImage: async ({ prompt, stylePreset }: GenerateImageParams): Promise<GenerateImageResult> => {
        const { dataUri, error } = await generateNeuralImageAction(prompt, stylePreset);

        if (error || !dataUri) {
            throw new Error(error || 'Failed to generate image via Internal Neural Link.');
        }

        const response = await fetch(dataUri);
        const blob = await response.blob();
        const cacheKey = `gemini-server-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            imageUrl: dataUri,
            blob,
            cacheKey,
            meta: { provider: 'gemini-server', model: 'imagen-4.0-fast' },
        };
    },
};
