'use client';

import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

export const huggingfaceProvider: ImageProvider = {
    id: 'huggingface',
    name: 'Hugging Face (SDXL)',
    requiresKey: true,
    requiresProxy: false,
    
    validate: (settings: Record<string, any>) => {
        const errors = [];
        if (!settings.apiKey) errors.push('Hugging Face API Token is required.');
        return errors;
    },
    
    generateImage: async ({ prompt, stylePreset, apiKey }: GenerateImageParams): Promise<GenerateImageResult> => {
        const fullPrompt = `${prompt}. Style: ${stylePreset}`;
        
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${apiKey}` },
                method: "POST",
                body: JSON.stringify({ inputs: fullPrompt }),
            }
        );

        if (!response.ok) {
            throw new Error('Hugging Face generation failed. Check your token or usage limits.');
        }

        const blob = await response.blob();
        const cacheKey = `hf-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            blob,
            cacheKey,
            meta: { provider: 'huggingface', model: 'sdxl-base-1.0' },
        };
    },
};
