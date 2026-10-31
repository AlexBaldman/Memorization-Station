import type { Deck, Card, ConjugationMatrix, PaoData } from '../domain/types';
import paoDataJson from './pao-data.json';
import pegsDataJson from './pegs-data.json';
import playingCardsDataJson from './playing-cards-data.json';

export const PAO_DICTIONARY: Record<string, PaoData> = paoDataJson as Record<string, PaoData>;
export const PEGS_LIST = pegsDataJson as Array<{ number: number; name: string; emoji: string }>;
export const PLAYING_CARDS_DATA = playingCardsDataJson;

const stylePreset = 'Mad Magazine, R. Crumb style, cross-hatched, satirical, underground comix, exaggerated features, bold ink lines, vibrant saturated colors, dramatic lighting';

/**
 * Creates a deterministic Pollinations URL to ensure visions stay stable across sessions.
 */
const createAiUrl = (prompt: string, seed: number) => {
  const fullPrompt = `${prompt}, ${stylePreset}`;
  const encoded = encodeURIComponent(fullPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1536&seed=${seed}&nologo=true&model=flux`;
}

// --- CONJUGATION MATRICES (Michel Thomas Scaffolding) ---

const serConjugations: ConjugationMatrix = {
  present: { eu: 'sou', voce: 'é', nos: 'somos', eles: 'são' },
  past: { eu: 'fui', voce: 'foi', nos: 'fomos', eles: 'foram' },
  future: { eu: 'serei', voce: 'será', nos: 'seremos', eles: 'serão' }
};

const falarConjugations: ConjugationMatrix = {
  present: { eu: 'falo', voce: 'fala', nos: 'falamos', eles: 'falam' },
  past: { eu: 'falei', voce: 'falou', nos: 'falamos', eles: 'falaram' },
  future: { eu: 'falarei', voce: 'falará', nos: 'falaremos', eles: 'falarão' }
};

const comerConjugations: ConjugationMatrix = {
  present: { eu: 'como', voce: 'come', nos: 'comemos', eles: 'comem' },
  past: { eu: 'comi', voce: 'comeu', nos: 'comemos', eles: 'comeram' },
  future: { eu: 'comerei', voce: 'comerá', nos: 'comerão', eles: 'comerão' }
};

// --- CARD DATA DEFINITIONS ---

const verbsData = [
    { pt: 'ser', en: 'to be (permanent)', m: 'STATION: A giant statue of a SIR knight. He is PERMANENTLY a SIR.', conj: serConjugations, seed: 101 },
    { pt: 'falar', en: 'to speak', m: 'STATION: A radio station. A giant FALL-ER microphone is SPEAKING to the city.', conj: falarConjugations, seed: 102 },
    { pt: 'comer', en: 'to eat', m: 'STATION: A giant restaurant. A giant COMB is EATING all the noodles.', conj: comerConjugations, seed: 103 },
    { pt: 'estar', en: 'to be (temporary)', m: 'STATION: A movie set. A movie STAR is only a STAR while they are on STAGE.', seed: 104 },
    { pt: 'ter', en: 'to have', m: 'STATION: A jewelry store. You HAVE to wear a TIARA to HAVE respect.', seed: 105 },
    { pt: 'fazer', en: 'to do / make', m: 'STATION: A science lab. A PHASE-ER weapon MAKES things disappear.', seed: 106 },
    { pt: 'ir', en: 'to go', m: 'STATION: A giant maze. I use my huge EAR to hear exactly where TO GO.', seed: 107 },
    { pt: 'poder', en: 'to be able to', m: 'STATION: A gym. Imagine a giant PUDDING lifting heavy weights.', seed: 108 },
    { pt: 'saber', en: 'to know (info)', m: 'STATION: A library. A giant SABRE cuts through a book to find KNOWLEDGE.', seed: 109 },
    { pt: 'querer', en: 'to want', m: 'STATION: A toy store. A giant CARE-BEAR wants all the honey.', seed: 110 },
    { pt: 'precisar', en: 'to need', m: 'STATION: A hardware store. You need a PRECISE-ZAR tool to fix the sink.', seed: 111 },
    { pt: 'dar', en: 'to give', m: 'STATION: A birthday party. DAR-ling, please give me the DAR-t to pop the balloon.', seed: 112 },
];

const nounsData = [
  { pt: 'tubarão', en: 'shark', m: 'STATION: A cool shark wearing sunglasses in a red and yellow inner-tube is ROW-ING through a sunset.', p: 'cool shark wearing sunglasses in a red and yellow striped life ring inner-tube, rowing with wooden paddle, crashing waves, giant orange sun in background, dramatic sunset', seed: 999, customUrl: 'https://images.unsplash.com/photo-1690309575935-3a70fa5d797b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzaGFyayUyMHJvd2luZ3xlbnwwfHx8fDE3Njk4MzgwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { pt: 'café', en: 'coffee', m: 'STATION: A morning cafe. A giant cup of CAFE is waking up the whole city.', p: 'giant steaming cup of coffee with a face, waking up a sleeping city, early morning light', seed: 201 },
  { pt: 'carro', en: 'car', m: 'STATION: A race track. A giant CAR-rot is driving a sports car at high speed.', p: 'giant anthropomorphic carrot driving a red race car, motion blur, race track', seed: 202 },
  { pt: 'pão', en: 'bread', m: 'STATION: A bakery. A giant loaf of bread is rising out of a massive PAN.', p: 'massive loaf of bread growing out of a giant skillet frying pan, bakery background', seed: 203 },
  { pt: 'água', en: 'water', m: 'STATION: A giant waterfall. A huge AGUA-rium is falling from the sky.', p: 'giant aquarium tank full of fish falling through clouds like rain', seed: 204 },
  { pt: 'cerveja', en: 'beer', m: 'STATION: A pub. A giant SERVE-ER is balancing a mountain of beer mugs.', p: 'giant robot waiter balancing hundreds of beer mugs on its arms', seed: 205 },
  { pt: 'telefone', en: 'phone', m: 'STATION: An office. A giant T-REX is trying to answer a tiny phone.', p: 'giant t-rex dinosaur sitting at a tiny office desk, wearing glasses, holding a telephone', seed: 206 },
  { pt: 'mesa', en: 'table', m: 'STATION: A dining room. Imagine a giant MAZE on top of the table.', p: 'a dining table where the surface is a complex 3D maze with tiny people in it', seed: 207 },
  { pt: 'porta', en: 'door', m: 'STATION: A castle. A giant PORTER is holding open a massive stone door.', p: 'giant stone golem holding open a massive ornate castle door', seed: 208 },
  { pt: 'janela', en: 'window', m: 'STATION: A skyscraper. A giant JEAN-ELLA is cleaning the windows.', p: 'giant woman in blue jeans cleaning the windows of a skyscraper from the outside', seed: 209 },
];

const cognatesData = [
  { pt: 'importante', en: 'important', m: 'STATION: A vault. An IMPORT-ANT is carrying a giant diamond.', seed: 301 },
  { pt: 'possível', en: 'possible', m: 'STATION: A magic show. It is PAUSE-ABLE to make an elephant disappear.', seed: 302 },
  { pt: 'natural', en: 'natural', m: 'STATION: A national park. A giant NA-CHEW-RAL is chewing on a tree.', seed: 303 },
  { pt: 'especial', en: 'special', m: 'STATION: A party. A giant SPACE-SHELL is giving out special gifts.', seed: 304 },
  { pt: 'universal', en: 'universal', m: 'STATION: A planetarium. The UNIVERSE is inside a tiny BALL.', seed: 305 },
  { pt: 'geral', en: 'general', m: 'STATION: A military base. A giant CHAIR-ALL is where the general sits.', seed: 306 },
  { pt: 'social', en: 'social', m: 'STATION: A club. A giant SEW-SHELL is sewing clothes for everyone.', seed: 307 },
  { pt: 'central', en: 'central', m: 'STATION: A train station. A giant SENT-TROLL is directing the trains.', seed: 308 },
];

const survivalData = [
    { pt: 'ajuda', en: 'help', m: 'STATION: A lifeguard tower. A giant AH-JEW-DAH sign is flashing in the sky.', seed: 401 },
    { pt: 'hospital', en: 'hospital', m: 'STATION: A hospital. Imagine a giant HOST-PIT in the middle of the lobby.', seed: 402 },
    { pt: 'banheiro', en: 'bathroom', m: 'STATION: A spa. A giant BUNNY-HAIR-OH is waiting in the bathroom.', seed: 403 },
    { pt: 'polícia', en: 'police', m: 'STATION: A city street. A giant POLE-LEASE is holding a ticket.', seed: 404 },
    { pt: 'perigo', en: 'danger', m: 'STATION: A volcano. A giant PERRY-GO bird is flying away from danger.', seed: 405 },
];

// --- INITIAL COLLECTIONS ---

export const INITIAL_DECKS: Deck[] = [
  { 
    id: 'mt-1', 
    name: 'The Power Engine', 
    description: 'High-frequency verbs that let you start forming sentences immediately.', 
    createdAt: Date.now(), 
    theme: 'primary' 
  },
  { 
    id: 'mt-3', 
    name: 'The Cognate Hack', 
    description: 'Unlock 3,000+ words instantly using linguistic transformation rules.', 
    createdAt: Date.now(), 
    theme: 'success' 
  },
  { 
    id: 'mt-4', 
    name: 'Survival Matrix', 
    description: 'Essential vocabulary for emergency situations and survival.', 
    createdAt: Date.now(), 
    theme: 'destructive' 
  },
  {
    id: 'mt-6',
    name: 'Noun Network',
    description: 'Essential people, places, and things to populate your mental map.',
    createdAt: Date.now(),
    theme: 'primary'
  },
  {
    id: 'mt-pao',
    name: 'PAO 00–99 System',
    description: 'Person-Action-Object memory anchors for 00 to 99 with real portrait visual anchors.',
    createdAt: Date.now(),
    theme: 'secondary'
  },
  {
    id: 'mt-pegs',
    name: 'Peg System (0–9)',
    description: 'Foundational single-digit visual hooks (Donut, Pencil, Swan, Sailboat...).',
    createdAt: Date.now(),
    theme: 'accent'
  },
  {
    id: 'mt-cards',
    name: 'Playing Cards (52-Card System)',
    description: 'Deck of cards mnemonic stories, suits, and blackjack reference rules.',
    createdAt: Date.now(),
    theme: 'primary'
  }
];

const paoCards: Card[] = Object.entries(PAO_DICTIONARY).map(([num, p]) => ({
  id: `pao_${num}`,
  deckId: 'mt-pao',
  portuguese: `${num} · ${p.initials || num}`,
  english: p.name,
  mnemonic: `${p.action} [${p.object}] ${p.emoji || ''}`,
  imageUrl: p.imageUrl,
  pao: {
    number: num,
    initials: p.initials,
    name: p.name,
    action: p.action,
    object: p.object,
    emoji: p.emoji,
    emojiStory: p.emojiStory,
    imageUrl: p.imageUrl,
  },
  createdAt: Date.now(),
  repetitions: 0,
  easiness: 2.5,
  interval: 0,
  nextReview: Date.now(),
  lastReviewed: null,
}));

const pegCards: Card[] = PEGS_LIST.map((peg) => ({
  id: `peg_${peg.number}`,
  deckId: 'mt-pegs',
  portuguese: `Digit #${peg.number}`,
  english: `${peg.name} ${peg.emoji}`,
  mnemonic: `Visual anchor for #${peg.number}: ${peg.name} ${peg.emoji}`,
  imageUrl: createAiUrl(`giant anthropomorphic ${peg.name} representing digit ${peg.number}`, 5000 + peg.number),
  createdAt: Date.now(),
  repetitions: 0,
  easiness: 2.5,
  interval: 0,
  nextReview: Date.now(),
  lastReviewed: null,
}));

const cardList: Card[] = [];
const rawCards = PLAYING_CARDS_DATA as Record<string, any>;
for (const suit of Object.keys(rawCards)) {
  const suitCards = rawCards[suit];
  for (const rank of Object.keys(suitCards)) {
    const c = suitCards[rank];
    cardList.push({
      id: `card_${suit}_${rank}`,
      deckId: 'mt-cards',
      portuguese: `${c.rank} of ${c.suit.toUpperCase()} ${c.suitSymbol || ''}`,
      english: c.pao?.person || `${c.rank} of ${c.suit}`,
      mnemonic: `${c.pao?.action || ''} [${c.pao?.object || ''}] - ${c.pao?.story || ''}`,
      imageUrl: createAiUrl(`playing card ${c.rank} of ${c.suit} surreal fantasy artwork`, 6000 + cardList.length),
      createdAt: Date.now(),
      repetitions: 0,
      easiness: 2.5,
      interval: 0,
      nextReview: Date.now(),
      lastReviewed: null,
      metadata: {
        suit: c.suit,
        rank: c.rank,
        value: c.value,
        blackjack: c.blackjack
      }
    });
  }
}

export const INITIAL_CARDS: Card[] = [
    ...verbsData.map((v, i) => ({
        id: `verb_${i}`,
        deckId: 'mt-1',
        portuguese: v.pt,
        english: v.en,
        mnemonic: v.m,
        conjugations: v.conj,
        imageUrl: createAiUrl(v.m, v.seed || 1000 + i),
        createdAt: Date.now(),
        repetitions: 0,
        easiness: 2.5,
        interval: 0,
        nextReview: Date.now(),
        lastReviewed: null,
    })),
    ...nounsData.map((n, i) => ({
        id: `noun_${i}`,
        deckId: 'mt-6',
        portuguese: n.pt,
        english: n.en,
        mnemonic: n.m,
        imageUrl: n.customUrl || createAiUrl(n.p || n.m, n.seed || 2000 + i),
        createdAt: Date.now(),
        repetitions: 0,
        easiness: 2.5,
        interval: 0,
        nextReview: Date.now(),
        lastReviewed: null,
    })),
    ...cognatesData.map((c, i) => ({
        id: `cognate_${i}`,
        deckId: 'mt-3',
        portuguese: c.pt,
        english: c.en,
        mnemonic: c.m,
        imageUrl: createAiUrl(c.m, c.seed || 3000 + i),
        createdAt: Date.now(),
        repetitions: 0,
        easiness: 2.5,
        interval: 0,
        nextReview: Date.now(),
        lastReviewed: null,
    })),
    ...survivalData.map((s, i) => ({
        id: `survival_${i}`,
        deckId: 'mt-4',
        portuguese: s.pt,
        english: s.en,
        mnemonic: s.m,
        imageUrl: createAiUrl(s.m, s.seed || 4000 + i),
        createdAt: Date.now(),
        repetitions: 0,
        easiness: 2.5,
        interval: 0,
        nextReview: Date.now(),
        lastReviewed: null,
    })),
    ...paoCards,
    ...pegCards,
    ...cardList
];
