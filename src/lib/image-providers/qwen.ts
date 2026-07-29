import type { ImageProvider, GenerateImageParams, GenerateImageResult } from './types';

export const qwenProvider: ImageProvider = {
    id: 'qwen',
    name: 'Qwen (Wanx v1)',
    requiresKey: true,
    requiresProxy: true,
    
    validate: (settings: Record<string, any>) => {
        const errors = [];
        if (!settings.apiKey) errors.push('DashScope API Key is required.');
        return errors;
    },
    
    generateImage: async ({ prompt, stylePreset, size, apiKey, apiBaseUrl }: GenerateImageParams): Promise<GenerateImageResult> => {
        const baseUrl = apiBaseUrl || 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
        const fullPrompt = `${prompt}, ${stylePreset}`;

        // DashScope uses an asynchronous task-based flow for high-res images, 
        // but some proxies simplify this to a single wait-for-result call.
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'X-DashScope-Async': 'disable' // Try to get immediate result if supported by proxy/endpoint
            },
            body: JSON.stringify({
                model: "wanx-v1",
                input: { prompt: fullPrompt },
                parameters: { n: 1, size: `${size.width}*${size.height}` }
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Qwen generation failed.');
        }

        const data = await response.json();
        const imageUrl = data.output.results[0].url;

        const imageResponse = await fetch(imageUrl);
        const blob = await imageResponse.blob();
        const cacheKey = `qwen-${Date.now()}-${prompt.slice(0, 10)}`;

        return {
            imageUrl,
            blob,
            cacheKey,
            meta: { provider: 'qwen', model: 'wanx-v1' },
        };
    },
};
