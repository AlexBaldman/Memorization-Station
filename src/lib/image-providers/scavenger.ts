'use client';

import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

export const scavengerProvider: ImageProvider = {
    id: 'scavenger',
    name: 'Neural Scavenger (Photos)',
    requiresKey: false,
    requiresProxy: false,
    
    validate: () => [],
    
    generateImage: async ({ prompt }: GenerateImageParams): Promise<GenerateImageResult> => {
        // Use a deterministic seed from the prompt text
        const seed = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const imageUrl = `https://picsum.photos/seed/${seed}/512/512`;

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const cacheKey = `scavenger-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            imageUrl,
            blob,
            cacheKey,
            meta: { provider: 'scavenger', source: 'picsum' },
        };
    },
};
