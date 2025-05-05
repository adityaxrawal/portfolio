// src/component/Content/PortfolioDetail/PortfolioDetail.js
import React, { useEffect, useReducer, useCallback } from "react";
import "./portfolio.component.css";
import { RoughNotation } from "react-rough-notation";
import { useSharedState } from "../../../context/app-context";
import { Octokit } from "@octokit/core";
import { useAnimatedCounter } from "../../../hooks/useAnimatoedCounter.hook";

const initialGitStats = {
  commits: 0,
  issues: 0,
  pullRequests: 0,
  repos: 0,
  linesOfCode: 0,
  error: null,
  loading: true,
};

const gitStatsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATS":
      return { ...state, ...action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const Portfolio = () => {
  const { isDarkTheme } = useSharedState();
  const [gitStats, dispatch] = useReducer(gitStatsReducer, initialGitStats);

  const fetchGitHubStats = useCallback(async () => {
    const username = "adityaxrawal";
    const repo = "portfolio";
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const octokit = new Octokit({ auth: token || "" });

    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const [userRes, repoRes, commitRes, langRes] = await Promise.all([
        octokit.request("GET /users/{username}", { username }),
        octokit.request("GET /repos/{owner}/{repo}", { owner: username, repo }),
        octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner: username,
          repo,
        }),
        octokit.request("GET /repos/{owner}/{repo}/languages", {
          owner: username,
          repo,
        }),
      ]);

      dispatch({
        type: "SET_STATS",
        payload: {
          commits: commitRes.data.length,
          issues: repoRes.data.open_issues_count,
          pullRequests: 15,
          repos: userRes.data.public_repos,
          linesOfCode: Object.values(langRes.data).reduce(
            (acc, val) => acc + val,
            0
          ),
        },
      });
    } catch (error) {
      let msg = "Failed to fetch GitHub data";
      if (error.status === 401) msg = "GitHub token invalid.";
      else if (error.status === 403) msg = "Rate limit exceeded.";
      else if (error.status === 404) msg = "User or repo not found.";
      dispatch({ type: "SET_ERROR", payload: msg });
    }
  }, []);

  useEffect(() => {
    fetchGitHubStats();
  }, [fetchGitHubStats]);

  const linesOfCode = useAnimatedCounter(gitStats.linesOfCode, 2000);
  const gitCommits = useAnimatedCounter(gitStats.commits, 1800);
  const debuggingSessions = useAnimatedCounter(247, 1800);
  const stackOverflowVisits = useAnimatedCounter(184, 2000);

  const MemoizedCard = useCallback(
    ({ title, content }) => (
      <div className="detail-card">
        <h3>{title}</h3>
        {content}
      </div>
    ),
    []
  );

  return (
    <section className="portfolio-deep-dive">
      <span className="section-heading">
        <RoughNotation
          type="underline"
          show
          color={isDarkTheme ? "#76ABAE" : "#A7BEDC"}
          strokeWidth={3}
          order={1}
        >
          Project Spotlight: This Portfolio
        </RoughNotation>
      </span>

      {gitStats.loading && (
        <div className="loading-message">Loading GitHub statistics...</div>
      )}
      {gitStats.error && (
        <div className="api-error-message">
          <p>{gitStats.error}</p>
        </div>
      )}

      <div className="details-grid">
        <MemoizedCard
          title="Tech Stack & Tools"
          content={
            <ul>
              <li>
                <RoughNotation
                  type="box"
                  show={true}
                  color="#61DAFB"
                  order="2"
                  padding={[2, 5]}
                >
                  React.js
                </RoughNotation>{" "}
                (Hooks, Context API for state)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show={true}
                  color="#E34F26"
                  order="3"
                  padding={[2, 5]}
                >
                  CSS3
                </RoughNotation>{" "}
                (Flexbox, Grid, Custom Properties, Animations)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show={true}
                  color="orange"
                  order="4"
                  padding={[2, 5]}
                >
                  React Router
                </RoughNotation>{" "}
                (for navigation)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show={true}
                  color="green"
                  order="5"
                  padding={[2, 5]}
                >
                  Lenis
                </RoughNotation>{" "}
                (for that buttery smooth scroll)
              </li>
              <li>
                <RoughNotation
                  type="box"
                  show={true}
                  color="#fde2e4"
                  order="6"
                  padding={[2, 5]}
                >
                  React Rough Notation
                </RoughNotation>{" "}
                (for the sketchy highlights)
              </li>
              <li>Various custom fonts for ✨ aesthetics ✨</li>
            </ul>
          }
        />

        <MemoizedCard
          title="Key Features & Implementations"
          content={
            <ul>
              <li>
                <strong>Theme Toggle:</strong> A simple light/dark mode switch
                using React Context and CSS variables.
              </li>
              <li>
                <strong>Dynamic Backgrounds:</strong> The 'Work' section changes
                background color based on scroll position – a little visual
                flair using scroll listeners.
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

        <MemoizedCard
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
      </div>
    </section>
  );
};

export default Portfolio;
