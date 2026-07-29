# **App Name**: Memorization Station: Portuguese Edition

## Core Features:

- Card Creation: Allows users to create flashcards with Portuguese words, English translations, pronunciations, mnemonic stories, and associated images. Generates image prompts and integrates with multiple image providers.
- Mnemonic Remix: Generates alternative mnemonic stories using a heuristic-based algorithm, offering users multiple options to aid memorization.
- Automated Image Prompt Generation: Automatically generate an image prompt for each flashcard, based on the user's mnemonic story and a default style preset. This acts as a tool for rapid image creation
- Deck Vault Management: Provides a dashboard to manage decks, view cards as thumbnails, and perform actions like edit, delete, duplicate, search, filter, export, and import.
- Gamified Practice Mode: Implements a spaced repetition system (SM-2-ish) for practice, including flashcard flip animations and response buttons to track learning progress.
- Image Provider Plugin System: Offers a pluggable system for multiple image generators, including a free default provider and a Qwen provider via a local proxy. The app uses the tool to determine the appropriate image to create.
- Offline Support and Caching: Provides offline functionality by caching generated images in IndexedDB and persisting flashcards/settings/stats in LocalStorage. Implements schema versioning and migrations.

## Style Guidelines:

- Primary color: Vibrant purple (#9400D3), reminiscent of comic book hues, for a bold and energetic feel.
- Background color: Dark, desaturated purple (#20112B), complementing the dark "Sketchbook" theme and accentuating other colors.
- Accent color: Bright yellow (#FFD700), inspired by classic comic book colors, for CTAs and interactive elements.
- Headline font: 'Belleza' (sans-serif), providing a fashionable and artistic look, ideal for titles and shorter content.
- Body font: 'Alegreya' (serif), used for more extended reading passages for an elegant, intellectual contemporary feel.
- Code font: 'Source Code Pro' (monospace), is the suggested typeface for displaying computer code
- Custom, hand-drawn icons with thick black borders and exaggerated features, mirroring the underground comix aesthetic.
- Off-kilter panels and thick black borders to mimic a comic book layout. Playful use of white space and irregular shapes for a dynamic visual experience.
- Flashcard flip animation with a comic-style transition, accompanied by sketchy "ink" shadows to enhance the depth and visual appeal.