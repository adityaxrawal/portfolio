export type ArchitectureIconKey = string;

export interface ArchitectureNode {
  id: string;
  label: string;
  subLabel?: string;
  icon?: ArchitectureIconKey;
}

export interface ArchitectureColumn {
  id: string;
  title: string;
  accent: string;
  nodes: ArchitectureNode[];
  wide?: boolean; // Optional, can be used for spanning more space if needed
}

export interface ArchitectureFooterBand {
  id: string;
  title?: string;
  nodes: ArchitectureNode[];
}

export interface ArchitectureDiagramConfig {
  company: string;
  columns: ArchitectureColumn[];
  footerBands?: ArchitectureFooterBand[];
  showArrows?: boolean;
}
