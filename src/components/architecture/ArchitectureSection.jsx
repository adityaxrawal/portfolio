import React from 'react';

const ArchitectureSection = ({ title, dotColor, variant = 'gray', children }) => {
  return (
    <div className={`arch-section arch-section--${variant}`}>
      <div className="arch-section__header">
        {dotColor && (
          <span
            className="arch-section__dot"
            style={{ backgroundColor: dotColor }}
          />
        )}
        <h3 className="arch-section__title">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export { ArchitectureSection };
export default ArchitectureSection;
