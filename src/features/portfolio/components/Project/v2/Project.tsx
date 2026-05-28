/**
 * Project v2 — Main container for the Projects section.
 *
 * 3-column layout:
 *   Left (22%)   — ProjectHeader + FilterTabs (system status + quote)
 *   Center (52%) — FeaturedSystems + AllSystemsTable + GitHubCTA
 *   Right (26%)  — RightPanel (Impact + TechCloud + FocusAreas + Commits)
 */

import { motion } from 'framer-motion';
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
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations';

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
    <motion.div
      className={`proj-v2-section ${isDarkTheme ? 'dark' : 'light'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      <motion.div className="proj-v2-container" variants={staggerContainer}>
        {/* ── LEFT SIDEBAR ──────────────────────────────── */}
        <motion.aside
          className="proj-v2-sidebar"
          aria-label="Projects navigation"
          variants={staggerChild}
        >
          <ProjectHeader />
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.aside>

        {/* ── CENTER PANEL ──────────────────────────────── */}
        <motion.main
          className="proj-v2-center"
          aria-label="Projects content"
          variants={staggerChild}
        >
          <FeaturedSystems projects={filteredProjects} />
          <AllSystemsTable projects={filteredProjects} />
          <GitHubCTA />
        </motion.main>

        {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
        <motion.aside
          className="proj-v2-right"
          aria-label="Project metrics"
          variants={staggerChild}
        >
          <RightPanel />
        </motion.aside>
      </motion.div>
    </motion.div>
  );
};

export default Project;
