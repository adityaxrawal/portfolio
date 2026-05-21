import React from 'react';
import ArchitectureCard from './ArchitectureCard';

const ArchitectureFooter = ({ cards = [], title = 'DevOps & Observability' }) => {
  return (
    <div className="arch-footer">
      <div className="arch-footer__title">{title}</div>
      <div className="arch-footer__grid">
        {cards.map((card, i) => (
          <div key={i} className="arch-footer__card">
            <ArchitectureCard
              title={card.title}
              icon={card.icon}
              iconColor={card.iconColor}
              variant="standard"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { ArchitectureFooter };
export default ArchitectureFooter;
