/**
 * @file tokens.ts
 * @description Auto-mapped from color-palette.json — do not hand-edit.
 * Source of truth is CSS custom properties in src/assets/styles/globals.css.
 *
 * Usage:
 *   import { tokens, token } from '@/styles/tokens';
 *   const bg = tokens.light.background.base; // '#F3F0EB'
 *   const cssVar = token('background.base'); // 'var(--color-background-base)'
 */

export const tokens = {
  light: {
    background: {
      base: '#F3F0EB',
      secondary: '#DDDAD6',
      tertiary: '#CCC9C4',
      inverse: '#1C1C1B',
    },
    surface: {
      default: '#ECE8E2',
      raised: '#F7F4F0',
      overlay: '#FFFFFF',
      sunken: '#E2DED8',
      card: '#EDEAE4',
      tooltip: '#2B2A28',
      popover: '#FFFFFF',
    },
    border: {
      subtle: '#E0DDD8',
      default: '#BDBCB9',
      strong: '#9C9A96',
      focus: '#8B7355',
      card: '#D6D3CE',
      grid: '#EBE8E3',
      divider: '#E5E2DD',
      inverse: '#4A4845',
    },
    text: {
      primary: '#101010',
      secondary: '#2E2E2E',
      tertiary: '#4A4A4A',
      muted: '#777674',
      soft: '#A3A19E',
      disabled: '#C4C2BF',
      inverse: '#F4F1E8',
      link: '#8B7355',
      linkHover: '#6B5540',
    },
    typography: {
      heading: '#0D0D0D',
      body: '#1E1E1E',
      caption: '#777674',
      label: '#4A4A4A',
      code: '#5C4B32',
      quote: '#6B5540',
    },
    brand: {
      primary: {
        default: '#8B7355',
        hover: '#7A6347',
        active: '#6B5540',
        subtle: '#F0EAE0',
        muted: '#E8DDD0',
      },
      accent: {
        default: '#C4956A',
        hover: '#B5825A',
        active: '#A6714C',
        subtle: '#FAF0E6',
        muted: '#F5E6D5',
        focusRing: '#C4956A',
      },
    },
    semantic: {
      success: {
        bg: '#EDFAF3',
        bgHover: '#D8F4E8',
        border: '#6FCF97',
        default: '#27AE60',
        strong: '#1E8449',
        text: '#1A5E36',
      },
      error: {
        bg: '#FEF0F0',
        bgHover: '#FDDDDD',
        border: '#F28B82',
        default: '#EB5757',
        strong: '#C0392B',
        text: '#7B1F1F',
      },
      warning: {
        bg: '#FFF8ED',
        bgHover: '#FEEFD6',
        border: '#F2A65A',
        default: '#E67E22',
        strong: '#CA6F1E',
        text: '#784212',
      },
      info: {
        bg: '#EFF6FF',
        bgHover: '#DBEAFE',
        border: '#93C5FD',
        default: '#3B82F6',
        strong: '#1D4ED8',
        text: '#1E3A8A',
      },
    },
    interactive: {
      primary: '#8B7355',
      primaryHover: '#7A6347',
      primaryActive: '#6B5540',
      secondary: '#ECE8E2',
      secondaryHover: '#E2DED8',
      ghost: 'transparent',
      ghostHover: '#F0EAE0',
      focusRing: '#8B7355',
      disabled: '#D6D3CE',
      disabledText: '#A3A19E',
    },
    shadow: {
      xs: '0 1px 2px rgba(0,0,0,0.05)',
      sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
      lg: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
      xl: '0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04)',
      inner: 'inset 0 2px 4px rgba(0,0,0,0.06)',
    },
    dataViz: {
      series: {
        1: '#8B7355',
        2: '#C4956A',
        3: '#6B9E8A',
        4: '#5B8FB9',
        5: '#A07BC4',
        6: '#C46B6B',
        7: '#7BA882',
        8: '#B8A060',
      },
      axis: '#9C9A96',
      gridLine: '#E0DDD8',
      label: '#777674',
    },
    badge: {
      neutral: { bg: '#EDEAE4', text: '#4A4A4A', border: '#D6D3CE' },
      primary: { bg: '#F0EAE0', text: '#6B5540', border: '#C4B49A' },
      accent: { bg: '#FAF0E6', text: '#A6714C', border: '#DEB896' },
      success: { bg: '#EDFAF3', text: '#1A5E36', border: '#A3D9B8' },
      error: { bg: '#FEF0F0', text: '#7B1F1F', border: '#F2AAAA' },
      warning: { bg: '#FFF8ED', text: '#784212', border: '#F5C98A' },
      info: { bg: '#EFF6FF', text: '#1E3A8A', border: '#BFDBFE' },
    },
    input: {
      bg: '#FFFFFF',
      bgDisabled: '#F3F0EB',
      border: '#BDBCB9',
      borderHover: '#9C9A96',
      borderFocus: '#8B7355',
      text: '#101010',
      placeholder: '#A3A19E',
      label: '#2E2E2E',
      helper: '#777674',
      errorBorder: '#EB5757',
      successBorder: '#27AE60',
    },
    skeleton: {
      base: '#E2DED8',
      highlight: '#F0EDE8',
    },
    misc: {
      overlay: 'rgba(16,16,16,0.50)',
      scrollbar: '#BDBCB9',
      selection: 'rgba(139,115,85,0.20)',
    },
  },
  dark: {
    background: {
      base: '#1C1C1B',
      secondary: '#232321',
      tertiary: '#2B2A28',
      inverse: '#F3F0EB',
    },
    surface: {
      default: '#2B2A28',
      raised: '#333230',
      overlay: '#3A3937',
      sunken: '#1A1918',
      card: '#2A2927',
      tooltip: '#ECE8E2',
      popover: '#2E2D2B',
    },
    border: {
      subtle: '#2E2D2B',
      default: '#4A4845',
      strong: '#6B6866',
      focus: '#C4956A',
      card: '#3A3936',
      grid: '#242423',
      divider: '#333231',
      inverse: '#BDBCB9',
    },
    text: {
      primary: '#F4F1E8',
      secondary: '#E7E1D3',
      tertiary: '#C8C1B3',
      muted: '#77736D',
      soft: '#B5AEA1',
      disabled: '#4A4845',
      inverse: '#101010',
      link: '#C4956A',
      linkHover: '#DEB896',
    },
    typography: {
      heading: '#F4F1E8',
      body: '#E7E1D3',
      caption: '#77736D',
      label: '#C8C1B3',
      code: '#C4956A',
      quote: '#B5AEA1',
    },
    brand: {
      primary: {
        default: '#C4956A',
        hover: '#DEB896',
        active: '#B5825A',
        subtle: '#2E2620',
        muted: '#3A3028',
      },
      accent: {
        default: '#E8A87C',
        hover: '#F0BF97',
        active: '#D4956A',
        subtle: '#2E2418',
        muted: '#3A2E20',
        focusRing: '#E8A87C',
      },
    },
    semantic: {
      success: {
        bg: '#0D2818',
        bgHover: '#12361F',
        border: '#3DDC84',
        default: '#3DDC84',
        strong: '#6FE8A8',
        text: '#A8F0CC',
      },
      error: {
        bg: '#2A0D0D',
        bgHover: '#3A1212',
        border: '#FF6B6B',
        default: '#FF6B6B',
        strong: '#FF9494',
        text: '#FFBEBE',
      },
      warning: {
        bg: '#2A1A08',
        bgHover: '#3A2410',
        border: '#FF9F43',
        default: '#FF9F43',
        strong: '#FFBC70',
        text: '#FFD9A8',
      },
      info: {
        bg: '#0A1628',
        bgHover: '#0F1E38',
        border: '#5DA9FF',
        default: '#5DA9FF',
        strong: '#8FC5FF',
        text: '#BDD9FF',
      },
    },
    interactive: {
      primary: '#C4956A',
      primaryHover: '#DEB896',
      primaryActive: '#B5825A',
      secondary: '#2B2A28',
      secondaryHover: '#333230',
      ghost: 'transparent',
      ghostHover: '#2E2620',
      focusRing: '#C4956A',
      disabled: '#2E2D2B',
      disabledText: '#4A4845',
    },
    shadow: {
      xs: '0 1px 2px rgba(0,0,0,0.30)',
      sm: '0 1px 3px rgba(0,0,0,0.40), 0 1px 2px rgba(0,0,0,0.24)',
      md: '0 4px 6px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.20)',
      lg: '0 10px 15px rgba(0,0,0,0.40), 0 4px 6px rgba(0,0,0,0.20)',
      xl: '0 20px 25px rgba(0,0,0,0.50), 0 8px 10px rgba(0,0,0,0.24)',
      inner: 'inset 0 2px 4px rgba(0,0,0,0.40)',
    },
    dataViz: {
      series: {
        1: '#C4956A',
        2: '#E8A87C',
        3: '#6DB89A',
        4: '#5DA9FF',
        5: '#B47FD4',
        6: '#FF6B6B',
        7: '#7BCF90',
        8: '#D4B86A',
      },
      axis: '#6B6866',
      gridLine: '#2E2D2B',
      label: '#77736D',
    },
    badge: {
      neutral: { bg: '#2B2A28', text: '#C8C1B3', border: '#4A4845' },
      primary: { bg: '#2E2620', text: '#DEB896', border: '#6B5540' },
      accent: { bg: '#2E2418', text: '#E8A87C', border: '#7A5540' },
      success: { bg: '#0D2818', text: '#A8F0CC', border: '#1E6840' },
      error: { bg: '#2A0D0D', text: '#FFBEBE', border: '#6B1F1F' },
      warning: { bg: '#2A1A08', text: '#FFD9A8', border: '#6B3E10' },
      info: { bg: '#0A1628', text: '#BDD9FF', border: '#1A3A6B' },
    },
    input: {
      bg: '#2B2A28',
      bgDisabled: '#1C1C1B',
      border: '#4A4845',
      borderHover: '#6B6866',
      borderFocus: '#C4956A',
      text: '#F4F1E8',
      placeholder: '#4A4845',
      label: '#E7E1D3',
      helper: '#77736D',
      errorBorder: '#FF6B6B',
      successBorder: '#3DDC84',
    },
    skeleton: {
      base: '#2B2A28',
      highlight: '#333230',
    },
    misc: {
      overlay: 'rgba(0,0,0,0.70)',
      scrollbar: '#4A4845',
      selection: 'rgba(196,149,106,0.30)',
    },
  },
} as const;

export type Theme = keyof typeof tokens;
export type LightTokens = typeof tokens.light;
export type DarkTokens = typeof tokens.dark;

/**
 * Returns a CSS `var()` reference for a given dot-path token.
 * @example token('background.base') → 'var(--color-background-base)'
 * @example token('shadow.md')       → 'var(--shadow-md)'
 */
export function token(path: string): string {
  // Shadow tokens use --shadow-*, not --color-*
  const isShadow = path.startsWith('shadow.');
  const varName = isShadow
    ? `--shadow-${path.replace('shadow.', '').replace(/\./g, '-')}`
    : `--color-${path.replace(/\./g, '-')}`;
  return `var(${varName})`;
}
