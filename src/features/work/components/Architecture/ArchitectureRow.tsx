import { Fragment } from 'react';
import type { ArchitectureRow as RowType } from '../../types/architecture.types';
import { ArchitectureNode } from './ArchitectureNode';

interface Props {
  row: RowType;
}

export function ArchitectureRow({ row }: Props) {
  const isWide = row.nodes.length === 1;

  /** Returns true if this nodeId has an outgoing intra-row arrow */
  function hasArrowAfter(nodeId: string): boolean {
    return (row.intraRowArrows ?? []).some(a => a.from === nodeId);
  }

  function arrowStyle(nodeId: string): 'dashed' | 'solid' {
    return (row.intraRowArrows ?? []).find(a => a.from === nodeId)?.style ?? 'dashed';
  }

  return (
    <div className="arch-v-row">
      {/* Left sidebar: layer label */}
      <div className="arch-v-layer-label">{row.layerLabel}</div>

      {/* Thin vertical divider */}
      <div className="arch-v-layer-divider" aria-hidden="true" />

      {/* Nodes + intra-row arrows */}
      <div className={`arch-v-nodes${isWide ? ' arch-v-nodes--wide' : ''}`}>
        {row.nodes.map(node => (
          <Fragment key={node.id}>
            <ArchitectureNode node={node} />
            {hasArrowAfter(node.id) && (
              <div
                className={`arch-v-intra-arrow arch-v-intra-arrow--${arrowStyle(node.id)}`}
                aria-hidden="true"
              >
                <div className="arch-v-intra-arrow-line" />
                <span className="arch-v-intra-arrow-head">›</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
