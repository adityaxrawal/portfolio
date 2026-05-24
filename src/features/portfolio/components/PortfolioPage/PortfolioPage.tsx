import { Suspense } from 'react';
import SnapLayout from '@/components/ui/SnapLayout';
import SectionLoader from '@/components/ui/SectionLoader';
import {
  FooterLazy,
  HeroSectionLazy,
  PortfolioDetailLazy,
  TechnologyLazy,
  WorkLazy,
} from '../../constants/sectionImports';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<SectionLoader />}>
      <SnapLayout>
        <HeroSectionLazy />
        <WorkLazy />
        <TechnologyLazy />
        <PortfolioDetailLazy />
        <FooterLazy />
      </SnapLayout>
    </Suspense>
  );
}
