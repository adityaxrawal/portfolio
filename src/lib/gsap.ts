/**
 * @file gsap.ts
 * @description Central GSAP import and configuration.
 * Import from this module — do NOT import gsap directly in components.
 *
 * Usage:
 *   import { gsap, fadeInUp, splitChars } from '@/lib/gsap';
 */

import gsap from 'gsap';

// ── Register core plugins (safe to call multiple times) ──────────────────────
// Note: ScrollTrigger is intentionally NOT registered here because the
// SnapLayout intercepts scroll events. We use GSAP timelines driven by
// Framer Motion's `useInView` hooks instead.

// ── Easing Presets ───────────────────────────────────────────────────────────
export const gsapEase = {
  /** Smooth page-level reveals */
  smooth: 'power3.out',
  /** Snappy interactive feedback */
  snappy: 'power4.out',
  /** Elastic snap-back (for magnetic effects) */
  elastic: 'elastic.out(1, 0.3)',
  /** Gentle sine for loops */
  sine: 'sine.inOut',
  /** Overshoot for counters */
  expo: 'expo.out',
} as const;

// ── Utility: animate a counter from 0 to target ─────────────────────────────
export function animateCounter(
  element: HTMLElement,
  target: number,
  suffix = '',
  duration = 1.5,
): gsap.core.Tween {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration,
    ease: gsapEase.expo,
    onUpdate() {
      const formatted =
        target >= 1000
          ? `${(obj.val / 1000).toFixed(1)}K+`
          : `${Math.round(obj.val)}${suffix}`;
      element.textContent = formatted;
    },
  });
}

// ── Utility: split element text into character spans ─────────────────────────
export function splitIntoChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent ?? '';
  element.textContent = '';
  element.setAttribute('aria-label', text);

  return Array.from(text).map((char) => {
    const span = document.createElement('span');
    span.className = 'gsap-char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    element.appendChild(span);
    return span;
  });
}

// ── Utility: build a fade-up stagger timeline for an array of elements ───────
export function buildFadeUpTimeline(
  elements: HTMLElement[] | NodeListOf<Element>,
  opts?: { delay?: number; stagger?: number; duration?: number },
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: gsapEase.smooth } });
  tl.fromTo(
    Array.from(elements),
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: opts?.duration ?? 0.55,
      stagger: opts?.stagger ?? 0.07,
      delay: opts?.delay ?? 0,
    },
  );
  return tl;
}

export { gsap };
export default gsap;
