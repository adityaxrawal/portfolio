/**
 * AllSystemsTable — "ALL SYSTEMS LAB" table.
 * Stack column: icon dots only (colored circles with 2-letter abbr), max 3, no text labels.
 */

import {
  ChevronRight,
  BarChart2,
  Monitor,
  Bot,
  Users,
  TrendingDown,
  ShoppingCart,
  Rocket,
} from 'lucide-react';
import type { ComponentType } from 'react';

import type { ProjectItem } from '../../../constants/projects.constants';

import { ProjectSparkline } from './ProjectSparkline';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import { TechDotRow } from './TechBadge';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TABLE_ICONS: Record<string, ComponentType<any>> = {
  'delta-exchange-dashboard': BarChart2,
  'macos-battery-monitor': Monitor,
  'antigravity-quota-monitor': Bot,
  'user-management-api': Users,
  'stock-data-filtering': TrendingDown,
  'ecommerce-app': ShoppingCart,
};

const SPARKLINE_COLOR: Record<string, string> = {
  LIVE: '#27AE60',
  IN_PROGRESS: '#F97316',
  EXPERIMENTAL: '#3B82F6',
  ARCHIVED: '#9CA3AF',
};

interface AllSystemsTableProps {
  projects: ProjectItem[];
}

export function AllSystemsTable({ projects }: AllSystemsTableProps) {
  const nonFeatured = projects.filter((p) => !p.isFeatured);

  return (
    <div className="proj-table-section">
      {/* Section header */}
      <div className="proj-section-header">
        <div className="proj-section-label">
          <span>ALL SYSTEMS LAB</span>
          <span className="proj-section-dot" aria-hidden="true" />
        </div>
        <a
          href="https://github.com/adityaxrawal"
          target="_blank"
          rel="noopener noreferrer"
          className="proj-view-all-link"
          aria-label="Explore all systems on GitHub"
        >
          Explore all systems
          <ChevronRight size={13} aria-hidden="true" />
        </a>
      </div>

      {/* Table */}
      <div className="proj-table" role="table" aria-label="All systems">
        {/* Table header */}
        <div className="proj-table-head" role="row">
          <span className="proj-th proj-th-system" role="columnheader">
            SYSTEM
          </span>
          <span className="proj-th proj-th-type" role="columnheader">
            TYPE
          </span>
          <span className="proj-th proj-th-stack" role="columnheader">
            STACK
          </span>
          <span className="proj-th proj-th-status" role="columnheader">
            STATUS
          </span>
          <span className="proj-th proj-th-activity" role="columnheader">
            LAST ACTIVITY
          </span>
        </div>

        {/* Rows */}
        {nonFeatured.map((project) => {
          const IconComponent = TABLE_ICONS[project.id] ?? Rocket;
          const sparkColor = SPARKLINE_COLOR[project.status] ?? '#27AE60';

          return (
            <a
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-table-row"
              role="row"
              aria-label={`${project.name} — ${project.status}`}
            >
              {/* System: icon + name + desc */}
              <div className="proj-td proj-td-system" role="cell">
                <span className="proj-row-icon" aria-hidden="true">
                  <IconComponent size={20} strokeWidth={1.5} />
                </span>
                <div className="proj-row-info">
                  <span className="proj-row-name">{project.name}</span>
                  <span className="proj-row-desc">{project.description}</span>
                </div>
              </div>

              {/* Type */}
              <div className="proj-td proj-td-type" role="cell">
                <span className="proj-type-label">{project.type ?? '—'}</span>
              </div>

              {/* Stack — icon dots only, no labels, max 3 */}
              <div className="proj-td proj-td-stack" role="cell">
                <TechDotRow stack={project.stack} max={3} />
              </div>

              {/* Status */}
              <div className="proj-td proj-td-status" role="cell">
                <ProjectStatusBadge status={project.status} />
              </div>

              {/* Last Activity */}
              <div className="proj-td proj-td-activity" role="cell">
                <ProjectSparkline
                  data={project.sparklineData}
                  color={sparkColor}
                  width={48}
                  height={18}
                />
                <span className="proj-activity-time">
                  {project.lastActivity}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
