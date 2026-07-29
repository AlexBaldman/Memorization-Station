import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

async function fetchImageAsBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return response.blob();
}

export const pollinationsProvider: ImageProvider = {
    id: 'pollinations',
    name: 'Pollinations (Free)',
    requiresKey: false,
    requiresProxy: false,
    
    validate: (settings: Record<string, any>) => {
        return []; // No settings to validate
    },
    
    generateImage: async ({ prompt, stylePreset, size, seed }: GenerateImageParams): Promise<GenerateImageResult> => {
        const fullPrompt = `${prompt}, ${stylePreset}`;
        const encodedPrompt = encodeURIComponent(fullPrompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${size.width}&height=${size.height}${seed ? `&seed=${seed}` : ''}`;
        
        try {
            // We fetch the image and return the blob so it can be cached in IndexedDB
            const blob = await fetchImageAsBlob(imageUrl);
            const cacheKey = `pollinations-${seed || Date.now()}-${encodedPrompt.slice(0, 20)}`;

            return {
                imageUrl, // We can still pass this for immediate display if needed
                blob,
                cacheKey,
                meta: { provider: 'pollinations', originalUrl: imageUrl },
            };
        } catch (error) {
            console.error("Pollinations provider error:", error);
            throw new Error("Failed to generate image with Pollinations. The service may be temporarily down.");
        }
    },
};
