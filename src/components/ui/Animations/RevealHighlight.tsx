import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useIsSlideActive } from '../SnapLayout/SlideActiveContext';
import './Animations.css';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  color?: string; // Optional custom sweep color
}

export const RevealHighlight = ({ children, delay = 0, className = '', color = 'var(--text-accent)' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isSlideActive = useIsSlideActive();

  const shouldAnimate = isInView && isSlideActive;

  return (
    <span ref={ref} className={`reveal-highlight-wrapper ${className}`}>
      <motion.span
        className="reveal-highlight-bg"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={shouldAnimate ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.77, 0, 0.175, 1] }} // Fast sweep
      />
      <motion.span
        className="reveal-highlight-text"
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : {}}
        transition={{ duration: 0.2, delay: delay + 0.3 }} // Text appears as sweep passes
      >
        {children}
      </motion.span>
    </span>
  );
};
