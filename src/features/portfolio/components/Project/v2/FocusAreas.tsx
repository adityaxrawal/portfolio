/**
 * FocusAreas — 4 focus area items with colored icon circles in the right sidebar.
 */

import { BarChart3, Zap, CreditCard, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

import { FOCUS_AREAS } from '../../../constants/projects.constants';

const ICON_MAP: Record<string, ReactNode> = {
  BarChart3: <BarChart3 size={16} strokeWidth={1.5} />,
  Zap: <Zap size={16} strokeWidth={1.5} />,
  CreditCard: <CreditCard size={16} strokeWidth={1.5} />,
  Wrench: <Wrench size={16} strokeWidth={1.5} />,
};

export function FocusAreas() {
  return (
    <div className="proj-focus-section">
      <div className="proj-right-label">
        <span>FOCUS AREAS</span>
        <span className="proj-right-dot" aria-hidden="true" />
      </div>

      <ul className="proj-focus-list">
        {FOCUS_AREAS.map((area) => (
          <li key={area.title} className="proj-focus-item">
            <div
              className="proj-focus-icon"
              style={{
                color: area.color,
                borderColor: `${area.color}30`,
                backgroundColor: `${area.color}12`,
              }}
              aria-hidden="true"
            >
              {ICON_MAP[area.iconName]}
            </div>
            <div className="proj-focus-text">
              <span className="proj-focus-title">{area.title}</span>
              <span className="proj-focus-subtitle">{area.subtitle}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
