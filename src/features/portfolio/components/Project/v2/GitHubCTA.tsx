/**
 * GitHubCTA — Bottom banner: "More experiments, tools and learning projects on my GitHub."
 * Full width banner at the bottom of the center column.
 */

import { ExternalLink, FlaskConical } from 'lucide-react';

export function GitHubCTA() {
  return (
    <div className="proj-cta-banner">
      <div className="proj-cta-left">
        <FlaskConical size={20} className="proj-cta-icon" aria-hidden="true" />
        <div className="proj-cta-text">
          <span className="proj-cta-primary">
            More experiments, tools and learning projects on my GitHub.
          </span>
          <span className="proj-cta-secondary">
            Every system is a step forward.
          </span>
        </div>
      </div>
      <a
        href="https://github.com/adityaxrawal"
        target="_blank"
        rel="noopener noreferrer"
        className="proj-cta-btn"
        aria-label="Visit GitHub profile"
      >
        Visit GitHub
        <ExternalLink size={13} aria-hidden="true" />
      </a>
    </div>
  );
}
