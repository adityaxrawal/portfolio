import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapScroll } from '@/components/layout/SnapLayout/SnapScrollContext';
import type { SlideProps } from '@/types/slides';
import {
  WorkExperience,
  WorkExperienceItem,
} from '../../../data/workExperience';
import { Activity, Rocket, Flag, FlaskConical } from 'lucide-react';
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
      className="work-v2-section"
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
              <h2 className="work-v2-content-role">
                {WorkExperience[activeJob].title}
              </h2>
              <div className="work-v2-content-meta">
                <a
                  href={WorkExperience[activeJob].companyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="work-v2-content-company"
                >
                  @{WorkExperience[activeJob].companyName}
                </a>
                <span className="work-v2-content-years">
                  {WorkExperience[activeJob].years}
                </span>
              </div>

              <div className="work-v2-content-desc">
                {WorkExperience[activeJob].description}
              </div>

              <div className="work-v2-content-tech">
                {WorkExperience[activeJob].techHighlights.map((tech, idx) => (
                  <span key={idx} className="work-v2-tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="journey-orbit-wrapper">
        <div className="journey-orbit-header">
          <span className="journey-orbit-label">MY JOURNEY ORBIT</span>
        </div>

        <div className="orbit-layout">
          {/* Node 1: Wipro */}
          <div className="orbit-point">
            <div
              className="orbit-dot shadow-purple"
              style={{ backgroundColor: '#a855f7' }}
            />
            <div className="orbit-info">
              <span className="orbit-date">Feb 2020 – May 2021</span>
              <h4 className="orbit-company">Wipro</h4>
              <p className="orbit-desc">
                Built robust services for
                <br />
                e-commerce platforms.
              </p>
            </div>
          </div>

          <div className="orbit-connector" />

          {/* Node 2: DevelUp */}
          <div className="orbit-point">
            <div
              className="orbit-dot shadow-blue"
              style={{ backgroundColor: '#3b82f6' }}
            />
            <div className="orbit-info">
              <span className="orbit-date">Jun 2021 – Dec 2022</span>
              <h4 className="orbit-company">DevelUp</h4>
              <p className="orbit-desc">
                Shipped growth features
                <br />
                used by thousands.
              </p>
            </div>
          </div>

          <div className="orbit-connector" />

          {/* Center: Rocket Orbital SVG */}
          <div className="orbit-center-point">
            <svg
              viewBox="0 0 160 80"
              width="160"
              height="80"
              className="center-svg"
              aria-hidden="true"
            >
              {/* Left branch paths (now extending to x=50 to reach the larger circle) */}
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

              {/* Right branch paths (now starting at x=110 to reach the larger circle) */}
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
                {/* Outer ring (radius increased from 30 to 35) */}
                <circle
                  cx="80"
                  cy="40"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="var(--orbit-bg)"
                />

                {/* Connection dots on outer ring (moved outward to match r=35) */}
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

              {/* Inner ring (radius increased from 18 to 22) */}
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

          <div className="orbit-connector" />

          {/* Node 3: LeadSquared */}
          <div className="orbit-point">
            <div
              className="orbit-dot shadow-orange"
              style={{ backgroundColor: '#f97316' }}
            />
            <div className="orbit-info">
              <span className="orbit-date">Dec 2022 – Mar 2024</span>
              <h4 className="orbit-company">LeadSquared</h4>
              <p className="orbit-desc">
                Scaled serverless APIs to
                <br />
                50K+ monthly requests.
              </p>
            </div>
          </div>

          <div className="orbit-connector" />

          {/* Node 4: MathCo */}
          <div className="orbit-point">
            <div
              className="orbit-dot shadow-green"
              style={{ backgroundColor: '#50b887' }}
            />
            <div className="orbit-info">
              <span className="orbit-date">Jan 2024 – Present</span>
              <h4 className="orbit-company">MathCo</h4>
              <p className="orbit-desc">
                Building analytics systems
                <br />
                that power Mars missions.
              </p>
            </div>
          </div>

          <div className="orbit-connector" />

          {/* Node 5: Next Mission */}
          <div className="orbit-point">
            <div className="orbit-dot dot-flag">
              <Flag size={10} className="flag-icon" />
            </div>
            <div className="orbit-info">
              <span className="orbit-date">Next Mission</span>
              <h4 className="orbit-company">Always building.</h4>
              <p className="orbit-desc">Always shipping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
