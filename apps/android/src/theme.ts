/**
 * Visual theme for the Movocco Android pilot (Level A).
 *
 * IMPORTANT: the final brand palette, logo, fonts and design system are NOT
 * approved yet (see master-prompt.md §14 and DECISIONS.md). The accent
 * colours below are sampled from the supplied Movocco logo artwork only
 * (orange road / cyan wave) so the pilot stays visually consistent with the
 * logo. They are provisional, not the approved brand palette.
 * The header logos are the supplied files: logo-dark.png on dark surfaces,
 * logo-light.png on light surfaces.
 */

export interface Palette {
  background: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  info: string;
  warning: string;
  danger: string;
  success: string;
  demo: string;
  demoBackground: string;
  onAccent: string;
}

export const lightPalette: Palette = {
  background: '#FFFFFF',
  surface: '#F4F6F8',
  card: '#FFFFFF',
  text: '#101828',
  muted: '#475467',
  border: '#E4E7EC',
  accent: '#C2570B',
  accentText: '#9A4A08',
  accentSoft: '#FDF0E3',
  info: '#0B6FA4',
  warning: '#8A5A00',
  danger: '#B42318',
  success: '#067647',
  demo: '#7A3E00',
  demoBackground: '#FFF4E0',
  onAccent: '#FFFFFF',
};

export const darkPalette: Palette = {
  background: '#0A1526',
  surface: '#12233D',
  card: '#12233D',
  text: '#F2F5F9',
  muted: '#A8B3C5',
  border: '#24344D',
  accent: '#F5821F',
  accentText: '#FFB25E',
  accentSoft: '#2A1D10',
  info: '#5BC0EB',
  warning: '#FDB022',
  danger: '#F97066',
  success: '#32D583',
  demo: '#FFB25E',
  demoBackground: '#2A1D10',
  onAccent: '#1A1206',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
};

/** Base font sizes (points). Multiplied by the user's text-scale setting. */
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export function scaled(size: number, textScale: number): number {
  return Math.round(size * textScale);
}

export function paletteFor(scheme: 'light' | 'dark' | null): Palette {
  return scheme === 'dark' ? darkPalette : lightPalette;
}
