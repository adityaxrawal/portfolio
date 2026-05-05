import { useState, useEffect } from 'react';

// Custom hook for animated counter with cleanup to prevent memory leaks and overlapping loops
export const useAnimatedCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const end = parseInt(target) || 0;
    
    const step = (timestamp) => {
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
