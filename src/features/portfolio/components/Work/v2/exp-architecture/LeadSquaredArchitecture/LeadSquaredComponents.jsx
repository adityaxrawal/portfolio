import React from 'react';
import * as Lucide from 'lucide-react';

export const LsIcon = ({ name, color, className = '' }) => {
  // Use lucide-react if icon is string
  const IconComponent = typeof name === 'string' && Lucide[name] ? Lucide[name] : Lucide.HelpCircle;

  return (
    <div className={`ls-icon-wrapper ls-icon-wrapper--${color} ${className}`}>
      <IconComponent className="ls-icon" />
    </div>
  );
};

export const LsSection = ({ title, children, className = '' }) => {
  return (
    <div className={`ls-section ${className}`}>
      {title && <div className="ls-section__title">{title}</div>}
      <div className="ls-section__content">{children}</div>
    </div>
  );
};

export const LsCard = ({ title, subtitle, icon, iconColor = 'gray', centered = false, className = '' }) => {
  return (
    <div className={`ls-card ${centered ? 'ls-card--centered' : ''} ${className}`}>
      {icon && <LsIcon name={icon} color={iconColor} className={centered ? 'ls-card__icon--centered' : ''} />}
      <div className="ls-card__text-block">
        <div className="ls-card__title">{title}</div>
        {subtitle && <div className="ls-card__subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export const LsQueueSection = ({ title, cards, className = '' }) => {
  return (
    <div className={`ls-queue-section ${className}`}>
      <div className="ls-queue-section__title">{title}</div>
      <div className="ls-queue-section__content">
        {cards.map((card, idx) => (
          <LsCard
            key={idx}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            iconColor={card.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export const LsArrow = ({ direction = 'horizontal', dashed = false, className = '' }) => {
  return (
    <div className={`ls-arrow ls-arrow--${direction} ${dashed ? 'ls-arrow--dashed' : ''} ${className}`}>
      <div className="ls-arrow__line">
        {direction === 'horizontal' && <div className="ls-arrow__head ls-arrow__head--right" />}
        {direction === 'down' && <div className="ls-arrow__head ls-arrow__head--bottom" />}
        {direction === 'up' && <div className="ls-arrow__head ls-arrow__head--top" />}
        {direction === 'both' && (
          <>
            <div className="ls-arrow__head ls-arrow__head--top" />
            <div className="ls-arrow__head ls-arrow__head--bottom" />
          </>
        )}
      </div>
    </div>
  );
};
