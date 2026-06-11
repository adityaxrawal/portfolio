import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode, ElementType } from 'react';
import { useIsSlideActive } from '../SnapLayout/SlideActiveContext';
import './Animations.css';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export const RevealButton = ({ children, delay = 0, className = '', as = 'div' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  const isSlideActive = useIsSlideActive();

  const shouldAnimate = isInView && isSlideActive;

  const MotionTag: any = (motion as any)[as as any] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={`reveal-btn-wrapper ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={shouldAnimate ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay, 
        type: 'spring', 
        stiffness: 400, 
        damping: 15 
      }} // Highly elastic pop
    >
      {children}
    </MotionTag>
  );
};
