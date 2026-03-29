// src/component/Content/Projects/projects.component.js
import React, { use, Suspense } from 'react';
import './project.component.css';

const GITHUB_USERNAME = 'adityaxrawal';

// Create a stable promise once at module level — React 19's `use` requires a
// stable (not re-created) promise so it can correctly suspend and cache the result.
const reposPromise = fetch(
  `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`,
).then((res) => {
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
});

// Inner component that suspends until the data is ready.
function RepoList() {
  const repos = use(reposPromise);

  if (repos.length === 0) {
    return (
      <div className="no-repos">
        <p>No public repositories found.</p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {repos.map((repo) => (
        <div key={repo.id} className="project-card">
          <h3>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${repo.name} on GitHub`}
            >
              {repo.name}
            </a>
          </h3>
          <p>{repo.description || 'No description available.'}</p>
          <div className="project-meta">
            {repo.language && (
              <span className="project-language">{repo.language}</span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="project-stars">⭐ {repo.stargazers_count}</span>
            )}
            {repo.forks_count > 0 && (
              <span className="project-forks">🍴 {repo.forks_count}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Error boundary for graceful error handling (class component — no hook equivalent yet).
class ProjectErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <section className="projects-section">
          <h2>My GitHub Projects</h2>
          <div className="error-container">
            <p className="error-message">⚠️ {this.state.error.message}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

const Project = () => (
  <section className="projects-section">
    <h2>My GitHub Projects</h2>
    <ProjectErrorBoundary>
      <Suspense
        fallback={
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        }
      >
        <RepoList />
      </Suspense>
    </ProjectErrorBoundary>
  </section>
);

export default Project;
