import { Component, type ErrorInfo, type ReactNode } from 'react';

import Loader from '@/components/ui/Loader';
import { LOADER_LOGS } from '@/config';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error?: Error) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error);
      }
      return (
        this.props.fallback ?? (
          <Loader
            isFullScreen={true}
            logLines={LOADER_LOGS.ERROR_RECOVERY as unknown as string[]}
            systemMessage={{
              pending: [
                '// CRITICAL SYSTEM FAILURE',
                this.state.error?.message || 'UNKNOWN EXCEPTION DETECTED',
              ],
              done: [],
            }}
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
