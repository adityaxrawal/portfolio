import { useEffect, useState, lazy, Suspense } from 'react';
import { useSharedState } from '@/app/providers/AppContext';
import { HiLocationMarker, HiArrowDown } from 'react-icons/hi';
import { LuAsterisk } from 'react-icons/lu';
import ContactButton from '@/components/ui/ContactButton/';
import SectionLoader from '@/components/ui/SectionLoader/SectionLoader';
import { GitHubStatsResponse } from '@/types/github';

import './HeroSection.css';

// Lazy load the heavy 3D component
const Lanyard = lazy(() => import('./Lanyard/Lanyard'));

const HeroSection = () => {
  const { isDarkTheme } = useSharedState();

  // Track desktop vs mobile to show/hide lanyard
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > 1024,
  );

  const [stats, setStats] = useState<GitHubStatsResponse | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const response = await fetch('/api/github-stats');
        if (!response.ok) throw new Error('Failed to fetch GitHub metrics');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('GitHub Metrics Error:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate confetti dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero-section-wrapper">
      <div className={`hero-section ${isDarkTheme ? 'dark' : ''}`}>
        <div className="headline">
          {/* --- ORIGINAL TEXT CONTENT BELOW --- */}
          <section className="headline-header">
            <div className="headline-pre-title">
              <span className="headline-pre-title-text">
                Full Stack Engineer / Frontend Systems
              </span>
              <span className="headline-pre-title-text">
                Bengaluru, India <HiLocationMarker className="location-icon" />
              </span>
            </div>
            <div className="headline-title">
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
            </div>
            <section className="headline-content">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-label">CURRENTLY</span>
                <p className="timeline-text">
                  Leading frontend engineering at <strong>MathCo</strong> for a
                  high-impact analytics platform serving Mars Inc.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-label">PREVIOUSLY</span>
                <p className="timeline-text">
                  Built serverless architecture at <strong>LeadSquared</strong>{' '}
                  handling ~500K monthly API requests.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <span className="timeline-label">ALSO</span>
                <p className="timeline-text">
                  Built a Resume Builder platform adopted by 5,000+ users in
                  under a year.
                </p>
              </div>
            </section>
            <section className="headline-buttons">
              <ContactButton>Let's Build Together</ContactButton>
            </section>
          </section>
        </div>

        {/* ── Lanyard: physics rope + interactive flip card ── */}
        {isDesktop && (
          <section className="image-container">
            <Suspense
              fallback={<SectionLoader message="Calibrating 3D Physics..." />}
            >
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </Suspense>
          </section>
        )}
        <section className="stats-container">
          {/* Box 1: System Status */}
          <div className="stats-box system-status">
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
          </div>

          {/* Box 2: Tech Stack */}
          <div className="stats-box tech-stack">
            <div className="stats-box-header">
              <span>TECH STACK</span>
            </div>
            <div className="tech-tags">
              {[
                'React',
                'TypeScript',
                'Next.js',
                'Node.js',
                'AWS',
                'Serverless',
                'Micro-Frontends',
                'Analytics Systems',
              ].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Box 3: Impact Snapshot */}
          <div className="stats-box impact-snapshot">
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
          </div>
        </section>
      </div>
      <div
        className={`hero-section-scroll-container ${isDarkTheme ? 'dark' : ''}`}
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
    </section>
  );
};

export default HeroSection;

{
  /* --- END ORIGINAL TEXT ---
<div className="headline-buttons">
  <a
    href={links.linkedInLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    <button type="button" className="headline-btn github">
      View LinkedIn
    </button>
  </a>
</div> */
}
