export interface TenseConjugation {
  eu: string;
  voce: string;
  nos: string;
  eles: string;
}

export interface ConjugationMatrix {
  present: TenseConjugation;
  past: TenseConjugation;
  future: TenseConjugation;
}

export interface PaoData {
  number: string;
  initials?: string;
  name: string;
  action: string;
  object: string;
  emoji?: string;
  emojiStory?: string;
  imageUrl?: string;
}

export interface Card {
  id: string;
  deckId: string;
  portuguese: string;
  english: string;
  pronunciation?: string;
  mnemonic: string;
  imageUrl?: string;
  imagePrompt?: string;
  imageKey?: string; // Key to find image in IndexedDB
  conjugations?: ConjugationMatrix;
  pao?: PaoData;
  metadata?: Record<string, any>;
  createdAt: number;
  
  // SM-2 algorithm fields
  repetitions: number;
  easiness: number;
  interval: number;
  nextReview: number;
  lastReviewed: number | null;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  theme?: 'primary' | 'secondary' | 'accent' | 'success' | 'destructive';
}

export type PracticeMode = 'classic' | 'visual' | 'bridge';

export interface AppSettings {
  v: number;
  theme: 'dark' | 'light';
  stylePreset: string;
  showPronunciation: boolean;
  imageProvider: string;
  defaultPracticeMode: PracticeMode;
  providerSettings: Record<string, any>;
}

export interface AppStats {
  v: number;
  totalReviews: number;
  correctCount: number;
  currentStreak: number;
  longestStreak: number;
}

export interface StoredState {
  v: number;
  decks: Deck[];
  cards: Card[];
}
