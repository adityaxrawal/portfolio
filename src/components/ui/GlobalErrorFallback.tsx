import { AlertCircle, RefreshCw } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

export default function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background-base p-6 text-center text-text-primary">
      <div className="mb-6 rounded-full bg-error-bg p-4 text-error">
        <AlertCircle size={48} />
      </div>
      <h1 className="mb-4 font-playfair text-3xl font-bold md:text-4xl">
        Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-text-secondary md:text-lg">
        We encountered an unexpected error while loading the application. Our team has been notified.
      </p>
      
      {import.meta.env.DEV && (
        <div className="mb-8 max-h-48 w-full max-w-2xl overflow-auto rounded border border-error-border bg-surface-raised p-4 text-left font-mono text-sm text-text-primary">
          <p className="font-bold text-error">{(error as Error).name}: {(error as Error).message}</p>
          <pre className="mt-2 text-text-muted">{(error as Error).stack}</pre>
        </div>
      )}

      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 rounded bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition-colors hover:bg-brand-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-base"
      >
        <RefreshCw size={18} />
        Reload Application
      </button>
    </div>
  );
}
