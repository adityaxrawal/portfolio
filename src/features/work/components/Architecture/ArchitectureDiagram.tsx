import { Fragment } from 'react';
import type { ArchitectureDiagramConfig } from '../../types/architecture.types';
import { ArchitectureSection } from './ArchitectureSection';
import { ArchitectureConnector } from './ArchitectureConnector';
import { ArchitectureFlowLayer } from './ArchitectureFlowLayer';
import './Architecture.css';

interface Props {
  config: ArchitectureDiagramConfig;
}

export function ArchitectureDiagram({ config }: Props) {
  return (
    <div className="arch-diagram-wrapper">
      <div className="arch-content-scroll">
        {/* Main columns row */}
        <div className="arch-columns-row">
          {config.columns.map((column, index) => (
            <Fragment key={column.id}>
              <ArchitectureSection column={column} />
              {config.showArrows !== false && index < config.columns.length - 1 && (
                <ArchitectureConnector />
              )}
            </Fragment>
          ))}
        </div>

        {/* Footer bands */}
        {config.footerBands && config.footerBands.length > 0 && (
          <>
            {config.footerBands.map(footer => (
              <ArchitectureFlowLayer key={footer.id} footer={footer} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
