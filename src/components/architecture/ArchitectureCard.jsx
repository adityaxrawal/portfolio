import React from 'react';
import * as Icons from 'lucide-react';

/* Pure-CSS cylinder for database variant */
const CssCylinder = ({ color = 'purple' }) => (
  <div className={`css-cylinder css-cylinder--${color}`}>
    <div className="css-cylinder__top" />
    <div className="css-cylinder__body">
      <div className="css-cylinder__line css-cylinder__line--1" />
      <div className="css-cylinder__line css-cylinder__line--2" />
    </div>
  </div>
);

const ArchitectureCard = ({
  title,
  subtitle,
  icon,
  iconColor = 'gray',
  variant = 'standard',
  className = '',
}) => {
  const isCylinder = icon === 'cylinder';
  const IconComponent = !isCylinder && icon ? Icons[icon] : null;

  return (
    <div className={`arch-card arch-card--${variant} ${className}`}>
      <div className={`arch-card__icon-wrapper arch-card__icon-wrapper--${iconColor}`}>
        {isCylinder ? (
          <CssCylinder color={iconColor} />
        ) : IconComponent ? (
          <IconComponent size={14} />
        ) : null}
      </div>
      <div className="arch-card__content">
        <span className="arch-card__title">{title}</span>
        {subtitle && <span className="arch-card__subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};

export { ArchitectureCard };
export default ArchitectureCard;
