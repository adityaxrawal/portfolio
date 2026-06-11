import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useEffect, useRef } from 'react';
import { HiLocationMarker, HiArrowDown } from 'react-icons/hi';
import { LuAsterisk } from 'react-icons/lu';

import { useSharedState } from '@/app';
import ContactButton from '@/components/ui/ContactButton';
import Loader from '@/components/ui/Loader';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import { LOADER_LOGS } from '@/config';
import { useGitHubStats } from '@/features/portfolio/hooks/useGitHubStats';
import {
  fadeUp,
  ease,
} from '@/lib/animations';
import { gsap, gsapEase } from '@/lib/gsap';

import { RevealHeading, RevealTextBody, RevealBox, RevealHighlight, RevealButton } from '@/components/ui/Animations';
import './HeroSection.css';


// Lazy load the heavy 3D Lanyard component
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
  const prefersReducedMotion = useReducedMotion();
  const headlineRef = useRef<HTMLDivElement>(null);

  const { stats, loading: loadingStats } = useGitHubStats();

  // ── GSAP character-by-character headline reveal ──────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = headlineRef.current;
    if (!container) return;

    // Select only the English lines (not the Hindi नमस्ते)
    const line2 = container.querySelector('.headline-text-2') as HTMLElement | null;
    const line3 = container.querySelector('.headline-text-3') as HTMLElement | null;

    if (!line2 || !line3) return;

    // Helper: wrap each word in a span to preserve safe splitting
    const wrapWords = (el: HTMLElement) => {
      // Save the original HTML to restore structure on cleanup
      const originalHTML = el.innerHTML;
      const words = el.innerText.split(' ').filter(Boolean);
      el.innerHTML = words
        .map((w) => `<span class="gsap-word" style="display:inline-block;overflow:hidden;">${w}</span>`)
        .join(' ');
      return { el, originalHTML };
    };

    const saved2 = wrapWords(line2);
    // For line3, the highlight span complicates things — just animate the whole line
    const tl = gsap.timeline({ delay: 0.35 });
    tl.fromTo(
      line2.querySelectorAll('.gsap-word'),
      { y: '105%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.65, stagger: 0.06, ease: gsapEase.smooth },
    ).fromTo(
      line3,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: gsapEase.smooth },
      '-=0.3',
    );

    return () => {
      tl.kill();
      // Restore original HTML to avoid stale DOM on re-renders
      saved2.el.innerHTML = saved2.originalHTML;
    };
  }, [prefersReducedMotion]);

  return (
    <motion.section
      className="hero-section-wrapper"
      style={{ width: '100%', height: '100%', position: 'relative' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >


      <div className={`hero-section ${isDarkTheme ? 'dark' : ''}`}>
        <div ref={headlineRef} className="headline">
          {/* --- ORIGINAL TEXT CONTENT BELOW --- */}
          <section className="headline-header">
            <motion.div
              className="headline-pre-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: ease.smooth }}
            >
              <span className="headline-pre-title-text">
                Full Stack Engineer / Frontend Systems
              </span>
              <span className="headline-pre-title-text">
                Bengaluru, India <HiLocationMarker className="location-icon" />
              </span>
            </motion.div>
            <div className="headline-title">
              <RevealHeading delay={0.2} as="h1" className="headline-text-1">नमस्ते.</RevealHeading>
              <RevealHeading delay={0.25} as="h1" className="headline-text-2">I build software</RevealHeading>
              <RevealHeading delay={0.3} as="h1" className="headline-text-3">
                people{' '}
                <RevealHighlight delay={0.6}>
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
                  </span>
                </RevealHighlight>
                {' '}use
              </RevealHeading>
            </div>
            <section className="headline-content">
              <RevealTextBody className="timeline-item" delay={0.4} as="div">
                <div className="timeline-dot"></div>
                <span className="timeline-label">CURRENTLY</span>
                <p className="timeline-text">
                  Leading frontend engineering at <strong>MathCo</strong> for a
                  high-impact analytics platform serving Mars Inc.
                </p>
              </RevealTextBody>
              <RevealTextBody className="timeline-item" delay={0.5} as="div">
                <div className="timeline-dot"></div>
                <span className="timeline-label">PREVIOUSLY</span>
                <p className="timeline-text">
                  Built serverless architecture at <strong>LeadSquared</strong>{' '}
                  handling ~500K monthly API requests.
                </p>
              </RevealTextBody>
              <RevealTextBody className="timeline-item" delay={0.6} as="div">
                <div className="timeline-dot"></div>
                <span className="timeline-label">ALSO</span>
                <p className="timeline-text">
                  Built a Resume Builder platform adopted by 5,000+ users in
                  under a year.
                </p>
              </RevealTextBody>
            </section>
            <section className="headline-buttons">
              <RevealButton delay={0.7}>
                <ContactButton>Let&apos;s Build Together</ContactButton>
              </RevealButton>
            </section>
          </section>
        </div> {/* end headline ref div */}

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
        <section className="stats-container">
          {/* Box 1: System Status */}
          <RevealBox delay={0.4} className="stats-box system-status">
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
          </RevealBox>

          {/* Box 2: Tech Stack */}
          <RevealBox delay={0.6} className="stats-box tech-stack">
            <div className="stats-box-header">
              <span>TECH STACK</span>
            </div>
            <div className="tech-tags">
              {TECH_STACK_TAGS.map((tech, i) => (
                <div key={i} className="tech-tag-reveal-wrapper">
                  <span className="tech-tag">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </RevealBox>

          {/* Box 3: Impact Snapshot */}
          <RevealBox delay={0.8} className="stats-box impact-snapshot">
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
          </RevealBox>
        </section>
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
