import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

export const geminiProvider: ImageProvider = {
    id: 'gemini',
    name: 'Gemini (Imagen 3)',
    requiresKey: true,
    requiresProxy: true,
    
    validate: (settings: Record<string, any>) => {
        const errors = [];
        if (!settings.apiKey) errors.push('Google AI API Key is required.');
        return errors;
    },
    
    generateImage: async ({ prompt, stylePreset, size, apiKey, apiBaseUrl }: GenerateImageParams): Promise<GenerateImageResult> => {
        // Note: Imagen API structure varies by endpoint (Vertex vs AI Studio)
        // This implementation targets a generic proxy structure or standard Google AI Studio if available
        const baseUrl = apiBaseUrl || 'https://generativelanguage.googleapis.com/v1beta';
        const fullPrompt = `${prompt}. ${stylePreset}`;

        const response = await fetch(`${baseUrl}/models/imagen-3:predict?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                instances: [{ prompt: fullPrompt }],
                parameters: {
                    sampleCount: 1,
                    aspectRatio: "1:1",
                },
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Gemini Imagen generation failed.');
        }

        const data = await response.json();
        // Google Imagen returns base64 in many configurations
        const base64Image = data.predictions[0].bytesBase64Encoded;
        const blob = await (await fetch(`data:image/png;base64,${base64Image}`)).blob();
        const cacheKey = `gemini-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            blob,
            cacheKey,
            meta: { provider: 'gemini', model: 'imagen-3' },
        };
    },
};
