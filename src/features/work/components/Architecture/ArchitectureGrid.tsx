import type { ReactNode } from 'react';

interface ArchitectureGridProps {
  children: ReactNode;
  className?: string;
}

export function ArchitectureGrid({
  children,
  className = '',
}: ArchitectureGridProps) {
  return (
    <div
      className={`main-flow-grid flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-4 w-full ${className}`}
    >
      {children}
    </div>
  );
}
