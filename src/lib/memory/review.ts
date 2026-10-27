/**
 * Append-only recall attempts and derivable SM-2 schedules.
 * Schedule identity follows the binding, not the mutable screen/card.
 */
export type RecallGrade = 1 | 3 | 5;
export interface RecallEvent {
  id: string;
  sessionId: string;
  slotId: string;      // two digits, always
  bindingId: string;   // source-specific, stable identity
  rollId: string | null;
  grade: RecallGrade;
  durationMs: number;
  occurredAt: string;
}
export interface ReviewSchedule {
  repetitions: number;
  easiness: number;
  interval: number;
  dueDate: string;
}
export function scheduleSm2(
  previous: ReviewSchedule | undefined,
  grade: RecallGrade,
  now: Date
): ReviewSchedule {
  if (![1, 3, 5].includes(grade) || !Number.isFinite(now.getTime())) {
    throw new RangeError('Invalid grade or date');
  }
  const repetitions = grade < 3 ? 0 : (previous?.repetitions ?? 0) + 1;
  const easiness = Math.max(1.3, (previous?.easiness ?? 2.5) +
    0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  const interval = grade < 3 ? 1 : repetitions === 1 ? 1 : repetitions === 2 ? 6 :
    Math.max(1, Math.ceil((previous?.interval ?? 1) * easiness));
  return { repetitions, easiness, interval,
    dueDate: new Date(now.getTime() + interval * 86_400_000).toISOString() };
}
export function deriveSchedules(events: readonly RecallEvent[]): Record<string, ReviewSchedule> {
  const schedules: Record<string, ReviewSchedule> = Object.create(null);
  const sorted = [...events].sort((a, b) =>
    a.occurredAt.localeCompare(b.occurredAt) || a.id.localeCompare(b.id));
  for (const event of sorted) {
    schedules[event.bindingId] = scheduleSm2(
      schedules[event.bindingId], event.grade, new Date(event.occurredAt)
    );
  }
  return schedules;
}
export function makeRecallEvent(input: {
  slotId: string; bindingId: string; sessionId: string; rollId?: string | null;
  grade: RecallGrade; startedAt: number; now?: Date; id?: string;
}): RecallEvent {
  const now = input.now ?? new Date();
  if (!/^\d{2}$/.test(input.slotId) || Number(input.slotId) > 99 ||
      !input.bindingId || !input.sessionId || !Number.isFinite(input.startedAt) ||
      !Number.isFinite(now.getTime())) throw new Error('Invalid recall event fields');
  return Object.freeze({
    id: input.id ?? crypto.randomUUID(), slotId: input.slotId,
    bindingId: input.bindingId, sessionId: input.sessionId,
    rollId: input.rollId ?? null, grade: input.grade,
    durationMs: Math.max(0, now.getTime() - input.startedAt),
    occurredAt: now.toISOString(),
  });
}
export function dueBindings<T extends { id: string }>(
  bindings: readonly T[], schedules: Record<string, ReviewSchedule>, now: Date
): T[] {
  return bindings.filter(binding => !schedules[binding.id] ||
    schedules[binding.id].dueDate <= now.toISOString());
}
