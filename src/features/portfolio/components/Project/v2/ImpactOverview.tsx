/**
 * ImpactOverview — 2×2 grid of impact stat cards in the right sidebar.
 * Stats: 13 Projects, 2 Live Systems, 1.2K+ Total Stars, 230+ Total Forks
 */

import { Box, Signal, Star, GitFork } from 'lucide-react';
import type { ReactNode } from 'react';

import { IMPACT_STATS } from '../../../constants/projects.constants';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  iconColor?: string;
}

function StatCard({
  icon,
  value,
  label,
  iconColor = 'currentColor',
}: StatCardProps) {
  return (
    <div className="proj-stat-card">
      <div
        className="proj-stat-icon"
        style={{ color: iconColor }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="proj-stat-value">{value}</div>
      <div className="proj-stat-label">{label}</div>
    </div>
  );
}

export function ImpactOverview() {
  return (
    <div className="proj-impact-section">
      {/* Section header */}
      <div className="proj-right-label">
        <span>IMPACT OVERVIEW</span>
        <span className="proj-right-dot" aria-hidden="true" />
      </div>

      {/* 2×2 grid */}
      <div className="proj-impact-grid">
        <StatCard
          icon={<Box size={18} strokeWidth={1.5} />}
          value={IMPACT_STATS.projects}
          label="Projects"
          iconColor="#8B7355"
        />
        <StatCard
          icon={<Signal size={18} strokeWidth={1.5} />}
          value={IMPACT_STATS.liveSystems}
          label="Live Systems"
          iconColor="#27AE60"
        />
        <StatCard
          icon={<Star size={18} strokeWidth={1.5} />}
          value={IMPACT_STATS.totalStars}
          label="Total Stars"
          iconColor="#F59E0B"
        />
        <StatCard
          icon={<GitFork size={18} strokeWidth={1.5} />}
          value={IMPACT_STATS.totalForks}
          label="Total Forks"
          iconColor="#7C3AED"
        />
      </div>
    </div>
  );
}
