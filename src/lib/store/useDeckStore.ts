import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Deck, Card, StoredState } from '@/lib/domain/types';
import { calculateNextReview } from '../domain/sm2';
import { useStatsStore } from './useStatsStore';
import { INITIAL_DECKS, INITIAL_CARDS } from '../data/initial-content';

interface DeckState {
  decks: Deck[];
  cards: Card[];
  getDeck: (id: string) => Deck | undefined;
  getCard: (id: string) => Card | undefined;
  getCardsInDeck: (deckId: string) => Card[];
  getDueCards: (deckId?: string) => Card[];
  addDeck: (deck: Omit<Deck, 'id' | 'createdAt'>) => Deck;
  deleteDeck: (deckId: string) => void;
  addCard: (card: Omit<Card, 'id' | 'createdAt' | 'repetitions' | 'easiness' | 'interval' | 'nextReview' | 'lastReviewed'>) => Card;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  updateCardImage: (cardId: string, imageKey: string) => void;
  recordPractice: (cardId: string, gotIt: boolean) => void;
  getDeckMastery: (deckId: string) => number;
  resetDeckProgress: (deckId: string) => void;
  exportDeck: (deckId: string) => string;
  importDeck: (json: string) => void;
}

const STORAGE_VERSION = 17;

export const useDeckStore = create<DeckState>()(
  persist(
    (set, get) => ({
      decks: INITIAL_DECKS,
      cards: INITIAL_CARDS,
      getDeck: (id) => get().decks.find((d) => d.id === id),
      getCard: (id) => get().cards.find((c) => c.id === id),
      getCardsInDeck: (deckId) => get().cards.filter((c) => c.deckId === deckId),
      getDueCards: (deckId) => {
        const now = Date.now();
        const allCards = get().cards;
        const filteredByDeck = deckId ? allCards.filter(c => c.deckId === deckId) : allCards;
        return filteredByDeck.filter(c => c.nextReview <= now || c.lastReviewed === null);
      },
      addDeck: (deckData) => {
        const newDeck: Deck = { ...deckData, id: `deck_${Date.now()}`, createdAt: Date.now() };
        set((state) => ({ decks: [...state.decks, newDeck] }));
        return newDeck;
      },
      deleteDeck: (deckId) => {
        set(state => ({ decks: state.decks.filter(d => d.id !== deckId), cards: state.cards.filter(c => c.deckId !== deckId) }));
      },
      addCard: (cardData) => {
        const newCard: Card = { ...cardData, id: `card_${Date.now()}`, createdAt: Date.now(), repetitions: 0, easiness: 2.5, interval: 0, nextReview: Date.now(), lastReviewed: null };
        set((state) => ({ cards: [...state.cards, newCard] }));
        return newCard;
      },
      updateCard: (updatedCard) => {
        set((state) => ({ cards: state.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)) }));
      },
      deleteCard: (cardId) => {
        set((state) => ({ cards: state.cards.filter((c) => c.id !== cardId) }));
      },
      updateCardImage: (cardId, imageKey) => {
        set(state => ({ cards: state.cards.map(c => c.id === cardId ? { ...c, imageKey } : c) }))
      },
      recordPractice: (cardId: string, gotIt: boolean) => {
        const card = get().cards.find(c => c.id === cardId);
        if (!card) return;
        const { repetitions, easiness, interval } = calculateNextReview(card, gotIt);
        const now = Date.now();
        const nextReview = now + (interval > 0 ? interval * 24 * 60 * 60 * 1000 : 0);
        const updatedCard: Card = { ...card, repetitions, easiness, interval, nextReview, lastReviewed: now };
        set(state => ({ cards: state.cards.map(c => c.id === cardId ? updatedCard : c) }));
        useStatsStore.getState().recordPractice(gotIt);
      },
      resetDeckProgress: (deckId: string) => {
        set(state => ({
          cards: state.cards.map(c => c.deckId === deckId ? {
            ...c,
            repetitions: 0,
            easiness: 2.5,
            interval: 0,
            nextReview: Date.now(),
            lastReviewed: null
          } : c)
        }));
      },
      getDeckMastery: (deckId: string) => {
        const cardsInDeck = get().getCardsInDeck(deckId);
        if (cardsInDeck.length === 0) return 0;
        const totalEasiness = cardsInDeck.reduce((sum, card) => sum + card.easiness, 0);
        const averageEasiness = totalEasiness / cardsInDeck.length;
        const minEasiness = 1.3;
        const maxEasiness = 3.0;
        const mastery = ((averageEasiness - minEasiness) / (maxEasiness - minEasiness)) * 100;
        return Math.max(0, Math.min(100, Math.round(mastery)));
      },
      exportDeck: (deckId) => {
        const deck = get().decks.find(d => d.id === deckId);
        const cards = get().cards.filter(c => c.deckId === deckId);
        if (!deck) throw new Error("Deck not found");
        return JSON.stringify({ schemaVersion: 1, deck, cards }, null, 2);
      },
      importDeck: (json) => {
        const data = JSON.parse(json);
        if (data.schemaVersion !== 1) throw new Error("Incompatible deck version.");
        set(state => ({
          decks: [...state.decks.filter(d => d.id !== data.deck.id), data.deck],
          cards: [...state.cards.filter(c => c.deckId !== data.deck.id), ...data.cards]
        }));
      }
    }),
    {
      name: 'memorization-station-storage-v17',
      storage: createJSONStorage(() => localStorage),
      version: STORAGE_VERSION,
      migrate: (persistedState: any, version: number) => {
        if (!persistedState || version < 17) {
          // Guardian Migration Protocol:
          // 1. Keep cards that are user-created (no initial prefixes)
          // 2. Keep initial cards if they have been reviewed or given a custom imageKey
          const existingCards = persistedState?.cards || [];
          const keptCards = existingCards.filter((c: Card) => {
            const isInitial = c.id.startsWith('verb_') || c.id.startsWith('noun_') || c.id.startsWith('cognate_') || c.id.startsWith('survival_');
            const isUserModified = !!c.imageKey || c.lastReviewed !== null || c.repetitions > 0;
            return !isInitial || isUserModified;
          });
          
          const keptIds = new Set(keptCards.map(c => c.id));
          const freshFactoryCards = INITIAL_CARDS.filter(c => !keptIds.has(c.id));

          return {
            decks: INITIAL_DECKS,
            cards: [...keptCards, ...freshFactoryCards],
          };
        }
        return persistedState;
      }
    }
  )
);
