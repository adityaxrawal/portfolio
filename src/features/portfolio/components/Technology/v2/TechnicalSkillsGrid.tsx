/**
 * TechnicalSkillsGrid — Main skills section in the left panel.
 *   - Section label "TECHNICAL SKILLS" with black dot
 *   - 4-column grid: Languages | Frontend | Backend | Data & Database
 *   - 2-column bottom row: Cloud & DevOps | Tools & Practices
 *
 * GSAP stagger entrance: skill category cards slide in with scale + fade
 * when the section enters viewport.
 */

import { useInView, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { SKILL_CATEGORIES } from '../../../constants/technologyV2.constants';

import { CloudDevOpsRow } from './CloudDevOpsRow';
import { SkillCategory } from './SkillCategory';

export function TechnicalSkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    hasAnimated.current = true;
    const cards = container.querySelectorAll('[role="listitem"]');
    const cloudRow = container.querySelector('.tech-v2-cloud-row, .cloud-devops-row');

    if (cards.length) {
      gsap.fromTo(
        cards,
        { scale: 0.92, opacity: 0, y: 16 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.1,
        },
      );
    }

    if (cloudRow) {
      gsap.fromTo(
        cloudRow,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.4 },
      );
    }
  }, [isInView, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="tech-v2-skills-outer-card">
      {/* Section header */}
      <div className="tech-v2-skills-header">
        <div className="tech-v2-label-row">
          <span className="tech-v2-dot-black" aria-hidden="true" />
          <span>TECHNICAL SKILLS</span>
        </div>
      </div>

      {/* 4-column grid */}
      <div
        className="tech-v2-category-grid"
        role="list"
        aria-label="Technical skills by category"
      >
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.id} role="listitem">
            <SkillCategory category={category} />
          </div>
        ))}
      </div>

      {/* Horizontal divider */}
      <div className="tech-v2-skills-divider-h" aria-hidden="true" />

      {/* Bottom 2-column chip row */}
      <CloudDevOpsRow />
    </div>
  );
}
