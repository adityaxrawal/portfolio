import { lazy } from 'react';

/** Shared lazy section imports — keeps PortfolioPage and MainContent in sync. */
export const HeroSectionLazy = lazy(() => import('@/features/hero'));
export const WorkLazy = lazy(() => import('@/features/work/components/Work'));
export const TechnologyLazy = lazy(
  () => import('@/features/portfolio/components/Technology/v2'),
);
export const ProjectLazy = lazy(
  () => import('@/features/portfolio/components/Project/v2'),
);
export const PortfolioDetailLazy = lazy(
  () => import('@/features/portfolio/components/PortfolioDetail'),
);
export const FooterLazy = lazy(() => import('@/components/ui/Footer'));
