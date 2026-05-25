import type { CSSProperties, ComponentType } from 'react';
import type { ArchitectureNode as NodeType } from '../../types/architecture.types';
import { ARCHITECTURE_ICONS } from '../../constants/architecture.icons';

interface Props {
  node: NodeType;
  /** @deprecated Legacy prop kept for backward compat with old column-based components */
  accentColor?: string;
}

export function ArchitectureNode({ node }: Props) {
  const isHighlight = node.highlight === true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = node.icon ? (ARCHITECTURE_ICONS[node.icon] as ComponentType<any>) : null;

  const iconColor = node.iconColor ?? '#64748b';

  const nodeStyle: CSSProperties = {
    '--arch-node-accent': iconColor,
  } as CSSProperties;

  return (
    <div className="arch-v-node-wrapper">
      <div
        className={`arch-v-node${isHighlight ? ' arch-v-node--highlight' : ''}`}
        style={nodeStyle}
      >
        {IconComponent && (
          <span className="arch-v-node-icon" aria-hidden="true" style={{ color: iconColor }}>
            <IconComponent size={15} />
          </span>
        )}
        <div className="arch-v-node-text">
          <span className="arch-v-node-label">{node.label}</span>
          {node.subLabel && (
            <span className="arch-v-node-sublabel">{node.subLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}
