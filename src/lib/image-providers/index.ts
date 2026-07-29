import type { ImageProvider } from './types';
import { pollinationsProvider } from './pollinations';
import { openaiProvider } from './openai';
import { geminiProvider } from './gemini';
import { qwenProvider } from './qwen';
import { geminiServerProvider } from './gemini-server';
import { huggingfaceProvider } from './huggingface';
import { scavengerProvider } from './scavenger';

export const imageProviders: Record<string, ImageProvider> = {
  [geminiServerProvider.id]: geminiServerProvider,
  [pollinationsProvider.id]: pollinationsProvider,
  [scavengerProvider.id]: scavengerProvider,
  [huggingfaceProvider.id]: huggingfaceProvider,
  [openaiProvider.id]: openaiProvider,
  [geminiProvider.id]: geminiProvider,
  [qwenProvider.id]: qwenProvider,
};

export const defaultProviderId = geminiServerProvider.id;

export function getProvider(id: string): ImageProvider | undefined {
  return imageProviders[id];
}
