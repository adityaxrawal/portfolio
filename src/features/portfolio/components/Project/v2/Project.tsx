/**
 * Project v2 — Main container for the Projects section.
 *
 * 3-column layout:
 *   Left (22%)   — ProjectHeader + FilterTabs (system status + quote)
 *   Center (52%) — FeaturedSystems + AllSystemsTable + GitHubCTA
 *   Right (26%)  — RightPanel (Impact + TechCloud + FocusAreas + Commits)
 */

import { useState, useMemo } from 'react';

import {
  PROJECTS,
  type ProjectStatus,
} from '../../../constants/projects.constants';

import { AllSystemsTable } from './AllSystemsTable';
import { FeaturedSystems } from './FeaturedSystems';
import type { FilterOption } from './FilterTabs';
import { FilterTabs } from './FilterTabs';
import { GitHubCTA } from './GitHubCTA';
import { ProjectHeader } from './ProjectHeader';
import { RightPanel } from './RightPanel';

import { useSharedState } from '@/app';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';

import './Project.css';

const Project = ({
  isActive: _isActive,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('ALL');

  // Filter projects by active tab — only affects the AllSystems table
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => p.status === (activeFilter as ProjectStatus));
  }, [activeFilter]);

  return (
    <div className={`proj-v2-section ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="proj-v2-container">
        {/* ── LEFT SIDEBAR ──────────────────────────────── */}
        <aside className="proj-v2-sidebar" aria-label="Projects navigation">
          <ProjectHeader />
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </aside>

        {/* ── CENTER PANEL ──────────────────────────────── */}
        <main className="proj-v2-center" aria-label="Projects content">
          <FeaturedSystems projects={filteredProjects} />
          <AllSystemsTable projects={filteredProjects} />
          <GitHubCTA />
        </main>

        {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
        <aside className="proj-v2-right" aria-label="Project metrics">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
};

export default Project;
