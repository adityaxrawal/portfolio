export const ARCHITECTURE_TOKENS = {
  // Border radius used for the outer wrapper and inner nodes
  wrapperRadius: '10px',
  nodeRadius: '6px',
  
  // Colors
  wrapperBorder: '#e5e7eb',
  wrapperBg: '#ffffff',
  nodeBg: '#ffffff',
  nodeBorder: '#e5e7eb',
  footerBg: '#f8fafc',
  footerBorder: '#cbd5e1',
  arrowColor: '#94a3b8',
  
  // Body background
  columnBodyBg: '#fafafa',
  
  // Spacing (used primarily via CSS vars or container queries)
  columnGap: '1.5rem',
  nodeGap: '1rem',
  
  // Opacity for the header background
  headerBgOpacity: 0.12,
};

/**
 * Helper to convert hex to rgba for the header background
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
