/**
 * FeaturedCard — Individual featured project card.
 * - Equal fixed-width cards for perfect alignment in the row
 * - TechIconRow: 3 icon badges (colored 2-letter chips), no text pills
 * - Area chart sparkline (gradient fill)
 * - Uniform description height via line-clamp
 */

import {
  Star,
  GitFork,
  Clock,
  LineChart,
  TrendingUp,
  Zap,
  CreditCard,
  Rocket,
} from 'lucide-react';
import type { ComponentType } from 'react';

import type { ProjectItem } from '../../../constants/projects.constants';

import { ProjectSparkline } from './ProjectSparkline';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import { TechIconRow } from './TechBadge';

const SPARKLINE_COLOR: Record<string, string> = {
  LIVE: '#27AE60',
  IN_PROGRESS: '#F97316',
  EXPERIMENTAL: '#3B82F6',
  ARCHIVED: '#9CA3AF',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CARD_ICON: Record<string, ComponentType<any>> = {
  'financial-tracker': LineChart,
  'trade-simulator': TrendingUp,
  'realtime-market-events': Zap,
  'credit-cards-dashboard': CreditCard,
};

interface FeaturedCardProps {
  project: ProjectItem;
}

export function FeaturedCard({ project }: FeaturedCardProps) {
  const sparkColor = SPARKLINE_COLOR[project.status] ?? '#27AE60';
  const IconComponent = CARD_ICON[project.id] ?? Rocket;

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-featured-card"
      aria-label={`View ${project.name} on GitHub`}
    >
      {/* Header: icon left, status badge right */}
      <div className="proj-fc-header">
        <span className="proj-fc-icon" aria-hidden="true">
          <IconComponent size={24} strokeWidth={1.5} />
        </span>
        <ProjectStatusBadge status={project.status} />
      </div>

      {/* Title — clamped to 2 lines */}
      <h3 className="proj-fc-title">{project.name}</h3>

      {/* Description — clamped to 3 lines for uniform card height */}
      <p className="proj-fc-desc">{project.description}</p>

      {/* Area chart sparkline */}
      <div className="proj-fc-sparkline">
        <ProjectSparkline
          data={project.sparklineData}
          color={sparkColor}
          width={160}
          height={32}
        />
      </div>

      {/* Tech icons — 5 max, colored 2-letter chips */}
      <TechIconRow stack={project.stack} max={5} />

      {/* Meta: stars, forks, time */}
      <div className="proj-fc-meta">
        {project.stars !== undefined && (
          <span className="proj-fc-meta-item">
            <Star size={11} aria-hidden="true" />
            {project.stars}
          </span>
        )}
        {project.forks !== undefined && (
          <span className="proj-fc-meta-item">
            <GitFork size={11} aria-hidden="true" />
            {project.forks}
          </span>
        )}
        <span className="proj-fc-meta-item proj-fc-time">
          <Clock size={11} aria-hidden="true" />
          {project.lastActivity}
        </span>
      </div>
    </a>
  );
}
