import type { Card } from './types';

const MIN_EASINESS = 1.3;

interface PracticeResult {
  repetitions: number;
  easiness: number;
  interval: number;
}

/**
 * Calculates the next review schedule for a card using an SM-2-like algorithm.
 * @param card The card that was reviewed.
 * @param quality The quality of the response (0-5 scale, but here we use a simplified boolean). 5 is a perfect response.
 * @returns The updated SM-2 properties for the card.
 */
export function calculateNextReview(card: Card, gotIt: boolean): PracticeResult {
  const quality = gotIt ? 5 : 2; // Map boolean to a quality score

  let { repetitions, easiness, interval } = card;

  if (quality < 3) {
    // Wrong answer, reset repetitions and interval
    repetitions = 0;
    interval = 1;
  } else {
    // Correct answer
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.ceil(interval * easiness);
    }
  }

  easiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (easiness < MIN_EASINESS) {
    easiness = MIN_EASINESS;
  }
  
  return { repetitions, easiness, interval };
}
