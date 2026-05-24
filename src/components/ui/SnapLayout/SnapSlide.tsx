import { memo, type ReactNode } from 'react';

export interface SnapSlideProps {
  children: ReactNode;
  isActive?: boolean;
  goToSlide?: (index: number) => void;
  slideIndex?: number;
}

export const SnapSlide = memo(function SnapSlide({ children }: SnapSlideProps) {
  return (
    <div
      style={{
        width: '100vw',
        height: '100dvh',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
});
