import React from 'react';
import * as Icons from 'lucide-react';

export const ArchitectureIcon = ({ name, size = 16, className = '' }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={`arch-icon ${className}`} />;
};
