# Memorization Station: Import & Export Guide

The Station supports high-fidelity data portability via JSON. This allows you to back up your neural archives, share decks with other learners, or import processed data from external linguistic sources.

## JSON Schema (v1)

Every exported deck follows this specific structure. To import an external file, ensure it matches this format:

```json
{
  "schemaVersion": 1,
  "deck": {
    "id": "unique-id-string",
    "name": "Portuguese Basics",
    "description": "Essential verbs and survival phrases.",
    "createdAt": 1672531200000,
    "theme": "primary"
  },
  "cards": [
    {
      "id": "card-101",
      "deckId": "unique-id-string",
      "portuguese": "falar",
      "english": "to speak",
      "mnemonic": "STATION: A radio station. A giant FALL-ER microphone is SPEAKING to the city.",
      "createdAt": 1672531200000,
      "repetitions": 0,
      "easiness": 2.5,
      "interval": 0,
      "nextReview": 1672531200000,
      "lastReviewed": null,
      "imageUrl": "https://example.com/vision.jpg",
      "pronunciation": "fa-lar"
    }
  ]
}
```

### Key Fields Explained:
*   **`schemaVersion`**: Currently `1`.
*   **`deck.id`**: Must be a unique string. Importing a deck with an existing ID will overwrite the local archive.
*   **`cards[].id`**: Unique identifier for the card.
*   **`cards[].nextReview`**: Timestamp in milliseconds. Set to current time for immediate sync availability.

---

## How to Import

1.  Navigate to the **Deck Drawer** (Home Screen).
2.  Click **Manage** on any existing deck, or create a new one.
3.  Inside the Management Console, click the **Import** button (upward arrow).
4.  Select your `.json` file. The neural link will automatically merge the data into your station.

## Exporting

1.  Inside the **Deck Manager**, click the **Export** button (downward arrow).
2.  The Station will generate a signed JSON stream and download it as a `.json` file.
