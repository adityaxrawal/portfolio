interface Props {
  /** Visual style of the downward connector */
  style: 'solid' | 'dashed';
  /**
   * Number of arrow lines to render.
   * Each arrow is flex-aligned with the corresponding node above/below,
   * because we use the same flex proportions as the nodes row.
   */
  arrowCount: number;
}

export function ArchitectureVerticalConnector({ style, arrowCount }: Props) {
  const isDashed = style === 'dashed';

  return (
    <div
      className={`arch-v-connector-row${isDashed ? ' arch-v-connector-row--dashed' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Spacer that mirrors: label (80px) + divider (1.5px) + divider margin-right (12px) */}
      <div className="arch-v-connector-spacer" />

      {/* Arrow lines — same flex layout as arch-v-nodes so they align with nodes */}
      <div className="arch-v-connector-arrows">
        {Array.from({ length: arrowCount }).map((_, i) => (
          <div key={i} className="arch-v-connector-arrow-item">
            <div className="arch-v-connector-line" />
            <span className="arch-v-connector-arrowhead">↓</span>
          </div>
        ))}
      </div>
    </div>
  );
}
