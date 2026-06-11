import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

import { ease } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  staggerChildren?: boolean;
  blur?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  staggerChildren = false,
  blur = true,
  tag = 'div'
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  const getAxisOffset = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 };
      case 'down': return { y: -40, x: 0 };
      case 'left': return { x: 40, y: 0 };
      case 'right': return { x: -40, y: 0 };
      case 'none': return { x: 0, y: 0 };
      default: return { y: 40, x: 0 };
    }
  };

  const offset = getAxisOffset();

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: offset.x, 
      y: offset.y,
      filter: blur ? 'blur(8px)' : 'blur(0px)'
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: ease.smooth,
        delay,
        ...(staggerChildren && { staggerChildren: 0.1, delayChildren: delay + 0.1 })
      }
    }
  };

  const MotionTag = motion[tag as keyof typeof motion] as any;

  return (
    <MotionTag
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
