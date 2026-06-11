import { Fragment, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

import type { ArchitectureDiagramConfig } from '../../types/architecture.types';

import { ArchitectureRow } from './ArchitectureRow';
import { ArchitectureVerticalConnector } from './ArchitectureVerticalConnector';
import { useIsSlideActive } from '../../../../components/ui/SnapLayout/SlideActiveContext';
import './Architecture.css';

interface Props {
  config: ArchitectureDiagramConfig;
}

export function ArchitectureDiagram({ config }: Props) {
  const rows = useMemo(() => config.rows ?? [], [config.rows]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSlideActive = useIsSlideActive();

  useEffect(() => {
    if (!containerRef.current || rows.length === 0 || !isSlideActive) return;
    
    const ctx = gsap.context(() => {
      const rowElements = gsap.utils.toArray('.arch-v-row') as HTMLElement[];
      const connectorRows = gsap.utils.toArray('.arch-v-connector-row') as HTMLElement[];
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });

      rowElements.forEach((row, index) => {
        const label = row.querySelector('.arch-v-layer-label');
        const nodes = row.querySelectorAll('.arch-v-node-wrapper');
        const intraArrows = row.querySelectorAll('.arch-v-intra-arrow');
        
        // 1. Slide in label
        if (label) {
          tl.fromTo(label, 
            { x: -20, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 
            index === 0 ? 0 : '-=0.2'
          );
        }

        // 2. Pop in nodes
        if (nodes.length > 0) {
          tl.fromTo(nodes,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.7)' },
            '-=0.2'
          );
        }

        // Intra-row horizontal arrows
        if (intraArrows.length > 0) {
          const lines = Array.from(intraArrows).map(a => a.querySelector('.arch-v-intra-arrow-line'));
          const heads = Array.from(intraArrows).map(a => a.querySelector('.arch-v-intra-arrow-head'));
          
          if (lines.length > 0) {
            tl.fromTo(lines,
              { scaleX: 0, transformOrigin: 'left' },
              { scaleX: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
              '-=0.3'
            ).fromTo(heads,
              { opacity: 0, x: -5 },
              { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' },
              '<'
            );
          }
        }

        // 3. Downward connectors
        if (index < connectorRows.length) {
          const lines = connectorRows[index].querySelectorAll('.arch-v-connector-line');
          const heads = connectorRows[index].querySelectorAll('.arch-v-connector-arrowhead');
          
          tl.fromTo(lines,
            { scaleY: 0, transformOrigin: 'top' },
            { scaleY: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
            '-=0.1'
          ).fromTo(heads,
            { opacity: 0, y: -5 },
            { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' },
            '<'
          );
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [rows, isSlideActive]);

  return (
    <div ref={containerRef} className="arch-v-diagram">
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
