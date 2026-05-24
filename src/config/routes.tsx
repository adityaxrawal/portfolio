import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Loader from '@/components/ui/Loader';

const PortfolioPage = lazy(
  () => import('@/features/portfolio/components/PortfolioPage/PortfolioPage'),
);
const Companies = lazy(() => import('@/features/companies'));

function LazyRoute({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/aditya-rawal"
        element={
          <LazyRoute>
            <PortfolioPage />
          </LazyRoute>
        }
      />
      <Route path="/" element={<Navigate to="/aditya-rawal" replace />} />
      <Route
        path="/companies"
        element={
          <LazyRoute>
            <Companies />
          </LazyRoute>
        }
      />
    </Routes>
  );
}
