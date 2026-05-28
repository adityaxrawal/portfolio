/**
 * MissionControl component - Timeline sidebar for work experience.
 *
 * Responsibility: Displays company timeline with clickable job cards.
 * Extracted from Work.tsx to improve component composability.
 */
import { Activity } from 'lucide-react';

import type { WorkExperienceItem } from '../../../constants/workExperience';

import { getCompanyDetails } from './companyTheme';

interface MissionControlProps {
  jobs: WorkExperienceItem[];
  activeJob: number;
  onJobSelect: (index: number) => void;
}

export function MissionControl({
  jobs,
  activeJob,
  onJobSelect,
}: MissionControlProps) {
  return (
    <div className="work-v2-mission-control">
      <div className="mc-header">
        <div className="mc-label">
          <span>MISSION CONTROL</span>
          <span className="mc-dot"></span>
        </div>
        <Activity size={10} className="mc-icon" aria-hidden="true" />
      </div>

      <div className="mc-timeline-container">
        {jobs.map((job: WorkExperienceItem, idx: number) => {
          const details = getCompanyDetails(job.companyName);
          const isActive = activeJob === idx;

          return (
            // REFACTOR: Using <button> instead of div[role=button] provides
            // keyboard handling, focus management, and ARIA semantics for free.
            // CSS reset for button styles is in Work.css (.mc-timeline-item button reset).
            <button
              type="button"
              key={job.companyName}
              className={`mc-timeline-item ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onJobSelect(idx)}
            >
              {/* Left border indicator */}
              <div className="mc-indicator-wrapper">
                {isActive ? (
                  <div
                    className={`mc-indicator-active ${details.indicatorClass}`}
                  />
                ) : (
                  <div className="mc-indicator-inactive" />
                )}
              </div>

              {/* Number */}
              <div className={`mc-number ${details.numColorClass}`}>
                0{idx + 1}
              </div>

              {/* Right Area: Card */}
              <div
                className={`mc-card ${isActive ? details.activeBgClass : ''}`}
              >
                <div className="mc-card-info">
                  <div className="mc-logo-wrapper">{details.icon}</div>
                  <div className="mc-text-wrapper">
                    <h4>{job.companyName}</h4>
                    <p>{job.title}</p>
                  </div>
                </div>
                <div className={`mc-badge ${details.badgeClass}`}>
                  {details.badgeText}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
