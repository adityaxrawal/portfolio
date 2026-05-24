import type { FC, ReactNode } from 'react';

import type { MetricColor } from '../../../../types/work.types';

export interface MetricCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  color: MetricColor;
}

export const MetricCard: FC<MetricCardProps> = ({
  icon,
  value,
  label,
  color,
}) => (
  <div className={`jc-metric-card jc-metric-${color}`}>
    <div className={`jc-metric-icon jc-metric-icon-${color}`}>{icon}</div>
    <div className="jc-metric-value">{value}</div>
    <div className="jc-metric-label">{label}</div>
  </div>
);
