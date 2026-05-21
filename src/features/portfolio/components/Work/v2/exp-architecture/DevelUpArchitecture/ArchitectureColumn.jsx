import React from 'react';

import ArchitectureCard from './ArchitectureCard';

export const ArchitectureColumn = ({ title, icon, tone, cards, className = '' }) => {
  const HeaderIcon = icon;

  return (
    <section
      className={`du-column du-column--${tone} ${className}`}
      aria-labelledby={`du-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
    >
      <header className="du-column__header">
        {HeaderIcon && (
          <span className="du-column__header-icon" aria-hidden="true">
            <HeaderIcon size={17} strokeWidth={2.5} />
          </span>
        )}
        <h4
          id={`du-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
          className="du-column__title"
        >
          {title}
        </h4>
      </header>
      <div className="du-column__cards">
        {cards.map((card) => (
          <ArchitectureCard key={`${title}-${card.title}`} tone={tone} {...card} />
        ))}
      </div>
    </section>
  );
};

export default ArchitectureColumn;
