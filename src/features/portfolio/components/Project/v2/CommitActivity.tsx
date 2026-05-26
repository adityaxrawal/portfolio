/**
 * CommitActivity — Recent commit list in the right sidebar.
 */

import { COMMIT_ACTIVITY } from '../../../constants/projects.constants';

export function CommitActivity() {
  return (
    <div className="proj-commit-section">
      <div className="proj-right-label">
        <span>LATEST COMMIT ACTIVITY</span>
        <span className="proj-right-dot" aria-hidden="true" />
      </div>

      <ul className="proj-commit-list">
        {COMMIT_ACTIVITY.map((commit) => (
          <li key={commit.repo} className="proj-commit-item">
            {/* Repo color dot/avatar */}
            <span
              className="proj-commit-avatar"
              style={{ backgroundColor: commit.color }}
              aria-hidden="true"
            />
            <div className="proj-commit-info">
              <span className="proj-commit-repo">{commit.repoLabel}</span>
              <span className="proj-commit-msg">{commit.message}</span>
            </div>
            <span className="proj-commit-time">{commit.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
