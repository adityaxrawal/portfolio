/**
 * TechnologyCloud — Wrapped flex tag cloud of all technologies used across projects.
 */

import { TECH_CLOUD } from '../../../constants/projects.constants';

import { TECH_ICONS } from './TechBadge';

export function TechnologyCloud() {
  return (
    <div className="proj-tech-cloud-section">
      <div className="proj-right-label">
        <span>TECHNOLOGY CLOUD</span>
        <span className="proj-right-dot" aria-hidden="true" />
      </div>

      <div className="proj-cloud-tags">
        {TECH_CLOUD.map(({ name, color }) => {
          const IconComponent = TECH_ICONS[name];

          return (
            <span key={name} className="proj-cloud-tag">
              {IconComponent ? (
                <span
                  className="proj-cloud-icon"
                  aria-hidden="true"
                  style={{ color }}
                >
                  <IconComponent size={12} />
                </span>
              ) : (
                <span
                  className="proj-cloud-dot"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              )}
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
