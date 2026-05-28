/**
 * @deprecated Prefer inline count-up in consuming components. Retained for tests.
 */
import { useState, useEffect } from 'react';

// Custom hook for animated counter with cleanup to prevent memory leaks and overlapping loops
export const useAnimatedCounter = (
  target: number | string,
  duration = 1500,
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number | null = null;

    const end = typeof target === 'string' ? parseInt(target, 10) : target || 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    // CLEANUP: Essential to prevent memory leaks and overlapping loops
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  return count;
};
