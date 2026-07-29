import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

export const openaiProvider: ImageProvider = {
    id: 'openai',
    name: 'OpenAI (DALL-E 3)',
    requiresKey: true,
    requiresProxy: true,
    
    validate: (settings: Record<string, any>) => {
        const errors = [];
        if (!settings.apiKey) errors.push('OpenAI API Key is required.');
        return errors;
    },
    
    generateImage: async ({ prompt, stylePreset, size, apiKey, apiBaseUrl }: GenerateImageParams): Promise<GenerateImageResult> => {
        const baseUrl = apiBaseUrl || 'https://api.openai.com/v1';
        const fullPrompt = `${prompt}. Style: ${stylePreset}`;

        const response = await fetch(`${baseUrl}/images/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: fullPrompt,
                n: 1,
                size: `${size.width}x${size.height}`,
                response_format: "url",
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'OpenAI generation failed.');
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        // Fetch image to store as blob for offline use
        const imageResponse = await fetch(imageUrl);
        const blob = await imageResponse.blob();
        const cacheKey = `openai-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            imageUrl,
            blob,
            cacheKey,
            meta: { provider: 'openai', model: 'dall-e-3' },
        };
    },
};
