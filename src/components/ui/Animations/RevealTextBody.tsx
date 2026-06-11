import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { ease } from '@/lib/animations';
import { useIsSlideActive } from '../SnapLayout/SlideActiveContext';
import './Animations.css';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}

export const RevealTextBody = ({ children, delay = 0, className = '', as = 'p' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const isSlideActive = useIsSlideActive();

  const shouldAnimate = isInView && isSlideActive;

  const MotionTag: any = (motion as any)[as as any] || motion.p;

  return (
    <MotionTag
      ref={ref}
      className={`reveal-text-wrapper ${className}`}
      initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
      animate={shouldAnimate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: ease.smooth }}
    >
      {children}
    </MotionTag>
  );
};
