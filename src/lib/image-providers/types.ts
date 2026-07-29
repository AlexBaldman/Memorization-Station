export interface GenerateImageParams {
  prompt: string;
  stylePreset: string;
  size: { width: number; height: number };
  seed?: number;
  apiKey?: string;
  apiBaseUrl?: string;
}

export interface GenerateImageResult {
  imageUrl?: string;
  blob?: Blob;
  cacheKey: string;
  meta: Record<string, any>;
}

export interface ImageProvider {
  id: string;
  name: string;
  requiresKey: boolean;
  requiresProxy: boolean;
  validate: (settings: Record<string, any>) => string[];
  generateImage: (params: GenerateImageParams) => Promise<GenerateImageResult>;
}
