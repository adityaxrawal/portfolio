// src/component/Content/Projects/projects.component.js (New File)
import React, { useState, useEffect } from "react";
import "./project.component.css"; // Create this CSS file

const Project = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const GITHUB_USERNAME = "adityaxrawal"; // Replace with your username

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Consider fetching pinned repos if a direct API exists,
        // otherwise fetch all and filter/sort if needed.
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRepos(data);
      } catch (e) {
        setError(e.message || "Failed to fetch GitHub repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <section className="projects-section">
        <h2>My GitHub Projects</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section">
        <h2>My GitHub Projects</h2>
        <div className="error-container">
          <p className="error-message">⚠️ {error}</p>
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

  return (
    <section className="projects-section">
      <h2>My GitHub Projects</h2>
      <div className="projects-grid">
        {repos.length > 0 ? (
          repos.map((repo) => (
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
              <p>{repo.description || "No description available."}</p>
              <div className="project-meta">
                {repo.language && (
                  <span className="project-language">{repo.language}</span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="project-stars">
                    ⭐ {repo.stargazers_count}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="project-forks">🍴 {repo.forks_count}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-repos">
            <p>No public repositories found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
