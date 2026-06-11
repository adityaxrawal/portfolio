import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useIsSlideActive } from '../SnapLayout/SlideActiveContext';
import './Animations.css';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const RevealBox = ({ children, delay = 0, className = '' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const isSlideActive = useIsSlideActive();

  const shouldAnimate = isInView && isSlideActive;

  return (
    <motion.div
      ref={ref}
      className={`reveal-box-wrapper ${className}`}
      initial={{ opacity: 0, scale: 0.95, rotateX: 10, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, type: 'spring', bounce: 0.3 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};
