import { Rocket, Flag } from 'lucide-react';
import React from 'react';

import { WorkExperience, WorkExperienceItem } from '../../../data/workExperience';

interface JourneyOrbitProps {
  activeJob: number;
  setActiveJob: (index: number) => void;
  setDirection: (direction: number) => void;
}

const JourneyOrbit: React.FC<JourneyOrbitProps> = ({
  activeJob,
  setActiveJob,
  setDirection,
}) => {
  // Sort jobs in ascending chronological order (oldest to newest)
  const chronologicalJobs = [...WorkExperience].reverse();
  const totalJobs = WorkExperience.length;

  // Split jobs into left and right groups around the center rocket
  const half = Math.ceil(chronologicalJobs.length / 2);
  const leftJobs = chronologicalJobs.slice(0, half);
  const rightJobs = chronologicalJobs.slice(half);

  const renderJobNode = (job: WorkExperienceItem, chronoIdx: number) => {
    // Map chronological index back to original index in WorkExperience
    const originalIndex = totalJobs - 1 - chronoIdx;
    const isActive = activeJob === originalIndex;

    return (
      <div
        key={`job-${job.companyName}-${chronoIdx}`}
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
  };

  const renderCenterNode = () => (
    <div key="center-rocket" className="orbit-center-point">
      <svg
        viewBox="0 0 160 80"
        width="160"
        height="80"
        className="center-svg"
        aria-hidden="true"
      >
        {/* Left branch paths */}
        <path
          d="M 0,40 C 20,40 30,22.5 50,22.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
        <path
          d="M 0,40 C 20,40 30,57.5 50,57.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
        <circle cx="0" cy="40" r="1.5" fill="currentColor" />

        {/* Right branch paths */}
        <path
          d="M 160,40 C 140,40 130,22.5 110,22.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
        <path
          d="M 160,40 C 140,40 130,57.5 110,57.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
        <circle cx="160" cy="40" r="1.5" fill="currentColor" />

        {/* ── Revolving Group ── */}
        <g className="revolving-dots">
          <circle
            cx="80"
            cy="40"
            r="35"
            stroke="currentColor"
            strokeWidth="1"
            fill="var(--orbit-bg)"
          />

          {/* Connection dots on outer ring */}
          <circle
            cx="50"
            cy="22.5"
            r="2.5"
            fill="var(--orbit-bg)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="57.5"
            r="2.5"
            fill="var(--orbit-bg)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="22.5"
            r="2.5"
            fill="var(--orbit-bg)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="57.5"
            r="2.5"
            fill="var(--orbit-bg)"
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Top dot */}
          <circle
            cx="80"
            cy="5"
            r="2.5"
            fill="var(--orbit-bg)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* Inner ring */}
        <circle
          cx="80"
          cy="40"
          r="22"
          stroke="currentColor"
          strokeWidth="1"
          fill="var(--orbit-inner-bg)"
        />
      </svg>

      <div className="rocket-icon-abs">
        <Rocket size={18} />
      </div>
    </div>
  );

  const renderNextMissionNode = () => (
    <div key="next-mission" className="orbit-point orbit-point-next">
      <div className="orbit-dot dot-flag">
        <Flag size={10} className="flag-icon" />
      </div>
      <div className="orbit-info">
        <span className="orbit-date">Next Mission</span>
        <h4 className="orbit-company">Always building.</h4>
      </div>
    </div>
  );

  // Construct flat list of components to render with connectors in between
  const items: React.ReactNode[] = [];

  // 1. Add left jobs
  leftJobs.forEach((job, idx) => {
    items.push(renderJobNode(job, idx));
  });

  // 2. Add center rocket
  items.push(renderCenterNode());

  // 3. Add right jobs
  rightJobs.forEach((job, idx) => {
    items.push(renderJobNode(job, leftJobs.length + idx));
  });

  // 4. Add next mission
  items.push(renderNextMissionNode());

  return (
    <div className="journey-orbit-wrapper">
      <div className="journey-orbit-header">
        <span className="journey-orbit-label">MY JOURNEY ORBIT</span>
      </div>

      <div className="orbit-layout">
        {items.map((node, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="orbit-connector" />}
            {node}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JourneyOrbit;
