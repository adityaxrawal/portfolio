import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { useSharedState } from '@/app';

import './ScrollProgress.css';

interface ScrollProgressProps {
  activeIndex: number;
  totalSlides: number;
}

export default function ScrollProgress({ activeIndex, totalSlides }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { isDarkTheme } = useSharedState();

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const targetWidth = `${((activeIndex + 1) / totalSlides) * 100}%`;
    gsap.to(el, {
      width: targetWidth,
      duration: 0.55,
      ease: 'power3.out',
    });
  }, [activeIndex, totalSlides]);

  return (
    <div
      className={`scroll-progress-track ${isDarkTheme ? 'dark' : 'light'}`}
      role="progressbar"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={totalSlides}
      aria-label={`Section ${activeIndex + 1} of ${totalSlides}`}
    >
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
