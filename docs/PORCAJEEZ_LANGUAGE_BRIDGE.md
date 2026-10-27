# PORCAJEEEZ! — working name and domain boundary

**Status:** Exploratory product/engine name. Spelling is not locked. No separate language engine has been implemented by this PAO PR.

## Name ladder
- **Porcagese** — original pronunciation/pun; keep as creative origin.
- **PorcaJEEZ** — clean code/package and project namespace candidate (`porcajeez`).
- **PORCAJEEEZ!** — expressive comic-book onscreen wordmark.
- Alternate visual spelling to test later: `PorcaGeez!`. Avoid committing to a domain or trademark until checked.

## Architecture
PorcaJEEZ is proposed as the **reusable Brazilian-Portuguese learning capability**, consuming Memorization Station's memory/review contracts. It can supply phrases, conjugations, comprehension prompts, pronunciation feedback, contextual recall and transfer of learned phrases into real situations.

- **Memorization Station**: mnemonic entities, source-aware learning records, recall attempts, scheduling, progress, visual memory artifacts.
- **PorcaJEEZ**: Portuguese-learning domain and lesson/feedback adapters; reusable from a flashcard trainer or a game.
- **Brazillionaire**: comedic Brazil-language/culture adventure with dialogue, quests, scenarios, and player choices. It should consume the language capability without owning duplicate mnemonic progress.
- **Linguaverse**: donor content/scenarios and UI; mock grammar scoring and randomized API feedback must be replaced or labeled demo before authentic coaching.

## Future bridge contract (proposal)
```ts
interface PortugueseChallenge {
  id: string;
  phraseIds: string[];
  situationId?: string;
  prompt: string;
  skill: 'recall' | 'comprehension' | 'composition' | 'speaking';
}
interface PortugueseResponse {
  challengeId: string;
  answer: string;
  feedbackSource: 'rules' | 'model' | 'human';
  // Assessment should expose evidence and uncertainty, never random confidence.
}
```

Start with a small, tested phrase/feedback loop reused in both clients. Keep language logic independent of game progression and graphical theme. This is future work, not part of the PAO/ROLL//99 slice.
