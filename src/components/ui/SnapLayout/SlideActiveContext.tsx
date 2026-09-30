import { createContext, useContext } from 'react';

export const SlideActiveContext = createContext<boolean | undefined>(undefined);

export function useIsSlideActive(): boolean {
  const context = useContext(SlideActiveContext);
  // If we are not within a SnapLayout slide, default to true 
  // so animations still work normally in standalone contexts
  if (context === undefined) {
    return true;
  }
  return context;
}
