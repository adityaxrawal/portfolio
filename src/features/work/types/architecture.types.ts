export type ArchitectureIconKey = string;

export type ArchCommunicationType = 'sync' | 'async' | 'both';
export type ArchFooterVariant = 'events' | 'workers' | 'devops' | 'security' | 'default';

/** Arrow style between rows */
export type ArchRowConnector = 'solid' | 'dashed' | 'none';

export interface ArchitectureNode {
  id: string;
  label: string;
  subLabel?: string;
  icon?: ArchitectureIconKey;
  /** When true, renders an accent-coloured border + glow — marks the primary/core service */
  highlight?: boolean;
  /** Communication pattern hint for legend/tooltip rendering */
  communicationType?: ArchCommunicationType;
  /** Per-node icon color (overrides the row-level accent) */
  iconColor?: string;
}

// ── Legacy column-based types (kept for backward compat) ──────────

export interface ArchitectureColumn {
  id: string;
  title: string;
  accent: string;
  icon?: ArchitectureIconKey;
  nodes: ArchitectureNode[];
  wide?: boolean;
  /** Short protocol/pattern badge rendered in the column header, e.g. "REST", "Event-Driven" */
  badge?: string;
}

export interface ArchitectureFooterBand {
  id: string;
  title?: string;
  icon?: ArchitectureIconKey;
  nodes: ArchitectureNode[];
  /** Controls dashed/dotted border styling to visually distinguish async/infra layers */
  variant?: ArchFooterVariant;
}

// ── New row-based types ────────────────────────────────────────────

/** A single horizontal row/layer in the vertical diagram */
export interface ArchitectureRow {
  id: string;
  /** Label shown in the left sidebar, e.g. "CLIENT LAYER". Use \n for line breaks. */
  layerLabel: string;
  /** Nodes in this row — if only 1 node, it spans the full width */
  nodes: ArchitectureNode[];
  /** Arrow style connecting THIS row to the NEXT row */
  connectorToNext?: ArchRowConnector;
  /**
   * Number of arrow lines to render in the connector below this row.
   * Defaults to nodes.length.
   * Override when the next row has a different node count:
   *   e.g. a single BACKEND node branching to 4 DATA nodes → connectorArrowCount: 4
   */
  connectorArrowCount?: number;
  /** Optional: arrows between specific nodes within this row (e.g. Airflow → AWS Glue) */
  intraRowArrows?: Array<{ from: string; to: string; style?: 'dashed' | 'solid' }>;
}

export interface ArchitectureDiagramConfig {
  company: string;
  /** New vertical row-based layout */
  rows?: ArchitectureRow[];
  /** Legacy column-based layout — kept for backward compat, not rendered in new layout */
  columns?: ArchitectureColumn[];
  footerBands?: ArchitectureFooterBand[];
  showArrows?: boolean;
  /** When true, renders a sync/async communication legend — legacy, unused in row layout */
  legend?: boolean;
}
