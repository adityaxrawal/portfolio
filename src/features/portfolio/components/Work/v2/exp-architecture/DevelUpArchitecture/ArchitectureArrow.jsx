import React from 'react';

export const ArchitectureArrow = ({
  direction = 'right',
  dashed = false,
  bidirectional = false,
  className = '',
  label,
}) => (
  <span
    className={`du-arrow du-arrow--${direction} ${dashed ? 'du-arrow--dashed' : ''} ${
      bidirectional ? 'du-arrow--both' : ''
    } ${className}`}
    aria-hidden="true"
  >
    <span className="du-arrow__line" />
    {label && <span className="du-arrow__label">{label}</span>}
  </span>
);

export default ArchitectureArrow;
