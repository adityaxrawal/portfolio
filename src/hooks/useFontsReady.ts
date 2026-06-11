import { useEffect } from 'react';
import { useLoading } from '@/app/providers/LoadingContext';

export function useFontsReady() {
  const { resolveTask } = useLoading();

  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        resolveTask('fonts');
      });
    } else {
      // Fallback if document.fonts is not supported
      resolveTask('fonts');
    }
  }, [resolveTask]);
}
