import { lazy, Suspense } from 'react';

import { develupArchitecture } from '../../../../constants/develup.architecture';
import { leadsquaredArchitecture } from '../../../../constants/leadsquared.architecture';
import { mathcoArchitecture } from '../../../../constants/mathco.architecture';
import { wiproArchitecture } from '../../../../constants/wipro.architecture';
import { ArchitectureDiagramConfig } from '../../../Architecture';

import Loader from '@/components/ui/Loader';
import { LOADER_LOGS } from '@/config';

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
    <Suspense fallback={<Loader isFullScreen={false} ignoreSessionStorage={true} logLines={LOADER_LOGS.ARCHITECTURE as unknown as string[]} />}>
      <ArchitectureDiagram config={config} />
    </Suspense>
  );
}
