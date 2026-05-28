/**
 * FeaturedSystems — The "FEATURED SYSTEMS" section with horizontal card row.
 */

import { ChevronRight } from 'lucide-react';

import type { ProjectItem } from '../../../constants/projects.constants';

import { FeaturedCard } from './FeaturedCard';

interface FeaturedSystemsProps {
  projects: ProjectItem[];
}

export function FeaturedSystems({ projects }: FeaturedSystemsProps) {
  const featured = projects.filter((p) => p.isFeatured);

  return (
    <div className="proj-featured-section">
      {/* Section header */}
      <div className="proj-section-header">
        <div className="proj-section-label">
          <span>FEATURED SYSTEMS</span>
          <span className="proj-section-dot" aria-hidden="true" />
        </div>
        <a
          href="https://github.com/adityaxrawal"
          target="_blank"
          rel="noopener noreferrer"
          className="proj-view-all-link"
          aria-label="View all featured projects on GitHub"
        >
          View all featured
          <ChevronRight size={13} aria-hidden="true" />
        </a>
      </div>

      {/* Horizontal card row */}
      <div className="proj-featured-row" role="list">
        {featured.map((project) => (
          <div key={project.id} role="listitem">
            <FeaturedCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
