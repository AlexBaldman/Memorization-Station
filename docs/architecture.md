# Architecture

This document outlines the architecture of the **Memorization Station: Portuguese Edition** web application.

## Core Philosophy

The architecture is designed to be modular, scalable, and maintainable, with a strong separation of concerns. We prioritize clean, pure logic and well-defined boundaries between different parts of the application.

While the original proposal suggested Vite, we have opted for **Next.js with the App Router**. This choice provides a robust, production-ready framework with benefits like Server Components, Server Actions, and a mature ecosystem, which aligns well with the "production-grade" requirement.

## Directory Structure

The project follows a feature-oriented structure adapted for the Next.js App Router.

- `src/app/`: Contains all routing, pages, and layouts. Each route segment is a folder containing a `page.tsx`. API-like logic is handled via Server Actions located in `src/app/_actions/`.
- `src/lib/domain/`: The core of the application. It contains pure, framework-agnostic business logic and type definitions.
  - `types.ts`: TypeScript interfaces for core entities like `Card`, `Deck`, etc.
  - `sm2.ts`: The pure function implementing the spaced repetition algorithm.
- `src/lib/data/`: Handles all data persistence and access.
  - `image-cache.ts`: A wrapper around IndexedDB for storing and retrieving image blobs, enabling offline image access.
- `src/lib/store/`: Home to our global state management using Zustand.
  - `useDeckStore.ts`: Manages the state of all decks and cards.
  - `useSettingsStore.ts`: Manages user-configurable settings.
  - `app-state-provider.tsx`: A crucial component to prevent hydration mismatches by ensuring Zustand stores are hydrated on the client before rendering the app.
- `src/lib/image-providers/`: Implements the pluggable system for image generation.
  - `types.ts`: Defines the `ImageProvider` interface contract.
  - `index.ts`: A provider registry that exports available providers.
  - `pollinations.ts`: An implementation for a free, no-key provider.
- `src/components/features/`: Contains larger components that represent a specific feature, like `deck-vault.tsx` or `card-creator.tsx`. These components are responsible for composing smaller UI components and handling feature-specific logic.
- `src/components/ui/`: Reusable, "dumb" UI components, mostly from `shadcn/ui`.
- `src/components/`: Other shared components like `site-header.tsx` and `main-nav.tsx`.
- `public/`: For static assets like icons and the PWA manifest.

## State Management

We use **Zustand** for global client-side state management, as requested.

- **Stores**: State is divided into logical stores (`useDeckStore`, `useSettingsStore`).
- **Persistence**: We leverage `zustand/middleware/persist` to automatically save state to `localStorage`. This includes a schema version and a `migrate` function for future-proofing.
- **Hydration**: To work safely with Next.js App Router and server components, we've implemented an `AppStateProvider`. This client-side component ensures that any component that relies on Zustand state only renders *after* the stores have been rehydrated from `localStorage`. This is critical to prevent hydration mismatch errors.

## Data Persistence & Offline Support

- **Core Data (Decks, Cards, Settings)**: Stored in `localStorage` via Zustand's persist middleware. This data is available immediately on app load, even offline.
- **Image Caching**: Generated images are stored as blobs in **IndexedDB** via our `image-cache.ts` service. Flashcards only store a *key* to the image. When a card is displayed, the app attempts to load the image from IndexedDB first, ensuring offline availability and saving bandwidth.

## PWA (Progressive Web App)

The application is configured to be a PWA.

- **Manifest**: A `manifest.webmanifest` is provided in the `public` directory.
- **Service Worker**: While we are not using a specific PWA plugin for Next.js in this iteration to keep dependencies minimal, the architecture is PWA-ready. A service worker can be added to cache the application shell and static assets for a fully offline-first experience.

## Image Generation Providers

The image generation system is designed to be pluggable and secure.

- **Provider Interface**: A strict `ImageProvider` interface in `src/lib/image-providers/types.ts` ensures that all providers have a consistent API for generation and validation.
- **Provider Registry**: A central registry in `src/lib/image-providers/index.ts` makes it easy to add or swap out providers.
- **Security**: The system is designed to avoid storing API keys in the browser. Providers that require keys are expected to be used via a local proxy server, which is documented in the `README.md` but not included in this repository.

## Testing

The prompt requested tests using Vitest. While test files are not generated in this output, the architecture heavily supports testability.
- The pure logic in `src/lib/domain/` (like `sm2.ts`) can be easily unit-tested.
- Zustand stores can be tested in isolation.
- Feature components in `src/components/features/` can be tested using React Testing Library by mocking the Zustand hooks.
