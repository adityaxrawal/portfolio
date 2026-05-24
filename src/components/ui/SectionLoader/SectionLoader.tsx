import { memo } from 'react';

import './SectionLoader.css';

interface SectionLoaderProps {
  message?: string;
}

const SectionLoader = ({
  message = 'Loading experience...',
}: SectionLoaderProps) => {
  return (
    <div className="section-loader">
      <div className="loader-content">
        <div className="loader-shimmer" />
        <span className="loader-text">{message}</span>
      </div>
    </div>
  );
};

export default memo(SectionLoader);
