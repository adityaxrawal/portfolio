import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useRef, useEffect, useCallback } from 'react';

import './SlideTransition.css';

interface SlideTransitionHandle {
  trigger: (onMidpoint: () => void) => void;
}

export { type SlideTransitionHandle };

interface SlideTransitionProps {
  handleRef: React.MutableRefObject<SlideTransitionHandle | null>;
  isDark: boolean;
}

/**
 * SlideTransition
 *
 * Renders a full-screen wipe overlay. Call `handleRef.current.trigger(callback)`
 * to play the cover animation, invoke `callback` at the midpoint, then reveal.
 *
 * Animation: scaleY 0→1 (covers screen) → callback() → scaleY 1→0 (reveals)
 * Total duration: ~480ms
 */
export default function SlideTransition({ handleRef, isDark }: SlideTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const trigger = useCallback(
    (onMidpoint: () => void) => {
      const el = overlayRef.current;
      if (!el) { onMidpoint(); return; }

      if (prefersReducedMotion) {
        onMidpoint();
        return;
      }

      const tl = gsap.timeline();
      // Cover: grow from bottom
      tl.fromTo(
        el,
        { scaleY: 0, transformOrigin: 'bottom center' },
        { scaleY: 1, duration: 0.22, ease: 'power3.inOut' },
      )
        .call(onMidpoint)
        // Reveal: shrink from top
        .fromTo(
          el,
          { scaleY: 1, transformOrigin: 'top center' },
          { scaleY: 0, duration: 0.26, ease: 'power3.inOut', delay: 0.04 },
        );
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    handleRef.current = { trigger };
  }, [handleRef, trigger]);

  return (
    <div
      ref={overlayRef}
      className={`slide-transition-overlay ${isDark ? 'dark' : 'light'}`}
      aria-hidden="true"
    />
  );
}
