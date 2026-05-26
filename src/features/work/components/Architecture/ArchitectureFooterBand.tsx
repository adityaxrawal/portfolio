import type { ArchitectureFooterBand as FooterType } from '../../types/architecture.types';

import { ArchitectureNode } from './ArchitectureNode';

interface Props {
  footer: FooterType;
}

export function ArchitectureFooterBand({ footer }: Props) {
  return (
    <div className="arch-footer-band">
      {footer.title && <div className="arch-footer-header">{footer.title}</div>}
      <div className="arch-footer-nodes">
        {footer.nodes.map((node) => (
          <ArchitectureNode key={node.id} node={node} accentColor="#475569" />
        ))}
      </div>
    </div>
  );
}
