import React from 'react';

import { SnapScrollContext } from './SnapScrollContext';
import { SnapSlide } from './SnapSlide';

import { useSharedState } from '@/app';
import Header from '@/components/ui/Header';
import { useReelsScroll } from '@/hooks';

import './SnapLayout.css';

export const SnapLayout: React.FC<{ children: React.ReactNode[] }> = ({
  children,
}) => {
  const { isDarkTheme } = useSharedState();
  const { activeIndex, containerRef, goToSlide } = useReelsScroll(
    children.length,
  );

  return (
    <SnapScrollContext.Provider
      value={{ activeIndex, goToSlide, totalSlides: children.length }}
    >
      {/* Fixed Header overlay */}
      <Header />

      <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}>
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {children.map((child, idx) => (
            <SnapSlide key={idx}>{child}</SnapSlide>
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
            onClick={() => goToSlide(i)}
            aria-label={`Navigate to slide ${i + 1}`}
            className={`snap-dot-btn ${activeIndex === i ? 'active' : ''}`}
          />
        ))}
      </nav>
    </SnapScrollContext.Provider>
  );
};

export default SnapLayout;
