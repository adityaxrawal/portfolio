/**
 * CloudDevOpsRow — Bottom 2-column row showing:
 *   Left:  CLOUD & DEVOPS — icon chips (AWS, Docker, CI/CD, Git, GitHub Actions, Terraform)
 *   Right: TOOLS & PRACTICES — icon chips (REST APIs, Microservices, Agile, JWT, Postman)
 */

import { Cloud as CloudIcon, Wrench } from 'lucide-react';

import {
  CLOUD_DEVOPS_ITEMS,
  TOOLS_PRACTICES_ITEMS,
  type ChipItem,
} from '../../../constants/technologyV2.constants';

function ChipGrid({ items }: { items: ChipItem[] }) {
  return (
    <div className="tech-v2-chip-grid">
      {items.map(({ name, icon: Icon, color }) => (
        <div key={name} className="tech-v2-chip" title={name.replace('\n', ' ')}>
          <div
            className="tech-v2-chip-icon-box-light"
            aria-label={name.replace('\n', ' ')}
          >
            <Icon size={24} style={{ color }} />
          </div>
          <span className="tech-v2-chip-label">{name}</span>
        </div>
      ))}
    </div>
  );
}

export function CloudDevOpsRow() {
  return (
    <div className="tech-v2-bottom-row">
      {/* Cloud & DevOps */}
      <div className="tech-v2-bottom-section">
        <div className="tech-v2-bottom-section-header">
          <span
            className="tech-v2-category-dot"
            style={{ borderColor: '#14B8A6' }}
            aria-hidden="true"
          />
          <span>CLOUD &amp; DEVOPS</span>
          <span className="tech-v2-bottom-section-icon" aria-hidden="true">
            <CloudIcon size={12} />
          </span>
        </div>
        <ChipGrid items={CLOUD_DEVOPS_ITEMS} />
      </div>

      {/* Tools & Practices */}
      <div className="tech-v2-bottom-section">
        <div className="tech-v2-bottom-section-header">
          <span
            className="tech-v2-category-dot"
            style={{ borderColor: '#6B7280' }}
            aria-hidden="true"
          />
          <span>TOOLS &amp; PRACTICES</span>
          <span className="tech-v2-bottom-section-icon" aria-hidden="true">
            <Wrench size={12} />
          </span>
        </div>
        <ChipGrid items={TOOLS_PRACTICES_ITEMS} />
      </div>
    </div>
  );
}
