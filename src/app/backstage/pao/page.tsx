import type { Metadata } from 'next';
import { PaoRoll99 } from '@/components/features/pao-roll99';

export const metadata: Metadata = {
  title: 'ROLL//99 — Memorization Station',
  description: 'Practice the 00–99 PAO roster with percentile dice and spaced recall.',
};

export default function PaoPage() {
  return <PaoRoll99 />;
}
