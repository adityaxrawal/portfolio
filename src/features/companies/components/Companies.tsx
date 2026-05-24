import { useCompaniesFilter } from '../hooks/useCompaniesFilter';
import type { Company } from '../types';

import { useSharedState } from '@/app';
import { THEME_COLORS } from '@/config';

import './Companies.css';

const CompaniesTable = () => {
  const { isDarkTheme } = useSharedState();
  const { searchTerm, setSearchTerm, filteredCompanies } = useCompaniesFilter();

  return (
    <div className={`companies-page ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="companies-header">
        <h1 className="companies-title">Career Hub</h1>
        <p className="companies-subtitle">
          A curated list of career portals for top global tech firms.
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search companies"
          />
        </div>
      </div>

      <div className="companies-grid">
        {filteredCompanies.map((company: Company, index) => (
          <a
            key={`${company.name}-${index}`}
            href={company.careerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="company-card"
            style={{
              borderColor: isDarkTheme
                ? THEME_COLORS.DARK_GRID
                : THEME_COLORS.LIGHT_GRID,
              color: isDarkTheme
                ? THEME_COLORS.DARK_TEXT
                : THEME_COLORS.DARK_GRID,
            }}
          >
            <span className="company-name">{company.name}</span>
            <span className="company-link-icon">→</span>
          </a>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="no-results">
          {`No companies found matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;
