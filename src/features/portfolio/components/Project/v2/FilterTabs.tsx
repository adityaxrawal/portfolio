/**
 * FilterTabs — Horizontal filter tab row + System Status legend + terminal personality quote.
 * Located in the left sidebar of the Projects v2 section.
 */

import type { ProjectStatus } from '../../../constants/projects.constants';
import { STATUS_COUNTS } from '../../../constants/projects.constants';

export type FilterOption = 'ALL' | ProjectStatus;

interface FilterTabsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const TABS: Array<{ key: FilterOption; label: string }> = [
  { key: 'ALL', label: 'All Systems' },
  { key: 'LIVE', label: 'Live' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'EXPERIMENTAL', label: 'Experimental' },
  { key: 'ARCHIVED', label: 'Archived' },
];

const STATUS_DISPLAY: Array<{
  key: ProjectStatus;
  label: string;
  dotClass: string;
}> = [
  { key: 'LIVE', label: 'Live', dotClass: 'proj-dot-live' },
  { key: 'IN_PROGRESS', label: 'In Progress', dotClass: 'proj-dot-progress' },
  {
    key: 'EXPERIMENTAL',
    label: 'Experimental',
    dotClass: 'proj-dot-experimental',
  },
  { key: 'ARCHIVED', label: 'Archived', dotClass: 'proj-dot-archived' },
];

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="proj-filter-section">
      {/* Tab row */}
      <div
        className="proj-filter-bar"
        role="tablist"
        aria-label="Project filter"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeFilter === tab.key}
            className={`proj-tab-btn ${activeFilter === tab.key ? 'proj-tab-active' : ''}`}
            onClick={() => onFilterChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* System Status legend */}
      <div className="proj-status-panel">
        <div className="proj-panel-label">
          <span>SYSTEM STATUS</span>
          {/* small activity icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className="proj-panel-icon"
          >
            <polyline
              points="1,5 3,2 5,7 7,3 9,5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <ul className="proj-status-list">
          {STATUS_DISPLAY.map(({ key, label, dotClass }) => (
            <li key={key} className="proj-status-item">
              <span
                className={`proj-status-dot ${dotClass}`}
                aria-hidden="true"
              />
              <span className="proj-status-label">{label}</span>
              <span className="proj-status-count">{STATUS_COUNTS[key]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Personality quote — terminal style */}
      <div className="proj-quote-box" aria-label="Personal motto">
        <div className="proj-quote-prefix" aria-hidden="true">
          &gt;_
        </div>
        <div className="proj-quote-lines">
          <span>I build in public.</span>
          <span>I learn by shipping.</span>
          <span>I iterate constantly.</span>
        </div>
        <span className="proj-quote-cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
