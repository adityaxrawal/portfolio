import React, { useRef, useCallback } from 'react';

import { SnapScrollContext } from './SnapScrollContext';
import { SnapSlide } from './SnapSlide';

import { useSharedState } from '@/app';
import GridCursor from '@/components/ui/GridCursor/GridCursor';
import Header from '@/components/ui/Header';
import ScrollProgress from '@/components/ui/ScrollProgress/ScrollProgress';
import SlideTransition, {
  type SlideTransitionHandle,
} from '@/components/ui/SlideTransition/SlideTransition';
import { useReelsScroll } from '@/hooks';

import './SnapLayout.css';

export const SnapLayout: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  const { isDarkTheme } = useSharedState();
  const { activeIndex, containerRef, goToSlide } = useReelsScroll(
    children.length,
  );
  const transitionRef = useRef<SlideTransitionHandle | null>(null);

  // Intercept goToSlide to play wipe transition animation first
  const handleGoToSlide = useCallback(
    (index: number) => {
      if (transitionRef.current) {
        transitionRef.current.trigger(() => goToSlide(index));
      } else {
        goToSlide(index);
      }
    },
    [goToSlide],
  );

  return (
    <SnapScrollContext.Provider
      value={{ activeIndex, goToSlide: handleGoToSlide, totalSlides: children.length }}
    >
      {/* Custom grid-based architectural cursor */}
      <GridCursor />

      {/* Slide wipe transition overlay */}
      <SlideTransition handleRef={transitionRef} isDark={isDarkTheme} />

      {/* Top scroll progress bar */}
      <ScrollProgress activeIndex={activeIndex} totalSlides={children.length} />

      <div style={{ width: '100%', height: '100dvh', overflow: 'hidden' }}>
        {/* Fixed Header overlay */}
        <Header />
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {children.map((child, idx) => (
            <SnapSlide key={idx} slideIndex={idx}>{child}</SnapSlide>
          ))}
        </div>
      </div>

      {/* Dot navigation */}
      <nav
        aria-label="Section navigation"
        className={`snap-dot-nav ${isDarkTheme ? 'dark' : ''}`}
      >
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => handleGoToSlide(i)}
            aria-label={`Navigate to slide ${i + 1}`}
            className={`snap-dot-btn ${activeIndex === i ? 'active' : ''}`}
          />
        ))}
      </nav>
    </SnapScrollContext.Provider>
  );
};

export default SnapLayout;
