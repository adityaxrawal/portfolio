import React from 'react';

const ArchitectureArrow = ({ direction = 'horizontal', bidirectional = false, className = '' }) => {
  const headMap = { horizontal: 'right', up: 'top', down: 'bottom' };
  const oppositeMap = { horizontal: 'left', up: 'bottom', down: 'top' };
  const head = headMap[direction] || 'right';
  const opposite = oppositeMap[direction] || 'left';

  return (
    <div className={`arch-arrow arch-arrow--${direction} ${className}`}>
      <div className="arch-arrow__line">
        {bidirectional && (
          <span className={`arch-arrow__head arch-arrow__head--${opposite}`} />
        )}
        <span className={`arch-arrow__head arch-arrow__head--${head}`} />
      </div>
    </div>
  );
};

export { ArchitectureArrow };
export default ArchitectureArrow;
