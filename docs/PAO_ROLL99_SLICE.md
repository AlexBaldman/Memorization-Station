# PAO / ROLL//99 — integration decision (2026-10-27)

## Status
Implementing a self-contained PAO practice vertical slice in the Next.js `main` application. This is **not** a repo merger or a promotion of legacy person associations to shared canon. The older apps and their branches stay untouched.

## Source and provenance
- Original snapshot: [memorAIzation-stAItion/data/memory-people.json](https://github.com/AlexBaldman/memorAIzation-stAItion/blob/8b48d4c13ff1da0ed0d2374f429d89cc8c520ab2/data/memory-people.json)
- Imported to: `src/lib/memory/pao-legacy.json` (all 100 slots, 00–99).
- Source ID: `memorAIzation-stAItion:main:legacy-public-app:v1`
- Bound identity: `${sourceId}:${twoDigitNumber}`. The slot is an address, not a person identity.
- Imported associations remain status `candidate`. No mutable canonical roster, Notion source, or Animus promotion is assumed.
- Visual imagery is not downloaded or rehosted; the slice uses text and emoji provided in the source.

## Contracts
- `rollkit.ts`: crypto-backed rejection-sampled independent d10 digits, `00` to `99`, source-tagged roll event, leading zero retention.
- `roster.ts`: validates the complete snapshot and attaches stable source-specific binding IDs.
- `review.ts`: append-only recall events and deterministic SM-2 scheduling keyed by binding ID.
- `ledger.ts`: versioned local-only storage, merge-safe JSON import/export, CSV export, rejection of duplicate ID conflicts or malformed records.
- `/pao`: random percentile roll, due queue, reveal, three-level grading, progress and history.

## Manual acceptance checklist
1. Visit `/pao` using a secure browser context. Roll repeatedly; `00` and `09` must remain two digits.
2. Reveal each result, grade Again/Hard/Good, and verify the history counter increases once.
3. Refresh: event count, dates and due queue persist in the same browser.
4. Download JSON and CSV; import the same JSON twice. No duplicate event IDs or inflated history.
5. Import invalid JSON or conflicting event IDs; existing data must remain intact.
6. Simulate blocked/corrupt localStorage; the UI must prevent writes, not reset prior history.
7. Verify the preexisting Portuguese deck CRUD and /practice routes still work.

## Limits and next steps
- Storage is browser-local (not synced), and grading is self-reported.
- This is a second web consumer of the source RollKit *contract*, not a shared published package.
- Generic memory entities and a learner-choice registry require a later explicit migration; the Portuguese `Card` schema is left unchanged.
- E2E/browser testing, private/Notion roster import, Apple Watch/iOS and physical dice are not included.
- Production deployment/merge requires review and passing CI; no repositories are archived.
