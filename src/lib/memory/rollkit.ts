/**
 * ROLL//99: headless, crypto-backed percentile-dice core.
 * Both dice are independent decimal digits. Display always retains leading zeroes.
 * Result events are stable across web, native and physical-roll adapters.
 */
export type RollSource = 'digital' | 'physical-entry';

export interface PercentileRoll {
  id: string;
  kind: 'percentile-d10';
  tens: number;
  ones: number;
  value: number;
  display: string;
  source: RollSource;
  occurredAt: string;
}
export interface RandomSource {
  getRandomValues<T extends Uint32Array>(array: T): T;
}
export function formatPercentile(tens: number, ones: number): string {
  if (![tens, ones].every(n => Number.isInteger(n) && n >= 0 && n <= 9)) {
    throw new RangeError('Expected two digits between 0 and 9');
  }
  return `${tens}${ones}`;
}
export function secureDigit(rng: RandomSource): number {
  const limit = Math.floor(0x100000000 / 10) * 10;
  const sample = new Uint32Array(1);
  do { rng.getRandomValues(sample); } while (sample[0] >= limit);
  return sample[0] % 10;
}
export function rollPercentile(
  rng: RandomSource = crypto,
  now: () => Date = () => new Date(),
  id: () => string = () => crypto.randomUUID()
): PercentileRoll {
  const tens = secureDigit(rng);
  const ones = secureDigit(rng);
  return Object.freeze({
    id: id(), kind: 'percentile-d10' as const, tens, ones,
    value: tens * 10 + ones, display: formatPercentile(tens, ones),
    source: 'digital' as const, occurredAt: now().toISOString(),
  });
}
export function enterPhysicalRoll(
  tens: number, ones: number,
  now: () => Date = () => new Date(),
  id: () => string = () => crypto.randomUUID()
): PercentileRoll {
  const display = formatPercentile(tens, ones);
  return Object.freeze({
    id: id(), kind: 'percentile-d10' as const, tens, ones,
    value: Number(display), display, source: 'physical-entry' as const,
    occurredAt: now().toISOString(),
  });
}
