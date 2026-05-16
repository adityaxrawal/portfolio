// src/component/Content/PortfolioDetail/PortfolioDetail.js
import React, { use, Suspense, Component } from 'react';
import './PortfolioDetail.css';
import { RoughNotation } from 'react-rough-notation';

import { useSharedState } from '@/app/providers/AppContext';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import SectionLoader from '@/components/ui/SectionLoader/SectionLoader';
import { GitHubStats, GitHubContributorStats } from '@/types/github';

const username = 'adityaxrawal';
const repo = 'portfolio';

const TECH_STACK = [
  { name: 'React.js', color: '#61DAFB', detail: '(Hooks, Context API for state)' },
  { name: 'CSS3', color: '#E34F26', detail: '(Flexbox, Grid, Custom Properties, Animations)' },
  { name: 'React Router', color: 'orange', detail: '(for navigation)' },
  { name: 'Lenis', color: 'green', detail: '(for that buttery smooth scroll)' },
  { name: 'React Rough Notation', color: '#fde2e4', detail: '(for the sketchy highlights)' },
];

const ANIMATION_DURATION_LONG = 2000;
const ANIMATION_DURATION_SHORT = 1800;
const DEBUG_HOURS_ESTIMATE = 287;
const SO_VISITS_ESTIMATE = 394;

// Stable promise created once at module level — no useEffect/useReducer needed.
// React 19's `use` suspends the component until this resolves.
// Using standard fetch instead of Octokit to reduce bundle size.
// Security: Token removed to prevent exposure in client bundle.
const fetchGitStats = async (): Promise<GitHubStats> => {
  const repoUrl = `https://api.github.com/repos/${username}/${repo}`;
  const searchUrl = `https://api.github.com/search/issues?q=repo:${username}/${repo}+type:pr`;
  const statsUrl = `https://api.github.com/repos/${username}/${repo}/stats/contributors`;
  
  try {
    const [repoRes, prRes, statsRes, langRes] = await Promise.all([
      fetch(repoUrl).then(r => r.json()),
      fetch(searchUrl).then(r => r.json()),
      fetch(statsUrl).then(r => r.json()),
      fetch(`${repoUrl}/languages`).then(r => r.json())
    ]);

    // Calculate total commits from all contributors
    const totalCommits = Array.isArray(statsRes) 
      ? (statsRes as GitHubContributorStats[]).reduce((acc, contributor) => acc + contributor.total, 0)
      : 0;

    return {
      commits: totalCommits || 0,
      issues: repoRes.open_issues_count || 0,
      pullRequests: prRes.total_count || 0,
      linesOfCode: Object.values(langRes || {}).reduce((acc: number, val: unknown) => acc + (Number(val) || 0), 0),
    };
  } catch (error) {
    throw new Error('Failed to fetch GitHub data. Please try again later.');
  }
};

let gitStatsPromise = fetchGitStats();

interface ErrorBoundaryState { error: Error | null; }

// Error boundary to catch API failures (401, 403, 404, etc.)
class PortfolioErrorBoundary extends Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  handleRetry = () => {
    gitStatsPromise = fetchGitStats();
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      console.error('ErrorBoundary caught an api error:', this.state.error);
      return (
        <div className="detail-card theme-light api-error-message" style={{ textAlign: 'center' }}>
          <h3>Behind the Scenes</h3>
          <p>{this.state.error.message || 'An unexpected error occurred.'}</p>
          <button 
            onClick={this.handleRetry}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#76abae',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Retry Loading Stats
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Pure card component — no memo needed as it's not re-rendering frequently.
// Memoized card component to prevent unnecessary re-renders during theme toggles
interface DetailCardProps {
  title: string;
  content: React.ReactNode;
  isDarkTheme: boolean;
  extraClass?: string;
}

const DetailCard = React.memo(({ title, content, isDarkTheme, extraClass }: DetailCardProps) => (
  <div className={`detail-card ${isDarkTheme ? 'theme-dark' : 'theme-light'} ${extraClass || ''}`}>
    <h3>{title}</h3>
    {content}
  </div>
));

DetailCard.displayName = 'DetailCard';

// Inner stats panel that suspends while fetching.
function GitStats() {
  const gitStats = use(gitStatsPromise);
  const { isDarkTheme } = useSharedState();

  const linesOfCode = useAnimatedCounter(
    typeof gitStats.linesOfCode === 'number' ? gitStats.linesOfCode : 0,
    ANIMATION_DURATION_LONG,
  );
  const gitCommits = useAnimatedCounter(
    gitStats.commits,
    ANIMATION_DURATION_SHORT,
  );
  const debuggingSessions = useAnimatedCounter(
    DEBUG_HOURS_ESTIMATE,
    ANIMATION_DURATION_SHORT,
  );
  const stackOverflowVisits = useAnimatedCounter(
    SO_VISITS_ESTIMATE,
    ANIMATION_DURATION_LONG,
  );

  return (
    <div className={`detail-card ${isDarkTheme ? 'theme-dark' : 'theme-light'} card-stats fun-stats`}>
      <h3>Behind the Scenes</h3>
      <div className="stat-item">
        <span className="stat-number">{linesOfCode.toLocaleString()}</span>
        <span className="stat-label">Lines of Code</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{gitCommits.toLocaleString()}</span>
        <span className="stat-label">Git Commits</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">
          {debuggingSessions.toLocaleString()}
        </span>
        <span className="stat-label">Debugging Hours</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">
          {stackOverflowVisits.toLocaleString()}
        </span>
        <span className="stat-label">StackOverflow Searches</span>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const { isDarkTheme } = useSharedState();

  return (
    <section className="portfolio-deep-dive">
      <span className="section-heading">
        <RoughNotation
          type="underline"
          show
          color={isDarkTheme ? "var(--theme-dark-text)" : "var(--theme-dark-grid)"}
          strokeWidth={3}
          order={1}
        >
          Project Spotlight: This Portfolio
        </RoughNotation>
      </span>

      <div className="details-grid">
        <DetailCard
          title="Tech Stack & Tools"
          extraClass="card-tech"
          content={
            <ul>
              {TECH_STACK.map((tech, i) => (
                <li key={tech.name}>
                  <RoughNotation
                    type="box"
                    show
                    color={tech.color}
                    order={i + 2}
                    padding={[2, 5]}
                  >
                    {tech.name}
                  </RoughNotation>{' '}
                  {tech.detail}
                </li>
              ))}
              <li>Various custom fonts for ✨ aesthetics ✨</li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <DetailCard
          title="Key Features & Implementations"
          extraClass="card-features"
          content={
            <ul>
              <li>
                <strong>Theme Toggle:</strong> A simple light/dark mode switch
                using React Context and CSS variables.
              </li>
              <li>
                <strong>Dynamic Backgrounds:</strong> The &apos;Work&apos;
                section changes background color based on scroll position — a
                little visual flair using scroll listeners.
              </li>
              <li>
                <strong>Interactive Animations:</strong> From the header text
                flip to the skill visualizations and scroll-triggered effects.
              </li>
              <li>
                <strong>Responsiveness:</strong> Adapting the layout for
                different screen sizes (always a fun challenge!).
              </li>
              <li>
                <strong>Easter Egg:</strong> Try the Konami Code (↑ ↑ ↓ ↓ ← → ←
                → B A) for a surprise! 😉
              </li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <DetailCard
          title="Challenges & Problem-Solving"
          extraClass="card-challenges"
          content={
            <ul>
              <li>
                Fine-tuning scroll-linked animations for smooth performance
                across browsers.
              </li>
              <li>
                Ensuring accessibility alongside creative visual elements.
              </li>
              <li>
                Resisting the urge to add *just one more* animation library.
              </li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <PortfolioErrorBoundary>
          <Suspense
            fallback={
              <SectionLoader message="Fetching Repository Insights..." />
            }
          >
            <GitStats />
          </Suspense>
        </PortfolioErrorBoundary>
      </div>
    </section>
  );
};

export default Portfolio;
