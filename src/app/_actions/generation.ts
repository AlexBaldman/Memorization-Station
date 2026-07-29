'use server';

import { generateImagePrompt } from '@/ai/flows/generate-image-prompt';
import { remixMnemonic } from '@/ai/flows/mnemonic-remix';
import { suggestCardContent } from '@/ai/flows/card-suggestions';
import { generateNeuralImage } from '@/ai/flows/generate-image';
import { z } from 'zod';

export async function getRemixedMnemonic(mnemonic: string, portuguese?: string, english?: string) {
    try {
        const result = await remixMnemonic({ mnemonic, portuguese, english });
        return { remixedMnemonic: result.remixedMnemonic, error: null };
    } catch (error) {
        console.error("[Generation Action] Error in remixMnemonic:", error);
        return { error: 'Failed to generate remix. Please try again.', remixedMnemonic: null };
    }
}

export async function getGeneratedImagePromptAction(mnemonic: string, stylePreset: string) {
    try {
        const result = await generateImagePrompt({ 
            mnemonicStory: mnemonic,
            stylePreset,
        });
        return { imagePrompt: result.imagePrompt, error: null };
    } catch (error) {
        console.error("[Generation Action] Error in getGeneratedImagePromptAction:", error);
        return { error: 'Failed to generate image prompt. Please try again.', imagePrompt: null };
    }
}

export async function getCardSuggestionsAction(text: string) {
    if (!text || text.length < 2) {
        return { error: 'Please enter at least 2 characters.', suggestions: null };
    }
    try {
        const result = await suggestCardContent({ text });
        return { suggestions: result, error: null };
    } catch (error) {
        console.error("[Generation Action] Error in getCardSuggestionsAction:", error);
        return { error: 'Failed to fetch suggestions. Please try again.', suggestions: null };
    }
}

export async function generateNeuralImageAction(prompt: string, stylePreset: string) {
    try {
        const result = await generateNeuralImage({ prompt, stylePreset });
        return { dataUri: result.dataUri, error: null };
    } catch (error) {
        console.error("[Generation Action] Error in generateNeuralImageAction:", error);
        return { error: 'The Neural Link (Gemini) is temporarily unstable. Try a different visual directive.', dataUri: null };
    }
}
