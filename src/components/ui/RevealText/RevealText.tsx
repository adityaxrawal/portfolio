import { motion, useInView } from 'framer-motion';
import { ElementType, useRef } from 'react';

import { ease } from '@/lib/animations';

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: ElementType;
  asInline?: boolean;
}

export const RevealBlock = ({ 
  children, 
  delay = 0,
  className = '',
  display = 'inline-block'
}: { 
  children: React.ReactNode, 
  delay?: number,
  className?: string,
  display?: 'inline-block' | 'block'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px 0px' });

  return (
    <span ref={ref} className={className} style={{ overflow: 'hidden', display }}>
      <motion.span
        style={{ display }}
        initial={{ y: '100%', rotateZ: 2 }}
        animate={isInView ? { y: 0, rotateZ: 0 } : { y: '100%', rotateZ: 2 }}
        transition={{
          duration: 0.8,
          ease: ease.smooth,
          delay
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const RevealText = ({ 
  text, 
  className = '', 
  delay = 0, 
  tag = 'div',
  asInline = false 
}: RevealTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px 0px' });

  // Split by words
  const words = text.split(' ');

  const MotionTag = (motion as any)[tag as any] || motion.div;

  return (
    <MotionTag 
      ref={ref} 
      className={className} 
      style={{ 
        display: asInline ? 'inline-flex' : 'flex', 
        flexWrap: 'wrap', 
        gap: '0.25em' 
      }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', rotateZ: 2 }}
            animate={isInView ? { y: 0, rotateZ: 0 } : { y: '100%', rotateZ: 2 }}
            transition={{
              duration: 0.8,
              ease: ease.smooth,
              delay: delay + i * 0.04
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default RevealText;
