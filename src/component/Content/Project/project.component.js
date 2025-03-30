// src/component/Content/Projects/projects.component.js (New File)
import React, { useState, useEffect } from 'react';
import './project.component.css'; // Create this CSS file

const Project = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const GITHUB_USERNAME = 'adityaxrawal'; // Replace with your username

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            setError(null);
            try {
                // Consider fetching pinned repos if a direct API exists,
                // otherwise fetch all and filter/sort if needed.
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRepos(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch GitHub repos:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <section className="projects-section">
            <h2>My GitHub Projects</h2>
            {loading && <p>Loading projects...</p>}
            {error && <p>Error loading projects: {error}</p>}
            {!loading && !error && (
                <div className="projects-grid">
                    {repos.length > 0 ? repos.map(repo => (
                        <div key={repo.id} className="project-card">
                            <h3><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h3>
                            <p>{repo.description || 'No description available.'}</p>
                            {repo.language && <span className="project-language">{repo.language}</span>}
                            {/* Add more details like stars, forks if desired */}
                        </div>
                    )) : <p>No public repositories found.</p>}
                </div>
            )}
        </section>
    );
};

export default Project;