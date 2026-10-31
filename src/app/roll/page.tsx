import { RollStation } from '@/components/features/roll-station';
import { PageHeader } from '@/components/page-header';

export default function RollPage() {
  return (
    <div className="pb-16">
      <PageHeader
        title="ROLL//99 STATION"
        description="Dual D10 percentile dice training engine coupled with the 00–99 Person-Action-Object memory matrix."
      />
      <RollStation />
    </div>
  );
}
