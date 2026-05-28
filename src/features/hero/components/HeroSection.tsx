import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { HiLocationMarker, HiArrowDown } from 'react-icons/hi';
import { LuAsterisk } from 'react-icons/lu';

import { useSharedState } from '@/app';
import ContactButton from '@/components/ui/ContactButton';
import Loader from '@/components/ui/Loader';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import { LOADER_LOGS } from '@/config';
import { useGitHubStats } from '@/features/portfolio';
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  textReveal,
} from '@/lib/animations';

import './HeroSection.css';

// Lazy load the heavy 3D component
const Lanyard = lazy(() => import('./Lanyard/Lanyard'));

const TECH_STACK_TAGS = [
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'AWS',
  'Serverless',
  'Micro-Frontends',
  'Analytics Systems',
];

const HeroSection = ({
  isActive: _isActive,
  goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();

  const { stats, loading: loadingStats } = useGitHubStats();

  return (
    <motion.section
      className="hero-section-wrapper"
      style={{ width: '100%', height: '100%' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      <div className={`hero-section ${isDarkTheme ? 'dark' : ''}`}>
        <div className="headline">
          {/* --- ORIGINAL TEXT CONTENT BELOW --- */}
          <section className="headline-header">
            <motion.div
              className="headline-pre-title"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <span className="headline-pre-title-text">
                Full Stack Engineer / Frontend Systems
              </span>
              <span className="headline-pre-title-text">
                Bengaluru, India <HiLocationMarker className="location-icon" />
              </span>
            </motion.div>
            <motion.div
              className="headline-title"
              variants={textReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <span className="headline-text-1">नमस्ते.</span>
              <span className="headline-text-2">I build software</span>
              <span className="headline-text-3">
                people{' '}
                <span className="headline-text-highlight">
                  actually
                  <svg
                    className="underline-svg"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 2 11 C 30 0.5, 70 0.5, 98 11"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>{' '}
                use
              </span>
            </motion.div>
            <motion.section
              className="headline-content"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.3 }}
            >
              <motion.div className="timeline-item" variants={staggerChild}>
                <div className="timeline-dot"></div>
                <span className="timeline-label">CURRENTLY</span>
                <p className="timeline-text">
                  Leading frontend engineering at <strong>MathCo</strong> for a
                  high-impact analytics platform serving Mars Inc.
                </p>
              </motion.div>
              <motion.div className="timeline-item" variants={staggerChild}>
                <div className="timeline-dot"></div>
                <span className="timeline-label">PREVIOUSLY</span>
                <p className="timeline-text">
                  Built serverless architecture at <strong>LeadSquared</strong>{' '}
                  handling ~500K monthly API requests.
                </p>
              </motion.div>
              <motion.div className="timeline-item" variants={staggerChild}>
                <div className="timeline-dot"></div>
                <span className="timeline-label">ALSO</span>
                <p className="timeline-text">
                  Built a Resume Builder platform adopted by 5,000+ users in
                  under a year.
                </p>
              </motion.div>
            </motion.section>
            <motion.section
              className="headline-buttons"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <ContactButton>Let&apos;s Build Together</ContactButton>
            </motion.section>
          </section>
        </div>

        {/* ── Lanyard: physics rope + interactive flip card ── */}
        <section className="image-container">
          <Suspense
            fallback={
              <Loader
                isFullScreen={false}
                ignoreSessionStorage={true}
                logLines={LOADER_LOGS.HERO as unknown as string[]}
              />
            }
          >
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </Suspense>
        </section>
        <motion.section
          className="stats-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Box 1: System Status */}
          <motion.div
            className="stats-box system-status"
            variants={staggerChild}
          >
            <div className="stats-box-header">
              <span>SYSTEM STATUS</span>
              <span className="terminal-icon">{`>_`}</span>
            </div>
            <div className="status-list">
              <div className="status-item">
                <span className="dot green"></span>
                <span>Building</span>
              </div>
              <div className="status-item">
                <span className="dot orange"></span>
                <span>Shipping</span>
              </div>
              <div className="status-item">
                <span className="dot blue"></span>
                <span>Learning</span>
              </div>
            </div>
          </motion.div>

          {/* Box 2: Tech Stack */}
          <motion.div className="stats-box tech-stack" variants={staggerChild}>
            <div className="stats-box-header">
              <span>TECH STACK</span>
            </div>
            <div className="tech-tags">
              {TECH_STACK_TAGS.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Box 3: Impact Snapshot */}
          <motion.div
            className="stats-box impact-snapshot"
            variants={staggerChild}
          >
            <div className="stats-box-header">
              <span>IMPACT SNAPSHOT</span>
            </div>
            <div className="impact-grid">
              <div className="impact-item">
                <span className="impact-value">
                  {loadingStats
                    ? '...'
                    : `${(stats?.totalContributions || 0).toLocaleString()}+`}
                </span>
                <span className="impact-label">Contributions</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">
                  {loadingStats ? '...' : stats?.totalStars || 0}
                </span>
                <span className="impact-label">OSS Stars</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">
                  {loadingStats ? '...' : stats?.projectsShipped || 0}
                </span>
                <span className="impact-label">Projects</span>
              </div>
              <div className="impact-item">
                <span className="impact-value">
                  {loadingStats
                    ? '...'
                    : `${(stats?.pullRequests || 0).toLocaleString()}`}
                </span>
                <span className="impact-label">Pull Requests</span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
      <div
        className={`hero-section-scroll-container ${isDarkTheme ? 'dark' : ''}`}
        onClick={() => goToSlide?.(1)}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
        onKeyDown={(e) => e.key === 'Enter' && goToSlide?.(1)}
        style={{ cursor: 'pointer' }}
      >
        <div className="scroll-indicator-left">
          <div className="scroll-arrow-circle">
            <HiArrowDown className="scroll-arrow-icon" />
          </div>
          <div className="scroll-text-block">
            <span className="scroll-text-main">SCROLL TO EXPLORE</span>
            <span className="scroll-text-sub">
              Deployments, Projects & more
            </span>
          </div>
        </div>

        <div className="scroll-indicator-right">
          <span className="scroll-text-open">Open to what comes next.</span>
          <LuAsterisk className="scroll-asterisk-icon" />
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
