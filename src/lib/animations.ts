import type { Variants } from 'framer-motion';

type BezierEasing = [number, number, number, number];

// Recommended easing presets
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as BezierEasing, // general purpose
  out: [0.0, 0.0, 0.2, 1] as BezierEasing, // elements entering
  inOut: [0.4, 0.0, 0.2, 1] as BezierEasing, // transitions
  spring: { type: 'spring' as const, stiffness: 260, damping: 20 }, // interactive
  gentle: { type: 'spring' as const, stiffness: 120, damping: 18 }, // page reveals
};

// Fade-Up (standard section reveal)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

// Stagger Container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger Child (for cards, list items)
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
};

// Footer Box (scale + fade)
export const footerBox: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
  },
};

// Text Reveal
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

// Interactive hover defaults
export const hoverSpring = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 340, damping: 22 },
};

// Slightly gentler hover for cards/boxes
export const hoverLift = {
  whileHover: {
    scale: 1.03,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
  whileTap: { scale: 0.98 },
};
