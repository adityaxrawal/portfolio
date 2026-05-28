/**
 * SkillCategory — Renders one vertical column of the 4-column skills grid.
 * Shows: category label + colored dot + category icon header row,
 *        then a list of skill items (brand icon + name).
 */

import type { SkillCategory as SkillCategoryType } from '../../../constants/technologyV2.constants';

interface SkillCategoryProps {
  category: SkillCategoryType;
}

export function SkillCategory({ category }: SkillCategoryProps) {
  const { label, dotColor, categoryIcon: CategoryIcon, skills } = category;

  return (
    <div className="tech-v2-category">
      {/* Category header */}
      <div className="tech-v2-category-header">
        <div className="tech-v2-category-label" style={{ color: dotColor }}>
          <span
            className="tech-v2-category-dot"
            style={{ borderColor: dotColor }}
            aria-hidden="true"
          />
          {label}
        </div>
        <span
          className="tech-v2-category-icon"
          aria-hidden="true"
          style={{ color: dotColor, opacity: 0.65 }}
        >
          <CategoryIcon size={16} strokeWidth={1.5} />
        </span>
      </div>

      {/* Skill items */}
      {skills.map(({ name, icon: SkillIcon, color }) => (
        <div key={name} className="tech-v2-skill-item">
          <span className="tech-v2-skill-icon" aria-hidden="true" title={name}>
            <SkillIcon size={32} style={{ color }} />
          </span>
          <span className="tech-v2-skill-name">{name}</span>
        </div>
      ))}
    </div>
  );
}
