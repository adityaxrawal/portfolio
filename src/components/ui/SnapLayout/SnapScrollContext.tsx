import { createContext, useContext, useMemo } from 'react';

export interface SnapScrollContextType {
  activeIndex: number;
  goToSlide: (index: number) => void;
  totalSlides: number;
}

export const SnapScrollContext = createContext<SnapScrollContextType | undefined>(
  undefined,
);

export function useSnapScroll(): SnapScrollContextType {
  const context = useContext(SnapScrollContext);
  if (!context) {
    throw new Error('useSnapScroll must be used within a SnapLayout');
  }
  return context;
}

/** Read a derived slice of snap-scroll context (memoized on context values). */
export function useSnapScrollSelector<T>(
  selector: (ctx: SnapScrollContextType) => T,
): T {
  const context = useSnapScroll();
  return useMemo(
    () => selector(context),
    [context, context.activeIndex, context.totalSlides, selector],
  );
}

export function useSnapScrollActiveIndex(): number {
  return useSnapScrollSelector((ctx) => ctx.activeIndex);
}
