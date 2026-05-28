/**
 * RightPanel — Orchestrates the 4 right sidebar sections:
 * ImpactOverview, TechnologyCloud, FocusAreas, CommitActivity
 */

import { CommitActivity } from './CommitActivity';
import { FocusAreas } from './FocusAreas';
import { ImpactOverview } from './ImpactOverview';
import { TechnologyCloud } from './TechnologyCloud';

export function RightPanel() {
  return (
    <div className="proj-right-panel">
      <ImpactOverview />
      <TechnologyCloud />
      <FocusAreas />
      <CommitActivity />
    </div>
  );
}
