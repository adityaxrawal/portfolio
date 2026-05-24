import { motion, AnimatePresence } from 'framer-motion';
import { Activity, FlaskConical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import {
  WorkExperience,
  WorkExperienceItem,
} from '../../../data/workExperience';

import JobContent from './JobContent';
import JourneyOrbit from './JourneyOrbit';

import { useSharedState } from '@/app/providers/AppContext';
import { useSnapScroll } from '@/components/layout/SnapLayout/SnapScrollContext';
import type { SlideProps } from '@/types/slides';

import './Work.css';

const getCompanyDetails = (companyName: string) => {
  switch (companyName) {
    case 'MathCo':
      return {
        icon: (
          <span className="font-serif text-[#F0ECD8] font-bold text-xl md:text-2xl pt-1">
            M
          </span>
        ),
        badgeText: 'LIVE >',
        badgeClass: 'mc-badge-live',
        numColorClass: 'mc-num-live',
        activeBgClass: 'mc-card-active-live',
        indicatorClass: 'mc-indicator-live',
      };
    case 'Leadsquared':
      return {
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F0ECD8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path d="M9 21H3V15" />
            <path d="M10 14L21 3" />
            <path d="M16 3H21V8" />
          </svg>
        ),
        badgeText: 'SCALED',
        badgeClass: 'mc-badge-scaled',
        numColorClass: 'mc-num-scaled',
        activeBgClass: 'mc-card-active-scaled',
        indicatorClass: 'mc-indicator-scaled',
      };
    case 'DevelUp':
      return {
        icon: <FlaskConical size={22} color="#F0ECD8" strokeWidth={2} />,
        badgeText: 'LEARNING',
        badgeClass: 'mc-badge-learning-blue',
        numColorClass: 'mc-num-learning-blue',
        activeBgClass: 'mc-card-active-learning-blue',
        indicatorClass: 'mc-indicator-learning-blue',
      };
    case 'Wipro':
      return {
        icon: (
          <span className="text-[#F0ECD8] font-bold text-[12px] md:text-[14px] tracking-wide">
            wipro
          </span>
        ),
        badgeText: 'LEARNING',
        badgeClass: 'mc-badge-learning-purple',
        numColorClass: 'mc-num-learning-purple',
        activeBgClass: 'mc-card-active-learning-purple',
        indicatorClass: 'mc-indicator-learning-purple',
      };
    default:
      return {
        icon: <span className="text-[#F0ECD8] font-bold">?</span>,
        badgeText: 'PAST',
        badgeClass: 'mc-badge-past',
        numColorClass: 'mc-num-past',
        activeBgClass: '',
        indicatorClass: '',
      };
  }
};

const Work = ({
  isActive: _isActive,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();
  const [activeJob, setActiveJob] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSnapTime = useRef(Date.now());
  const touchStartY = useRef<number | null>(null);

  const totalJobs = WorkExperience.length;
  const activeJobRef = useRef(activeJob);

  // Hook into global scroll to set correct entry job
  const { activeIndex: globalActiveIndex } = useSnapScroll();
  const previousGlobalIndex = useRef(globalActiveIndex);

  useEffect(() => {
    if (globalActiveIndex === 1 && previousGlobalIndex.current !== 1) {
      // Transitioned INTO Work section - reset momentum guard
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
  }, [globalActiveIndex, totalJobs]);

  useEffect(() => {
    activeJobRef.current = activeJob;
  }, [activeJob]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTime.current;

      if (timeSinceLastSnap < 1000) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (Math.abs(e.deltaY) < 10) return;

      const currentJob = activeJobRef.current;

      if (e.deltaY > 0) {
        if (currentJob < totalJobs - 1) {
          e.preventDefault();
          e.stopPropagation();
          setDirection(1);
          setActiveJob(currentJob + 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      } else if (e.deltaY < 0) {
        if (currentJob > 0) {
          e.preventDefault();
          e.stopPropagation();
          setDirection(-1);
          setActiveJob(currentJob - 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTime.current;

      if (timeSinceLastSnap < 1000) {
        e.stopPropagation();
        return;
      }

      if (Math.abs(deltaY) < 20) return;

      const currentJob = activeJobRef.current;

      if (deltaY > 0) {
        if (currentJob < totalJobs - 1) {
          e.stopPropagation();
          setDirection(1);
          setActiveJob(currentJob + 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      } else if (deltaY < 0) {
        if (currentJob > 0) {
          e.stopPropagation();
          setDirection(-1);
          setActiveJob(currentJob - 1);
          lastSnapTime.current = Date.now();
        } else {
          lastSnapTime.current = Date.now();
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [totalJobs]);

  const contentVariants = {
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
  };

  return (
    <div
      className={`work-v2-section ${isDarkTheme ? 'dark' : 'light'}`}
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    >
      <div className="work-v2-container">
        {/* SIDEBAR */}
        <div className="work-v2-sidebar">
          {/* Header Section */}
          <div className="work-v2-header">
            <div className="work-v2-label">
              <span>WORK EXPERIENCE</span>
              <span className="work-v2-dot"></span>
            </div>

            <div className="work-v2-title-wrapper">
              <span className="work-v2-title">Systems in</span>
              <span className="work-v2-title-highlight">
                Production
                <svg
                  className="work-v2-underline"
                  viewBox="0 0 200 9"
                  fill="none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 6.5C48.5 2.5 130.5 -1.5 197.5 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <span className="work-v2-subtitle">
              I design, build and ship systems that
              <br />
              solve real problems and create measurable
              <br />
              impact at scale.
            </span>
          </div>

          {/* Mission Control Panel */}
          <div className="work-v2-mission-control">
            <div className="mc-header">
              <div className="mc-label">
                <span>MISSION CONTROL</span>
                <span className="mc-dot"></span>
              </div>
              <Activity size={10} className="mc-icon" />
            </div>

            <div className="mc-timeline-container">
              {WorkExperience.map((job: WorkExperienceItem, idx: number) => {
                const details = getCompanyDetails(job.companyName);
                const isActive = activeJob === idx;

                return (
                  <div
                    key={idx}
                    className={`mc-timeline-item ${isActive ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (idx > activeJob) setDirection(1);
                      else if (idx < activeJob) setDirection(-1);
                      setActiveJob(idx);
                      lastSnapTime.current = Date.now();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (idx > activeJob) setDirection(1);
                        else if (idx < activeJob) setDirection(-1);
                        setActiveJob(idx);
                        lastSnapTime.current = Date.now();
                      }
                    }}
                  >
                    {/* Left border indicator */}
                    <div className="mc-indicator-wrapper">
                      {isActive ? (
                        <div className={`mc-indicator-active ${details.indicatorClass}`}></div>
                      ) : (
                        <div className="mc-indicator-inactive"></div>
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="work-v2-content">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeJob}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="work-v2-content-details"
            >
                <JobContent job={WorkExperience[activeJob]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <JourneyOrbit
        activeJob={activeJob}
        setActiveJob={setActiveJob}
        setDirection={setDirection}
      />
    </div>
  );
};

export default Work;
