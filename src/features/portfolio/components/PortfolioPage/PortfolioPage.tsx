import { lazy, Suspense } from 'react';
import SnapLayout from '@/components/layout/SnapLayout';
import SectionLoader from '@/components/ui/SectionLoader/SectionLoader';

// Lazy load sections for better initial TTI
const HeroSection = lazy(() => import('@/features/hero'));
const Work = lazy(() => import('@/features/portfolio/components/Work'));
const Technology = lazy(() => import('@/features/portfolio/components/Technology'));
const PortfolioDetail = lazy(() => import('@/features/portfolio/components/PortfolioDetail'));
const Footer = lazy(() => import('@/components/layout/Footer/v2'));

export default function PortfolioPage() {
  return (
    <Suspense fallback={<SectionLoader />}>
      <SnapLayout>
        <HeroSection />
        <Work />
        <Technology />
        <PortfolioDetail />
        <Footer />
      </SnapLayout>
    </Suspense>
  );
}
