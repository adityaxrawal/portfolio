import type { ArchitectureColumn as ColumnType } from '../../types/architecture.types';
import { hexToRgba } from '../../constants/architecture.constants';
import { ArchitectureNode } from './ArchitectureNode';

interface Props {
  column: ColumnType;
}

export function ArchitectureColumn({ column }: Props) {
  const { title, accent, nodes } = column;

  return (
    <div
      className="arch-column"
      style={{
        borderColor: accent,
      }}
    >
      <div
        className="arch-column-header"
        style={{
          backgroundColor: hexToRgba(accent, 0.12),
          color: accent,
          borderBottomColor: accent,
        }}
      >
        {title}
      </div>
      <div
        className="arch-column-body"
        style={{ borderTopColor: accent }}
      >
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
