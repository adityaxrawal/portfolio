import { lazy, Suspense } from 'react';

import SectionLoader from '@/components/ui/SectionLoader/SectionLoader';

// Lazy load sections for better initial TTI
const HeroSection = lazy(() => import('../../../hero'));
const Work = lazy(() => import('../Work'));
const Technology = lazy(() => import('../Technology'));
const Portfolio = lazy(() => import('../PortfolioDetail'));
// const Project = lazy(() => import('../Project'));

const Content = () => {
  return (
    <Suspense fallback={<SectionLoader />}>
      <div className="pr-[2.5%] pl-[2.5%]">
        <HeroSection />
        <Work />
        <Technology />
        {/* <Project /> */}
        <Portfolio />
      </div>
    </Suspense>
  );
};

export default Content;
