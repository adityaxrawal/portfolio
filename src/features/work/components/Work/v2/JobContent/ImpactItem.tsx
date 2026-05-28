import type { FC, ReactNode } from 'react';

import type { MetricColor } from '../../../../types/work.types';

export interface ImpactItemProps {
  icon: ReactNode;
  color: MetricColor;
  text: string;
}

export const ImpactItem: FC<ImpactItemProps> = ({ icon, color, text }) => (
  <div className="jc-impact-item">
    <div className={`jc-impact-icon jc-impact-icon-${color}`}>{icon}</div>
    <div className="jc-impact-text">
      <span className="jc-impact-desc">{text}</span>
    </div>
  </div>
);
