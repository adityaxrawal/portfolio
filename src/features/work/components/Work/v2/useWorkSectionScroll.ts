import { RefObject, useEffect, useRef } from 'react';

interface UseWorkSectionScrollOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  totalJobs: number;
  activeJob: number;
  setActiveJob: (index: number) => void;
  setDirection: (direction: number) => void;
}

export function useWorkSectionScroll({
  containerRef,
  totalJobs,
  activeJob,
  setActiveJob,
  setDirection,
}: UseWorkSectionScrollOptions) {
  const lastSnapTime = useRef(Date.now());
  const touchStartY = useRef<number | null>(null);
  const activeJobRef = useRef(activeJob);

  useEffect(() => {
    activeJobRef.current = activeJob;
  }, [activeJob]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const checkScrollable = (target: HTMLElement, deltaY: number) => {
      let el: HTMLElement | null = target;
      while (el && el !== container) {
        if (el.scrollHeight > el.clientHeight) {
          const style = window.getComputedStyle(el);
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
            // Scrolling down
            if (
              deltaY > 0 &&
              Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight
            )
              return true;
            // Scrolling up
            if (deltaY < 0 && Math.ceil(el.scrollTop) > 0) return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTime.current;

      if (timeSinceLastSnap < 1000) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (Math.abs(e.deltaY) < 10) return;

      if (checkScrollable(e.target as HTMLElement, e.deltaY)) {
        e.stopPropagation();
        return;
      }

      const currentJob = activeJobRef.current;

      if (e.deltaY > 0) {
        if (currentJob < totalJobs - 1) {
          e.preventDefault();
          e.stopPropagation();
          setDirection(1);
          setActiveJob(currentJob + 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      } else if (e.deltaY < 0) {
        if (currentJob > 0) {
          e.preventDefault();
          e.stopPropagation();
          setDirection(-1);
          setActiveJob(currentJob - 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTime.current;

      if (timeSinceLastSnap < 1000) {
        e.stopPropagation();
        return;
      }

      if (Math.abs(deltaY) < 20) return;

      if (checkScrollable(e.target as HTMLElement, deltaY)) {
        e.stopPropagation();
        return;
      }

      const currentJob = activeJobRef.current;

      if (deltaY > 0) {
        if (currentJob < totalJobs - 1) {
          e.stopPropagation();
          setDirection(1);
          setActiveJob(currentJob + 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      } else if (deltaY < 0) {
        if (currentJob > 0) {
          e.stopPropagation();
          setDirection(-1);
          setActiveJob(currentJob - 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef, setActiveJob, setDirection, totalJobs]);

  return { lastSnapTime };
}
