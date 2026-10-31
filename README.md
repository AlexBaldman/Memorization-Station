# Memorization Station 🧠⚡

> *"Memory is the treasury and guardian of all things." — Cicero*

This is the unified **Voltron Edition** of **Memorization Station** — a mnemonic-first cognitive training compound and visual association engine with a distinctive "Mad Magazine × R. Crumb" underground comix aesthetic.

It brings together classical memory systems (PAO 00–99, Peg anchors, Playing Cards) with high-speed linguistic flashcards (Portuguese Edition), interactive percentile dice reflex training (`ROLL//99`), SM-2 spaced repetition, and generative AI visual anchors.

Built with **Next.js 15, TypeScript, Tailwind CSS, Zustand, Framer Motion, and Web Audio API**, with offline IndexedDB caching.

---

## ⚡ Station Modules (The Voltron Compound)

*   **🗂️ The Deck Drawer & Vault (`/`)**: Manage linguistic decks (Verbs, Cognates, Nouns, Survival) alongside the canonical **PAO 00–99 Matrix**, **Peg System (0–9)**, and **Playing Cards (52-Card System)**. Track SM-2 card mastery and review intervals.
*   **🎲 ROLL//99 Dice Station (`/roll`)**: Dual D10 percentile dice rolling machine with cryptographic randomness (`crypto.getRandomValues`), 3D SVG tumble physics, Web Audio tri-tone chime, multiple cyber finishes (*Afterburn, Phosphor, Goldrush, Ultraviolet, Comix Ink*), and instant active recall testing against the 100-character PAO palace.
*   **🎭 PAO Matrix (`/pao`)**: Interactive, filterable, and searchable visual compound for all 100 Person-Action-Object nodes (00–99) with real curated portrait anchors, test modes, and rapid-recall drills.
*   **⚡ Spaced Repetition Practice (`/practice`)**: SM-2 spaced repetition with three practice modes (Classic, Visual, Bridge), procedural audio SFX, interactive conjugation matrices, and action/object manifests.
*   **🎨 Card Creator Lab (`/create`)**: Craft custom cards and mnemonics with AI vision generation (Gemini, Pollinations Flux, Hugging Face, OpenAI).
*   **⚙️ Station Config (`/settings`)**: Configure audio FX, dark/light underground comix themes, and AI provider credentials.

## Setup & Development

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

## Data Management: Import & Export

You can export and import decks via the **Archival Management Console** within any deck view. The data is handled as high-fidelity JSON streams.

## Visual Archive Policy

The Station uses a **Guardian Migration** protocol. Every time the application schema is updated, your user-uploaded images and custom cards are prioritized and preserved in local storage. Core starter cards (like the **Tubarão** rowing shark) are hard-locked into the database with deterministic visual anchors to ensure the "Neural Link" never breaks.

## License

This project is open-source and intended for collaborative linguistic mastery.
