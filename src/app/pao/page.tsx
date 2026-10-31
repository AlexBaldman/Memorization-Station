import { PaoMatrix } from '@/components/features/pao-matrix';
import { PageHeader } from '@/components/page-header';

export default function PaoPage() {
  return (
    <div className="pb-16">
      <PageHeader
        title="PAO MATRIX"
        description="The 00–99 Person-Action-Object memory compound. Instant lookup, test mode, and visual mnemonics."
      />
      <PaoMatrix />
    </div>
  );
}
