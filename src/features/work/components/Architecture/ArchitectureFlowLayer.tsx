import type { ComponentType } from 'react';
import type { ArchitectureFooterBand as FooterType } from '../../types/architecture.types';
import { ArchitectureNode } from './ArchitectureNode';
import { ARCHITECTURE_ICONS } from '../../constants/architecture.icons';

interface Props {
  footer: FooterType;
}

const ASYNC_VARIANTS = new Set(['events', 'workers']);
const INFRA_VARIANTS = new Set(['devops', 'security']);

function getBadgeLabel(variant: FooterType['variant']): string | null {
  if (!variant || variant === 'default') return null;
  if (ASYNC_VARIANTS.has(variant)) return 'ASYNC';
  if (INFRA_VARIANTS.has(variant)) return 'INFRA';
  return null;
}

export function ArchitectureFlowLayer({ footer }: Props) {
  const variant = footer.variant ?? 'default';
  const variantClass =
    variant !== 'default' ? ` arch-footer-band--${variant}` : '';
  const badgeLabel = getBadgeLabel(variant);
  const isInfra = INFRA_VARIANTS.has(variant);

  const IconComponent = footer.icon
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (ARCHITECTURE_ICONS[footer.icon] as ComponentType<any>)
    : null;

  return (
    <div className={`arch-footer-band${variantClass}`}>
      {footer.title && (
        <div className="arch-footer-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5cqmin' }}>
            {IconComponent && <IconComponent size={18} />}
            {footer.title}
          </span>
          {badgeLabel && (
            <span
              className={`arch-footer-type-badge${isInfra ? ' arch-footer-type-badge--infra' : ''}`}
            >
              {badgeLabel}
            </span>
          )}
        </div>
      )}
      <div className="arch-footer-nodes">
        {footer.nodes.map(node => (
          <ArchitectureNode
            key={node.id}
            node={node}
            accentColor={isInfra ? '#64748b' : '#f59e0b'} /* TODO: palette - accent node color */
          />
        ))}
      </div>
    </div>
  );
}

