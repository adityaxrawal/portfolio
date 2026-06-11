import { motion, useInView } from 'framer-motion';
import { useRef, ElementType, ReactNode } from 'react';
import { ease } from '@/lib/animations';
import { useIsSlideActive } from '../SnapLayout/SlideActiveContext';
import './Animations.css';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export const RevealHeading = ({ children, delay = 0, className = '', as: Tag = 'h2' }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isSlideActive = useIsSlideActive();

  const shouldAnimate = isInView && isSlideActive;

  // Fallback to div if Tag can't be wrapped by motion directly cleanly, but standard HTML tags work fine
  const MotionTag: any = (motion as any)[Tag as any] || motion.h2;

  return (
    <div ref={ref} className={`reveal-heading-wrapper ${className}`}>
      <MotionTag
        className="reveal-heading-content"
        initial={{ y: '100%', rotateZ: 2, opacity: 0 }}
        animate={shouldAnimate ? { y: 0, rotateZ: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: ease.smooth }}
      >
        {children}
      </MotionTag>
    </div>
  );
};
