import type { FC, ReactNode } from 'react';

export interface ArchNodeProps {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  highlight?: boolean;
  accentColor?: string;
}

export const ArchNode: FC<ArchNodeProps> = ({
  icon,
  label,
  sublabel,
  highlight,
  accentColor,
}) => (
  <div
    className={`jc-arch-node ${highlight ? 'jc-arch-node-highlight' : ''}`}
    style={
      highlight && accentColor
        ? {
            borderColor: accentColor,
            boxShadow: `0 0 0 1px ${accentColor}20, 0 1px 6px ${accentColor}15`,
          }
        : {}
    }
  >
    <div
      className={`jc-arch-node-icon ${highlight ? 'jc-arch-node-icon-hl' : ''}`}
      style={
        highlight && accentColor
          ? { backgroundColor: `${accentColor}10`, color: accentColor }
          : {}
      }
    >
      {icon}
    </div>
    <span className="jc-arch-node-label">{label}</span>
    {sublabel && <span className="jc-arch-node-sub">{sublabel}</span>}
  </div>
);
