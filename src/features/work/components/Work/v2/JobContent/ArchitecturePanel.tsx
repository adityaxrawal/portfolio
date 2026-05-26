import { lazy, Suspense } from 'react';

import { develupArchitecture } from '../../../../constants/develup.architecture';
import { leadsquaredArchitecture } from '../../../../constants/leadsquared.architecture';
import { mathcoArchitecture } from '../../../../constants/mathco.architecture';
import { wiproArchitecture } from '../../../../constants/wipro.architecture';
import { ArchitectureDiagramConfig } from '../../../Architecture';

import SectionLoader from '@/components/ui/SectionLoader';

const ArchitectureDiagram = lazy(() =>
  import('@/features/work/components/Architecture').then((m) => ({
    default: m.ArchitectureDiagram,
  })),
);

const CONFIGS: Record<string, ArchitectureDiagramConfig> = {
  Wipro: wiproArchitecture,
  DevelUp: develupArchitecture,
  Leadsquared: leadsquaredArchitecture,
  MathCo: mathcoArchitecture,
};

interface ArchitecturePanelProps {
  companyName: string;
}

export function ArchitecturePanel({ companyName }: ArchitecturePanelProps) {
  const config = CONFIGS[companyName];
  if (!config) return null;

  return (
    <Suspense fallback={<SectionLoader />}>
      <ArchitectureDiagram config={config} />
    </Suspense>
  );
}
