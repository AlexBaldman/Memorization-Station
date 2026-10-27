import type { RecallEvent } from './review';

export const PAO_LEDGER_KEY = 'memorization-station:pao-roll99:v1';
export interface PaoLedger {
  version: 1;
  events: RecallEvent[];
}
const blank = (): PaoLedger => ({ version: 1, events: [] });
function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}
export function assertLedger(payload: unknown): PaoLedger {
  if (!isRecord(payload) || payload.version !== 1 || !Array.isArray(payload.events) ||
      payload.events.length > 100_000) throw new Error('Not a valid PAO v1 history');
  const ids = new Map<string, string>();
  const events: RecallEvent[] = [];
  for (const value of payload.events) {
    if (!isRecord(value) || typeof value.id !== 'string' || !value.id ||
        typeof value.sessionId !== 'string' || !value.sessionId ||
        typeof value.slotId !== 'string' || !/^\d{2}$/.test(value.slotId) ||
        Number(value.slotId) > 99 ||
        typeof value.bindingId !== 'string' || !value.bindingId ||
        (value.rollId !== null && typeof value.rollId !== 'string') ||
        ![1, 3, 5].includes(value.grade as number) ||
        typeof value.durationMs !== 'number' || !Number.isFinite(value.durationMs) || value.durationMs < 0 ||
        typeof value.occurredAt !== 'string' ||
        !Number.isFinite(Date.parse(value.occurredAt))) {
      throw new Error('History contains an invalid review event');
    }
    const event = value as unknown as RecallEvent;
    const normalized = JSON.stringify(event);
    if (ids.has(event.id)) {
      if (ids.get(event.id) !== normalized) throw new Error('Conflicting event IDs in history');
      continue;
    }
    ids.set(event.id, normalized);
    events.push(event);
  }
  return { version: 1, events };
}
export function readLedger(storage: Pick<Storage, 'getItem'>): PaoLedger {
  const json = storage.getItem(PAO_LEDGER_KEY);
  if (json === null) return blank();
  return assertLedger(JSON.parse(json));
}
export function writeLedger(storage: Pick<Storage, 'setItem'>, ledger: PaoLedger): void {
  const valid = assertLedger(ledger);
  storage.setItem(PAO_LEDGER_KEY, JSON.stringify(valid));
}
export function mergeLedger(current: PaoLedger, incoming: PaoLedger): PaoLedger {
  const existing = new Map(current.events.map(event => [event.id, JSON.stringify(event)]));
  const events = [...current.events];
  for (const event of incoming.events) {
    const serialized = JSON.stringify(event);
    const before = existing.get(event.id);
    if (before && before !== serialized) throw new Error(`History conflict for event ${event.id}`);
    if (!before) { existing.set(event.id, serialized); events.push(event); }
  }
  return assertLedger({ version: 1, events });
}
export function exportLedger(ledger: PaoLedger): string {
  return JSON.stringify(assertLedger(ledger), null, 2);
}
export function exportCsv(ledger: PaoLedger): string {
  const fields: (keyof RecallEvent)[] = [
    'id', 'sessionId', 'slotId', 'bindingId', 'rollId', 'grade', 'durationMs', 'occurredAt'
  ];
  const csvCell = (value: unknown): string => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [fields.join(','), ...ledger.events.map(event =>
    fields.map(field => csvCell(event[field])).join(','))].join('\r\n') + '\r\n';
}
