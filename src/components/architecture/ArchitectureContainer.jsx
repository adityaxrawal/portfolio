import React from 'react';

export const ArchitectureContainer = ({ children }) => {
  return (
    <div className="develup-architecture-page">
      <div className="develup-architecture-scale-container">
        <div className="develup-architecture-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};
