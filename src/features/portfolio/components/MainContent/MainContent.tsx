import { Suspense } from 'react';

import SectionLoader from '@/components/ui/SectionLoader';
import {
  HeroSectionLazy,
  PortfolioDetailLazy,
  TechnologyLazy,
  WorkLazy,
} from '../../constants/sectionImports';

/**
 * @deprecated Use `PortfolioPage` with `SnapLayout` instead. Retained for legacy `PageLayout`.
 */
const Content = () => {
  return (
    <Suspense fallback={<SectionLoader />}>
      <div className="pr-[2.5%] pl-[2.5%]">
        <HeroSectionLazy />
        <WorkLazy />
        <TechnologyLazy />
        {/* <Project /> */}
        <PortfolioDetailLazy />
      </div>
    </Suspense>
  );
};

export default Content;
