import React from 'react';
import { useSharedState } from '@/app/providers/AppContext';
import { useReelsScroll } from '@/hooks/useReelsScroll';
import { SnapScrollContext } from './SnapScrollContext';
import Header from '@/components/layout/Header';
import './SnapLayout.css'; // keep the CSS for dot nav and z-index

export const SnapLayout: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  const { isDarkTheme } = useSharedState();
  const { activeIndex, containerRef, goToSlide } = useReelsScroll(children.length);

  return (
    <SnapScrollContext.Provider value={{ activeIndex, goToSlide, totalSlides: children.length }}>
      {/* Fixed Header overlay */}
      <Header />

      <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden', position: 'relative' }}>
        <div 
          ref={containerRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            willChange: 'transform' 
          }}
        >
          {children.map((child, idx) => (
            <div 
              key={idx} 
              style={{ 
                width: '100vw', 
                height: '100dvh', 
                boxSizing: 'border-box',
                flexShrink: 0
              }}
            >
              {child}
            </div>
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
