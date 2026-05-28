import { memo } from 'react';

import type { WorkExperienceItem } from '../../../constants/workExperience';

interface OrbitJobNodeProps {
  job: WorkExperienceItem;
  originalIndex: number;
  activeJob: number;
  setActiveJob: (index: number) => void;
  setDirection: (direction: number) => void;
}

export const OrbitJobNode = memo(function OrbitJobNode({
  job,
  originalIndex,
  activeJob,
  setActiveJob,
  setDirection,
}: OrbitJobNodeProps) {
  const isActive = activeJob === originalIndex;

  return (
    <div
      className={`orbit-point ${isActive ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (originalIndex > activeJob) setDirection(1);
        else if (originalIndex < activeJob) setDirection(-1);
        setActiveJob(originalIndex);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (originalIndex > activeJob) setDirection(1);
          else if (originalIndex < activeJob) setDirection(-1);
          setActiveJob(originalIndex);
        }
      }}
      aria-label={`View experience at ${job.companyName}`}
    >
      <div
        className={`orbit-dot ${job.orbitShadowClass || ''}`}
        style={{ backgroundColor: job.orbitColor }}
      />
      <div className="orbit-info">
        <span className="orbit-date">{job.years}</span>
        <h4 className="orbit-company">{job.companyName}</h4>
      </div>
    </div>
  );
});
