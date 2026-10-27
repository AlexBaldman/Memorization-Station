import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { secureDigit, formatPercentile, rollPercentile, enterPhysicalRoll } from '../src/lib/memory/rollkit.ts';
import { PAO_NUMBERS, normalizeRoster } from '../src/lib/memory/roster.ts';
import { scheduleSm2, deriveSchedules, makeRecallEvent, dueBindings } from '../src/lib/memory/review.ts';
import { assertLedger, mergeLedger, exportCsv, exportLedger } from '../src/lib/memory/ledger.ts';
const now = new Date('2026-10-27T12:00:00.000Z');
const roster = JSON.parse(readFileSync(new URL('../src/lib/memory/pao-legacy.json', import.meta.url), 'utf8'));

test('full 00-99 roster is immutable, complete, provenance-aware', () => {
  const bindings = normalizeRoster(roster);
  assert.equal(bindings.length, 100);
  assert.deepEqual([PAO_NUMBERS[0], PAO_NUMBERS[99]], ['00', '99']);
  assert.deepEqual([bindings[0].number, bindings[99].number], ['00', '99']);
  assert.ok(bindings.every(b => b.person && b.action && b.object && b.id.endsWith(':' + b.number)));
  assert.ok(Object.isFrozen(bindings[0]));
  assert.throws(() => normalizeRoster({}), /100/);
});
test('two independent unbiased digits preserve 00, 09, and 99', () => {
  assert.equal(formatPercentile(0, 0), '00');
  assert.equal(formatPercentile(0, 9), '09');
  assert.equal(formatPercentile(9, 9), '99');
  assert.throws(() => formatPercentile(0, 10), RangeError);
  let draws = [0xffffffff, 0, 9];
  const rng = { getRandomValues(view) { view[0] = draws.shift(); return view; } };
  assert.equal(secureDigit(rng), 0);
  assert.equal(secureDigit(rng), 9);
  const zeros = { getRandomValues(view) { view[0] = 0; return view; } };
  assert.equal(rollPercentile(zeros, () => now, () => 'r').display, '00');
  assert.equal(enterPhysicalRoll(0, 0, () => now, () => 'p').source, 'physical-entry');
});
test('SM-2 follows review grade; lapse resets to one day', () => {
  let s = scheduleSm2(undefined, 5, now);
  assert.equal(s.interval, 1);
  s = scheduleSm2(s, 5, now);
  assert.equal(s.interval, 6);
  s = scheduleSm2(s, 1, now);
  assert.equal(s.interval, 1);
  assert.equal(s.repetitions, 0);
  assert.throws(() => scheduleSm2(undefined, 7, now), RangeError);
});
test('attempt events retain binding provenance and derive due queue', () => {
  const binding = normalizeRoster(roster)[42];
  const event = makeRecallEvent({
    slotId: '42', bindingId: binding.id, grade: 5, sessionId: 'session-1',
    rollId: 'r', startedAt: now.getTime() - 2400, now, id: 'e1',
  });
  assert.equal(event.durationMs, 2400);
  assert.equal(event.bindingId, binding.id);
  assert.equal(deriveSchedules([event])[binding.id].interval, 1);
  assert.equal(dueBindings([binding], deriveSchedules([event]), now).length, 0);
  assert.equal(dueBindings([binding], deriveSchedules([event]), new Date('2026-10-29T12:00:00.000Z')).length, 1);
});
test('ledger validates, exports, merges idempotently and rejects conflicting IDs', () => {
  const event = makeRecallEvent({
    slotId: '00', bindingId: 'source:00', grade: 3, sessionId: 's',
    startedAt: now.getTime(), now, id: 'e1',
  });
  const one = assertLedger({ version: 1, events: [event] });
  assert.equal(mergeLedger(one, one).events.length, 1);
  assert.equal(assertLedger(JSON.parse(exportLedger(one))).events.length, 1);
  assert.match(exportCsv(one), /slotId/);
  assert.throws(() => assertLedger({ version: 1, events: [{ ...event, slotId: '100' }] }), /invalid/);
  const changed = assertLedger({ version: 1, events: [{ ...event, grade: 1 }] });
  assert.throws(() => mergeLedger(one, changed), /conflict/);
});
