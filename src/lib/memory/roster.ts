/**
 * Source-aware roster snapshot adapter. A public donor roster is a candidate
 * association, never an automatic promotion to shared uINVERSE/Animus canon.
 */
export interface LegacyPaoEntry {
  number?: string;
  initials?: string;
  name: string;
  action: string;
  object: string;
  emoji?: string;
  emojiStory?: string;
  imageUrl?: string;
}
export interface PaoBinding {
  id: string;
  sourceId: string;
  number: string;
  initials: string;
  person: string;
  action: string;
  object: string;
  emoji?: string;
  emojiStory?: string;
  status: 'candidate';
}
export const PAO_NUMBERS: readonly string[] = Object.freeze(
  Array.from({ length: 100 }, (_, n) => String(n).padStart(2, '0'))
);
export const LEGACY_PAO_SOURCE = 'memorAIzation-stAItion:main:legacy-public-app:v1';

export function normalizeRoster(
  raw: Record<string, LegacyPaoEntry>,
  sourceId: string = LEGACY_PAO_SOURCE
): readonly PaoBinding[] {
  if (!/^[\w.:\-]+$/.test(sourceId)) throw new Error('Invalid roster source identifier');
  if (Object.keys(raw).length !== 100) throw new Error('PAO roster must contain exactly 100 entries');
  return Object.freeze(PAO_NUMBERS.map(number => {
    const item = raw[number];
    if (!item || (item.number !== undefined && String(item.number).padStart(2, '0') !== number)) {
      throw new Error(`Invalid or missing PAO entry ${number}`);
    }
    if (![item.name, item.action, item.object].every(value => typeof value === 'string' && value.trim())) {
      throw new Error(`Incomplete PAO association ${number}`);
    }
    return Object.freeze({
      id: `${sourceId}:${number}`, sourceId, number,
      initials: String(item.initials ?? '').trim(),
      person: item.name.trim(),
      action: item.action.trim(),
      object: item.object.trim(),
      emoji: item.emoji,
      emojiStory: item.emojiStory,
      status: 'candidate' as const,
    });
  }));
}
