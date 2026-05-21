import React from 'react';
import { ArchitectureArrow } from './ArchitectureArrow';

export const ArchitectureConnector = ({ 
  type = 'horizontal', 
  startX, endX, 
  startY, endY,
  arrow = 'none', 
  dashed = true
}) => {
  const style = {
    position: 'absolute',
    borderStyle: dashed ? 'dashed' : 'solid',
    borderColor: 'var(--arrow)',
    zIndex: 1
  };

  if (type === 'horizontal') {
    style.left = startX;
    style.width = `calc(${endX} - ${startX})`;
    style.top = startY;
    style.borderTopWidth = '2px';
    style.borderBottomWidth = '0';
    style.borderLeftWidth = '0';
    style.borderRightWidth = '0';
  } else if (type === 'vertical') {
    style.left = startX;
    style.top = startY;
    style.height = `calc(${endY} - ${startY})`;
    style.borderLeftWidth = '2px';
    style.borderTopWidth = '0';
    style.borderBottomWidth = '0';
    style.borderRightWidth = '0';
  }

  return (
    <div className={`arch-connector arch-connector-${type}`} style={style}>
      {arrow === 'end' && type === 'horizontal' && <ArchitectureArrow direction="right" />}
      {arrow === 'start' && type === 'horizontal' && <ArchitectureArrow direction="left" />}
      {arrow === 'both' && type === 'horizontal' && (
        <>
          <ArchitectureArrow direction="left" />
          <ArchitectureArrow direction="right" />
        </>
      )}
      {arrow === 'end' && type === 'vertical' && <ArchitectureArrow direction="down" />}
      {arrow === 'start' && type === 'vertical' && <ArchitectureArrow direction="up" />}
    </div>
  );
};
