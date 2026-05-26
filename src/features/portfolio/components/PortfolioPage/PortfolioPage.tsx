import { Suspense } from 'react';

import {
  FooterLazy,
  HeroSectionLazy,
  PortfolioDetailLazy,
  ProjectLazy,
  TechnologyLazy,
  WorkLazy,
} from '../../constants/sectionImports';

import SectionLoader from '@/components/ui/SectionLoader';
import SnapLayout from '@/components/ui/SnapLayout';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<SectionLoader />}>
      <SnapLayout>
        <HeroSectionLazy />
        <WorkLazy />
        <ProjectLazy />
        <TechnologyLazy />
        <PortfolioDetailLazy />
        <FooterLazy />
      </SnapLayout>
    </Suspense>
  );
}
