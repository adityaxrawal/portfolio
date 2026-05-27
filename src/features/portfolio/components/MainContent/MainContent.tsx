import { Suspense } from 'react';

import {
  HeroSectionLazy,
  PortfolioDetailLazy,
  TechnologyLazy,
  WorkLazy,
} from '../../constants/sectionImports';

import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Loader from '@/components/ui/Loader';
import { LOADER_LOGS } from '@/config';

/**
 * @deprecated Use `PortfolioPage` with `SnapLayout` instead. Retained for legacy `PageLayout`.
 */
const Content = () => {
  return (
    <Suspense fallback={<Loader isFullScreen={false} ignoreSessionStorage={true} logLines={LOADER_LOGS.PORTFOLIO as unknown as string[]} />}>
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
