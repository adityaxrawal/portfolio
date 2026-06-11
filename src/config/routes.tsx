import type { ComponentType } from 'react';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Loader from '@/components/ui/Loader';
import { LOADER_LOGS } from '@/config';
import { useLoading } from '@/app/providers/LoadingContext';

const PortfolioPage = lazy(
  () => import('@/features/portfolio/components/PortfolioPage/PortfolioPage'),
);
const Companies = lazy(() => import('@/features/companies'));

let isFirstRoute = true;

function LazyRoute({ children }: { children: React.ReactNode }) {
  const [isFirst] = useState(isFirstRoute);
  const { resolveTask } = useLoading();

  useEffect(() => {
    if (isFirst) {
      isFirstRoute = false;
    }
  }, [isFirst]);

  useEffect(() => {
    // Once this wrapper mounts (meaning Suspense is resolved or resolving), 
    // we can signal that the initial component chunk has loaded.
    resolveTask('portfolio-chunk');
  }, [resolveTask]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Loader
            isFullScreen={true}
            logLines={
              (isFirst
                ? LOADER_LOGS.GLOBAL_BOOT
                : LOADER_LOGS.ROUTES) as unknown as string[]
            }
          />
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <LazyRoute>
            <PortfolioPage />
          </LazyRoute>
        }
      />
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
