# Memorization Station: Portuguese Edition

This is a production-grade, mnemonic-first Portuguese flashcard and visual association app with a distinctive "Mad Magazine × R. Crumb" underground comix aesthetic.

It's built with Next.js, TypeScript, Tailwind CSS, and Zustand for state management. It features offline support via IndexedDB for image caching and a PWA setup.

## 🚀 Collaborative Development & GitHub Integration

You can easily push this project to your own GitHub repository to work collaboratively with other humans, AI agents, and automated tools.

### 1. Initialize Git & Push to GitHub
If you are working locally after exporting from Firebase Studio:
```bash
git init
git add .
git commit -m "Initialize Memorization Station"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Collaborative Features
- **Agentic Workflows**: Other AI agents can read the `docs/architecture.md` and `docs/backend.json` to understand the system architecture and data structures.
- **CI/CD**: Integrate with GitHub Actions for automated deployment to Firebase App Hosting or Vercel.
- **Issue Tracking**: Use GitHub Issues to manage the "Idea Bank" and roadmap tasks.

## Core Features

*   **Card Creator**: Craft flashcards with mnemonics and AI-generated imagery.
*   **Deck Vault**: Manage your decks, view cards, and track progress.
*   **Gamified Practice**: Reinforce your learning with a spaced-repetition-based practice mode.
*   **Offline First**: Access your cards and cached images even without an internet connection.
*   **Pluggable Image Providers**: Support for Neural Link (Gemini), Pollinations, Hugging Face (Flux/SDXL), and OpenAI.

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
