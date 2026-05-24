import type { ComponentType } from 'react';
import { ARCHITECTURE_ICONS } from '../../constants/architecture.icons';
import type { ArchitectureNode as NodeType } from '../../types/architecture.types';

interface Props {
  node: NodeType;
  accentColor: string;
}

export function ArchitectureNode({ node, accentColor }: Props) {
  const IconComponent = node.icon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (ARCHITECTURE_ICONS[node.icon] as ComponentType<any>)
    : null;

  return (
    <div className="arch-node">
      {IconComponent && (
        <div className="arch-node-icon-wrapper" style={{ color: accentColor }}>
          <IconComponent />
        </div>
      )}
      <span className="arch-node-label">{node.label}</span>
      {node.subLabel && (
        <span className="arch-node-sublabel" style={{ color: accentColor }}>
          {node.subLabel}
        </span>
      )}
    </div>
  );
}

