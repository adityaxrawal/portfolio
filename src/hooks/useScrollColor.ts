/**
 * @deprecated Legacy scroll-based theming. Theme is managed via `AppContext`.
 */
import { useEffect } from 'react';

import { interpolateColor } from '@/utils';

/**
 * Maps scroll position to an interpolated background color between sections
 * and applies it directly to a DOM element ref for high performance.
 *
 * @param {import('react').RefObject} wrapperRef - Ref to the root wrapper div
 * @param {Array<{ id: string, color: string }>} sections
 */
export interface ScrollSection {
  id: string;
  color: string;
}

export function useScrollColor(
  wrapperRef: React.RefObject<HTMLElement | null>,
  sections: ScrollSection[],
) {
  useEffect(() => {
    if (!wrapperRef.current || sections.length === 0) return;

    let rafId: number | null = null;

    const calculateColor = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportMid = scrollY + windowHeight / 2;

      // Map sections to their center positions
      const sectionData = sections
        .map((sec, idx) => {
          const el = document.getElementById(sec.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const height = rect.height;
          return {
            ...sec,
            idx,
            center: top + height / 2,
          };
        })
        .filter(
          (item): item is ScrollSection & { idx: number; center: number } =>
            item !== null,
        );

      if (sectionData.length === 0) return;

      let newColor = sectionData[0].color;

      if (viewportMid <= sectionData[0].center) {
        newColor = sectionData[0].color;
      } else if (viewportMid >= sectionData[sectionData.length - 1].center) {
        newColor = sectionData[sectionData.length - 1].color;
      } else {
        // Find the two sections we are between
        for (let i = 0; i < sectionData.length - 1; i++) {
          const current = sectionData[i];
          const next = sectionData[i + 1];

          if (viewportMid >= current.center && viewportMid <= next.center) {
            const dist = next.center - current.center;
            let ratio = (viewportMid - current.center) / dist;
            ratio = Math.max(0, Math.min(1, ratio));
            newColor = interpolateColor(current.color, next.color, ratio);
            break;
          }
        }
      }

      // Apply directly to the DOM for 60fps performance without React re-renders
      if (wrapperRef.current) {
        wrapperRef.current.style.backgroundColor = newColor;
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateColor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial calculation
    calculateColor();
    // Re-calculate after a slight delay in case fonts/images shift the layout
    setTimeout(calculateColor, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sections, wrapperRef]);
}
