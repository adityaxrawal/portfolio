/**
 * TechnicalSkillsGrid — Main skills section in the left panel.
 *   - Section label "TECHNICAL SKILLS" with black dot
 *   - 4-column grid: Languages | Frontend | Backend | Data & Database
 *   - 2-column bottom row: Cloud & DevOps | Tools & Practices
 */

import { SKILL_CATEGORIES } from '../../../constants/technologyV2.constants';

import { CloudDevOpsRow } from './CloudDevOpsRow';
import { SkillCategory } from './SkillCategory';

export function TechnicalSkillsGrid() {
  return (
    <div className="tech-v2-skills-outer-card">
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
