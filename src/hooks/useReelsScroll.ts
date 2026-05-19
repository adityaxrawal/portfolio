import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useReelsScroll
 * 
 * Instagram Reels-style fullscreen section snapping with intelligent
 * nested scroll delegation and transition-synced hardware locking.
 * 
 * @param totalSlides – total number of snap sections
 * @param duration    – snap animation duration in ms (default: 600)
 */
export function useReelsScroll(totalSlides: number, duration = 600) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for tracking state without triggering stale closures in event listeners
  const activeIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const lastSnapTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  // ── goToSlide ─────────────────────────────────────────────────────────────
  const goToSlide = useCallback((index: number) => {
    if (isAnimating.current) return;
    
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    if (clampedIndex === activeIndexRef.current) return;

    isAnimating.current = true;
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
    lastSnapTime.current = Date.now();

    if (containerRef.current) {
      containerRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.77, 0, 0.175, 1)`;
      containerRef.current.style.transform = `translateY(-${clampedIndex * 100}dvh)`;
    }
  }, [totalSlides, duration]);

  // Helper to recursively find the nearest scrollable parent
  const findScrollableParent = useCallback((el: HTMLElement | null): HTMLElement | null => {
    if (!el || el === document.body || el === document.documentElement) return null;
    
    const hasOverflow = el.scrollHeight > el.clientHeight;
    const style = window.getComputedStyle(el);
    const isScrollable = style.overflowY === 'auto' || style.overflowY === 'scroll';
    
    if (hasOverflow && isScrollable) return el;
    
    return findScrollableParent(el.parentElement);
  }, []);

  // ── Event Listeners ───────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.target === container && e.propertyName === 'transform') {
        isAnimating.current = false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTime.current;

      // 1. Momentum Bleed Guard (1000ms Strict Cooldown)
      // This completely absorbs the trackpad momentum tail from the previous swipe.
      // Crucially, it prevents momentum from "bleeding" into a newly revealed nested 
      // scrollable container (like Work Experience) and causing it to scroll or skip.
      if (timeSinceLastSnap < 1000) {
        e.preventDefault();
        return;
      }

      // 2. Scroll Delegation (Nested scrollable containers)
      const target = e.target as HTMLElement;
      const scrollableParent = findScrollableParent(target);

      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) {
          return; // Let browser scroll inner content normally
        }
        if (e.deltaY < 0 && scrollTop > 2) {
          return; // Let browser scroll inner content normally
        }
      }

      // Prevent native document scrolling
      e.preventDefault();

      // 3. Ignore residual momentum noise
      // Any event surviving past the 1000ms lock must have a delta >= 10 to be considered a deliberate swipe.
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        goToSlide(activeIndexRef.current + 1);
      } else if (e.deltaY < 0) {
        goToSlide(activeIndexRef.current - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isAnimating.current) return;
      
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      if (Math.abs(deltaY) < 20) return;

      const elementAtCenter = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      ) as HTMLElement;
      
      const scrollableParent = findScrollableParent(elementAtCenter);

      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 2) {
          return; // Let browser scroll inner
        }
        if (deltaY < 0 && scrollTop > 2) {
          return; // Let browser scroll inner
        }
      }

      if (deltaY > 0) {
        goToSlide(activeIndexRef.current + 1);
      } else {
        goToSlide(activeIndexRef.current - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow natural browser behavior for inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      if (isAnimating.current) return;

      const nextKeys = ['ArrowDown', 'PageDown', 'j'];
      const prevKeys = ['ArrowUp', 'PageUp', 'k'];

      if (nextKeys.includes(e.key) || (e.key === ' ' && !e.shiftKey)) {
        if (e.key === ' ') e.preventDefault();
        goToSlide(activeIndexRef.current + 1);
      } else if (prevKeys.includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        if (e.key === ' ') e.preventDefault();
        goToSlide(activeIndexRef.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      containerRef.current.style.transition = 'none';
      containerRef.current.style.transform = `translateY(-${activeIndexRef.current * 100}dvh)`;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    container.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [totalSlides, findScrollableParent, goToSlide]);

  return { activeIndex, containerRef, goToSlide };
}
