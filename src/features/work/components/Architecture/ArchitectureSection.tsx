import type { ArchitectureColumn } from '../../types/architecture.types';
import { hexToRgba } from '../../constants/architecture.constants';
import { ArchitectureNode } from './ArchitectureNode';

interface Props {
  column: ArchitectureColumn;
}

export function ArchitectureSection({ column }: Props) {
  const { title, accent, nodes } = column;

  return (
    <div
      className="arch-column"
      style={{ borderColor: accent }}
    >
      <div
        className="arch-column-header"
        style={{
          backgroundColor: hexToRgba(accent, 0.12),
          color: accent,
          borderBottomColor: hexToRgba(accent, 0.3),
        }}
      >
        {title}
      </div>
      <div className="arch-column-body">
        {nodes.map(node => (
          <ArchitectureNode
            key={node.id}
            node={node}
            accentColor={accent}
          />
        ))}
      </div>
    </div>
  );
}
