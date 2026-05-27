/**
 * ProjectHeader — Left sidebar header with label, 3-line tagline, and description.
 * Mirrors WorkHeader's pattern but adapted for the Projects section.
 */

export function ProjectHeader() {
  return (
    <div className="proj-header">
      {/* Label row */}
      <div className="proj-header-label">
        <span>PROJECTS</span>
        <span className="proj-header-dot" aria-hidden="true" />
      </div>

      {/* 2-line serif tagline */}
      <div className="proj-header-tagline">
        <span className="proj-tagline-line">Scale through</span>
        <span className="proj-tagline-highlight">
          Engineering
          <svg
            className="proj-tagline-underline"
            viewBox="0 0 200 9"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2.5 6.5C48.5 2.5 130.5 -1.5 197.5 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      {/* Description */}
      <p className="proj-header-desc">
        A collection of engineering systems, tools and experiments. Some are
        live, some are in progress, all are built to learn, solve and create
        impact.
      </p>
    </div>
  );
}
