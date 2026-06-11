/**
 * CoreStrengths — Right sidebar panel listing 6 core engineering strengths.
 * Each item: square icon box + bold title + description.
 */

import { CORE_STRENGTHS } from '../../../constants/technologyV2.constants';
import { RevealTextBody } from '@/components/ui/Animations';

export function CoreStrengths() {
  return (
    <>
      {/* Section label */}
      <div
        className="tech-v2-strengths-header"
        aria-label="Core Strengths section"
      >
        <span className="tech-v2-dot-black" aria-hidden="true" />
        <span>CORE STRENGTHS</span>
      </div>

      {/* Strength list */}
      <ul className="tech-v2-strengths-list">
        {CORE_STRENGTHS.map(({ icon: Icon, title, desc }, idx) => (
          <RevealTextBody 
            key={title} 
            delay={0.3 + idx * 0.1} 
            as="li" 
            className="tech-v2-strength-item"
          >
            {/* Icon square */}
            <div className="tech-v2-strength-icon-bare" aria-hidden="true">
              <Icon size={24} strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div className="tech-v2-strength-text">
              <span className="tech-v2-strength-title">{title}</span>
              <span className="tech-v2-strength-desc">{desc}</span>
            </div>
          </RevealTextBody>
        ))}
      </ul>
    </>
  );
}
