import type { ReactNode } from 'react';
import './Architecture.css';

interface ArchitectureWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ArchitectureWrapper({ children, className = '' }: ArchitectureWrapperProps) {
  return (
    <div className={`arch-diagram-wrapper w-full max-w-full relative overflow-visible box-border @container/arch ${className}`}>
      <div className="architecture-content flex flex-col gap-4 p-4 w-full box-border">
        {children}
      </div>
    </div>
  );
}
