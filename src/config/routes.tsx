import type { ComponentType } from 'react';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ui/ErrorBoundary';
import Loader from '@/components/ui/Loader';
import { LOADER_LOGS } from '@/config';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let hasBooted = false;

const lazyWithBootDelay = <T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
) => {
  return lazy(async () => {
    if (!hasBooted) {
      hasBooted = true;
      const [module] = await Promise.all([factory(), delay(3000)]);
      return module;
    }
    return factory();
  });
};

const PortfolioPage = lazyWithBootDelay(
  () => import('@/features/portfolio/components/PortfolioPage/PortfolioPage'),
);
const Companies = lazyWithBootDelay(() => import('@/features/companies'));

let isFirstRoute = true;

function LazyRoute({ children }: { children: React.ReactNode }) {
  const [isFirst] = useState(isFirstRoute);

  useEffect(() => {
    if (isFirst) {
      isFirstRoute = false;
    }
  }, [isFirst]);

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
