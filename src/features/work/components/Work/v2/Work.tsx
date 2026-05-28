import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';

import {
  WorkExperience,
  type WorkExperienceItem,
} from '../../../constants/workExperience';

import JobContent from './JobContent/JobContent';
import JourneyOrbit from './JourneyOrbit';
import { MissionControl } from './MissionControl';
import { useWorkSectionScroll } from './useWorkSectionScroll';
import { WorkHeader } from './WorkHeader';

import { useSharedState } from '@/app';
import { useSnapScrollActiveIndex } from '@/components/ui/SnapLayout';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import { fadeUp } from '@/lib/animations';

import './Work.css';

// Module-level constant — no dependencies, no reason to re-create on every render.
// REFACTOR: Moved from inside the component body where it was recreated every render.
const CONTENT_VARIANTS = {
  enter: (direction: number) => ({
    y: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
} as const;

const Work = ({
  isActive: _isActive,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();
  const [activeJob, setActiveJob] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalJobs = WorkExperience.length;
  const { lastSnapTime } = useWorkSectionScroll({
    containerRef,
    totalJobs,
    activeJob,
    setActiveJob,
    setDirection,
  });

  // Hook into global scroll to set correct entry job
  const globalActiveIndex = useSnapScrollActiveIndex();
  const previousGlobalIndex = useRef(globalActiveIndex);

  useEffect(() => {
    if (globalActiveIndex === 1 && previousGlobalIndex.current !== 1) {
      // Transitioned INTO Work section — reset momentum guard.
      // lastSnapTime is a stable ref; it doesn't need to be in the dep array.
      lastSnapTime.current = Date.now();

      if (previousGlobalIndex.current < 1) {
        // Coming from Hero
        setActiveJob(0);
        setDirection(1);
      } else if (previousGlobalIndex.current > 1) {
        // Coming from Scriptology or below
        setActiveJob(totalJobs - 1);
        setDirection(-1);
      }
    }
    previousGlobalIndex.current = globalActiveIndex;
  }, [globalActiveIndex, totalJobs]); // eslint-disable-line react-hooks/exhaustive-deps
  // ↑ lastSnapTime.current intentionally omitted — it's a stable ref mutation, not state

  const handleJobSelect = useCallback(
    (idx: number) => {
      if (idx > activeJob) setDirection(1);
      else if (idx < activeJob) setDirection(-1);
      setActiveJob(idx);
      lastSnapTime.current = Date.now();
    },
    [activeJob, lastSnapTime],
  );

  return (
    <motion.div
      className={`work-v2-section ${isDarkTheme ? 'dark' : 'light'}`}
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      <div className="work-v2-mobile-header">
        <div className="work-v2-mobile-header-left">
          <span className="work-v2-mobile-label">WORK EXPERIENCE •</span>
          <span className="work-v2-mobile-title">Systems in Production</span>
        </div>
        <div className="work-v2-mobile-header-right">
          I design, build and ship systems that solve real problems and create
          measurable impact at scale.
        </div>
      </div>

      <div className="work-v2-container">
        {/* SIDEBAR */}
        <div className="work-v2-sidebar">
          <WorkHeader />
          <MissionControl
            jobs={WorkExperience}
            activeJob={activeJob}
            onJobSelect={handleJobSelect}
          />
        </div>

        {/* CONTENT AREA */}
        <div className="work-v2-content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeJob}
              custom={direction}
              variants={CONTENT_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="work-v2-content-details"
            >
              <JobContent
                job={WorkExperience[activeJob] as WorkExperienceItem}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE ONLY: Carousel */}
      <div className="work-v2-mobile-carousel-container">
        <div className="work-v2-mobile-carousel" id="work-mobile-carousel">
          {WorkExperience.map((job) => (
            <div className="work-v2-mobile-card-wrapper" key={job.companyName}>
              <JobContent job={job as WorkExperienceItem} />
            </div>
          ))}
        </div>
      </div>

      <JourneyOrbit
        activeJob={activeJob}
        setActiveJob={setActiveJob}
        setDirection={setDirection}
      />
    </motion.div>
  );
};

export default Work;
