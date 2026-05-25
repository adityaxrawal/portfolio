import { Fragment } from 'react';
import type { ArchitectureDiagramConfig } from '../../types/architecture.types';
import { ArchitectureRow } from './ArchitectureRow';
import { ArchitectureVerticalConnector } from './ArchitectureVerticalConnector';
import './Architecture.css';

interface Props {
  config: ArchitectureDiagramConfig;
}

export function ArchitectureDiagram({ config }: Props) {
  const rows = config.rows ?? [];

  return (
    <div className="arch-v-diagram">
      {/* Layered rows body */}
      <div className="arch-v-body">
        {rows.map((row, index) => (
          <Fragment key={row.id}>
            <ArchitectureRow row={row} />
            {/* Vertical connector between this row and the next */}
            {index < rows.length - 1 && row.connectorToNext !== 'none' && (
              <ArchitectureVerticalConnector
                style={row.connectorToNext ?? 'solid'}
                arrowCount={row.connectorArrowCount ?? row.nodes.length}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
