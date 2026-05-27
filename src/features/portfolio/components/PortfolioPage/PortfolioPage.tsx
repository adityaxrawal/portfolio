import { Suspense } from 'react';

import {
  FooterLazy,
  HeroSectionLazy,
  // PortfolioDetailLazy,
  ProjectLazy,
  TechnologyLazy,
  WorkLazy,
} from '../../constants/sectionImports';

import Loader from '@/components/ui/Loader';
import SnapLayout from '@/components/ui/SnapLayout';
import { LOADER_LOGS } from '@/config';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<Loader isFullScreen={false} ignoreSessionStorage={true} logLines={LOADER_LOGS.PAGE_SECTIONS as unknown as string[]} />}>
      <SnapLayout>
        <HeroSectionLazy />
        <WorkLazy />
        <ProjectLazy />
        <TechnologyLazy />
        {/* <PortfolioDetailLazy /> */}
        <FooterLazy />
      </SnapLayout>
    </Suspense>
  );
}
