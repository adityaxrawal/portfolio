import { memo, type ReactNode } from 'react';
import { useSnapScrollActiveIndex } from './SnapScrollContext';
import { SlideActiveContext } from './SlideActiveContext';

export interface SnapSlideProps {
  children: ReactNode;
  isActive?: boolean;
  goToSlide?: (index: number) => void;
  slideIndex: number;
}

export const SnapSlide = memo(function SnapSlide({ children, slideIndex }: SnapSlideProps) {
  const activeIndex = useSnapScrollActiveIndex();
  const isSlideActive = activeIndex === slideIndex;

  return (
    <SlideActiveContext.Provider value={isSlideActive}>
      <div
        style={{
          width: '100%',
          height: '100dvh',
          boxSizing: 'border-box',
          flexShrink: 0,
          paddingTop: '6vh',
        }}
      >
        {children}
      </div>
    </SlideActiveContext.Provider>
  );
});
