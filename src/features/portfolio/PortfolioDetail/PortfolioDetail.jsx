// src/component/Content/PortfolioDetail/PortfolioDetail.js
import React, { use, Suspense, Component } from 'react';
import './PortfolioDetail.css';
import { RoughNotation } from 'react-rough-notation';
import { Octokit } from '@octokit/core';

import { useSharedState } from '../../../shared/context/AppContext';
import { useAnimatedCounter } from '../../../shared/hooks/useAnimatedCounter';
import { THEME_COLORS } from '../../../shared/utils/constants';

const username = 'adityaxrawal';
const repo = 'portfolio';

// Stable promise created once at module level — no useEffect/useReducer needed.
// React 19's `use` suspends the component until this resolves.
const fetchGitStats = async () => {
  try {
    const octokit = new Octokit({
      auth: import.meta.env.VITE_GITHUB_TOKEN || '',
    });
    const [userRes, repoRes, commitRes, langRes] = await Promise.all([
      octokit.request('GET /users/{username}', { username }),
      octokit.request('GET /repos/{owner}/{repo}', { owner: username, repo }),
      octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: username,
        repo,
      }),
      octokit.request('GET /repos/{owner}/{repo}/languages', {
        owner: username,
        repo,
      }),
    ]);
    return {
      commits: commitRes.data.length,
      issues: repoRes.data.open_issues_count,
      pullRequests: 15,
      repos: userRes.data.public_repos,
      linesOfCode: Object.values(langRes.data).reduce(
        (acc, val) => acc + val,
        0,
      ),
    };
  } catch (error) {
    let msg = 'Failed to fetch GitHub data';
    const status = error?.status;
    if (status === 401) msg = 'GitHub token invalid.';
    else if (status === 403) msg = 'Rate limit exceeded.';
    else if (status === 404) msg = 'User or repo not found.';
    throw new Error(msg);
  }
};

const gitStatsPromise = fetchGitStats();

// Error boundary to catch API failures (401, 403, 404, etc.)
class PortfolioErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      console.error('ErrorBoundary caught an api error:', this.state.error);
      return (
        <div className="api-error-message">
          <p>{this.state.error.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Pure card component — no memo needed as it's not re-rendering frequently.
const DetailCard = ({ title, content }) => (
  <div className="detail-card" style={{ color: THEME_COLORS.DARK }}>
    <h3>{title}</h3>
    {content}
  </div>
);

// Inner stats panel that suspends while fetching.
function GitStats() {
  const gitStats = use(gitStatsPromise);

  const ANIMATION_DURATION_LONG = 2000;
  const ANIMATION_DURATION_SHORT = 1800;
  const DEBUG_HOURS_ESTIMATE = 287;
  const SO_VISITS_ESTIMATE = 394;

  const linesOfCode = useAnimatedCounter(
    gitStats.linesOfCode,
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
    <div className="detail-card fun-stats">
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
          color={isDarkTheme ? '#76ABAE' : '#A7BEDC'}
          strokeWidth={3}
          order={1}
        >
          Project Spotlight: This Portfolio
        </RoughNotation>
      </span>

      <div className="details-grid">
        <DetailCard
          title="Tech Stack & Tools"
          content={
            <ul>
              <li>
                <RoughNotation
                  type="box"
                  show
                  color="#61DAFB"
                  order="2"
                  padding={[2, 5]}
                >
                  React.js
                </RoughNotation>{' '}
                (Hooks, Context API for state)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show
                  color="#E34F26"
                  order="3"
                  padding={[2, 5]}
                >
                  CSS3
                </RoughNotation>{' '}
                (Flexbox, Grid, Custom Properties, Animations)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show
                  color="orange"
                  order="4"
                  padding={[2, 5]}
                >
                  React Router
                </RoughNotation>{' '}
                (for navigation)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show
                  color="green"
                  order="5"
                  padding={[2, 5]}
                >
                  Lenis
                </RoughNotation>{' '}
                (for that buttery smooth scroll)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show
                  color="#fde2e4"
                  order="6"
                  padding={[2, 5]}
                >
                  React Rough Notation
                </RoughNotation>{' '}
                (for the sketchy highlights)
              </li>
              <li>Various custom fonts for ✨ aesthetics ✨</li>
            </ul>
          }
        />

        <DetailCard
          title="Key Features & Implementations"
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
        />

        <DetailCard
          title="Challenges & Problem-Solving"
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
        />

        <PortfolioErrorBoundary>
          <Suspense
            fallback={
              <div className="detail-card fun-stats">
                <h3>Behind the Scenes</h3>
                <div className="loading-message">
                  Loading GitHub statistics...
                </div>
              </div>
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
