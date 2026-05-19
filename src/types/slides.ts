/**
 * SlideProps — injected by SnapLayout into every snap section.
 *
 * isActive   – true when this slide is fully visible in the viewport
 * goToSlide  – programmatically navigate to any slide index
 * slideIndex – this slide's 0-based position in the stack
 */
export interface SlideProps {
  isActive: boolean;
  goToSlide: (index: number) => void;
  slideIndex: number;
}
