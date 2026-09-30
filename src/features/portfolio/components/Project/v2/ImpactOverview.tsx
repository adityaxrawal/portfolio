/**
 * ImpactOverview — 2×2 grid of impact stat cards in the right sidebar.
 * Stats: 13 Projects, 2 Live Systems, 1.2K+ Total Stars, 230+ Total Forks
 * Uses GSAP to animate counters from 0 to target when section enters viewport.
 */

import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { Box, Signal, Star, GitFork } from 'lucide-react';
import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

import { IMPACT_STATS } from '../../../constants/projects.constants';

// Numeric values for counter animation (strings are handled separately)
const COUNTER_TARGETS = {
  projects: 13,
  liveSystems: 2,
  totalStars: 1200, // 1.2K+
  totalForks: 230,  // 230+
};

interface StatCardProps {
  icon: ReactNode;
  label: string;
  iconColor?: string;
  numericTarget: number;
  /** Formatter to turn the animated number into the display string */
  format: (n: number) => string;
}

function AnimatedStatCard({
  icon,
  label,
  iconColor = 'currentColor',
  numericTarget,
  format,
  triggered,
}: StatCardProps & { triggered: boolean }) {
  const valueRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!triggered || hasAnimated.current) return;
    const el = valueRef.current;
    if (!el) return;

    hasAnimated.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericTarget,
      duration: 1.6,
      ease: 'expo.out',
      onUpdate() {
        el.textContent = format(Math.round(obj.val));
      },
    });
  }, [triggered, numericTarget, format]);

  return (
    <div className="proj-stat-card">
      <div
        className="proj-stat-icon"
        style={{ color: iconColor }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div ref={valueRef} className="proj-stat-value">
        {format(0)}
      </div>
      <div className="proj-stat-label">{label}</div>
    </div>
  );
}

export function ImpactOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="proj-impact-section">
      {/* Section header */}
      <div className="proj-right-label">
        <span>IMPACT OVERVIEW</span>
        <span className="proj-right-dot" aria-hidden="true" />
      </div>

      {/* 2×2 grid */}
      <div className="proj-impact-grid">
        <AnimatedStatCard
          icon={<Box size={18} strokeWidth={1.5} />}
          numericTarget={COUNTER_TARGETS.projects}
          format={(n) => String(n)}
          label="Projects"
          iconColor="#8B7355"
          triggered={isInView}
        />
        <AnimatedStatCard
          icon={<Signal size={18} strokeWidth={1.5} />}
          numericTarget={COUNTER_TARGETS.liveSystems}
          format={(n) => String(n)}
          label="Live Systems"
          iconColor="#27AE60"
          triggered={isInView}
        />
        <AnimatedStatCard
          icon={<Star size={18} strokeWidth={1.5} />}
          numericTarget={COUNTER_TARGETS.totalStars}
          format={(n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K+` : `${n}+`)}
          label="Total Stars"
          iconColor="#F59E0B"
          triggered={isInView}
        />
        <AnimatedStatCard
          icon={<GitFork size={18} strokeWidth={1.5} />}
          numericTarget={COUNTER_TARGETS.totalForks}
          format={(n) => `${n}+`}
          label="Total Forks"
          iconColor="#7C3AED"
          triggered={isInView}
        />
      </div>
    </div>
  );
}

// Suppress unused import warning — IMPACT_STATS kept for type safety reference
void IMPACT_STATS;
