import { createContext, useContext } from 'react';

interface SnapScrollContextType {
  activeIndex: number;
  goToSlide: (index: number) => void;
  totalSlides: number;
}

export const SnapScrollContext = createContext<SnapScrollContextType | undefined>(undefined);

export function useSnapScroll() {
  const context = useContext(SnapScrollContext);
  if (!context) {
    throw new Error('useSnapScroll must be used within a SnapLayout');
  }
  return context;
}
