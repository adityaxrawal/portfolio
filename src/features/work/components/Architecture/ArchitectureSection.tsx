import type { ComponentType } from 'react';

import { hexToRgba } from '../../constants/architecture.constants';
import { ARCHITECTURE_ICONS } from '../../constants/architecture.icons';
import type { ArchitectureColumn } from '../../types/architecture.types';

import { ArchitectureNode } from './ArchitectureNode';

interface Props {
  column: ArchitectureColumn;
}

export function ArchitectureSection({ column }: Props) {
  const { title, accent, nodes, badge, icon } = column;

  const IconComponent = icon
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ARCHITECTURE_ICONS[icon] as ComponentType<any>)
    : null;

  return (
    <div className="arch-column" style={{ borderColor: accent }}>
      <div
        className="arch-column-header"
        style={{
          backgroundColor: hexToRgba(accent, 0.1),
          color: accent,
          borderBottomColor: hexToRgba(accent, 0.3),
        }}
      >
        <span
          style={{ display: 'flex', alignItems: 'center', gap: '0.5cqmin' }}
        >
          {IconComponent && <IconComponent size={16} />}
          {title}
        </span>

        {badge && (
          <span
            className="arch-column-badge"
            style={{ color: accent, borderColor: hexToRgba(accent, 0.5) }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="arch-column-body">
        {nodes.map((node) => (
          <ArchitectureNode key={node.id} node={node} accentColor={accent} />
        ))}
      </div>
    </div>
  );
}
