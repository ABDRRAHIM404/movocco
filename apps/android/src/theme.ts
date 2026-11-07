/**
 * Visual theme for the Movocco Android pilot (Level A).
 *
 * Design tokens from MOVOCCO_APK_DESIGN_4_7eff.md v1.0 (chosen design,
 * 2026-11-07): navy text, brand orange for the primary action only, brand
 * cyan for navigation / route lines, warm background, light mode default
 * with a real dark mode. The header logos are the supplied files:
 * logo-dark.png on dark surfaces, logo-light.png on light surfaces.
 * `accentText` is a darkened orange on light mode so text links still meet
 * WCAG AA contrast; filled primary buttons use `accent` with white text.
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
  background: '#FAF9F6',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#102B46',
  muted: '#607181',
  border: '#E4E9EC',
  accent: '#F36D3C',
  accentText: '#A8431A',
  accentSoft: '#FDEEE6',
  info: '#0D99B5',
  warning: '#8A5A00',
  danger: '#B42318',
  success: '#25866F',
  demo: '#7A3E00',
  demoBackground: '#FFF4E0',
  onAccent: '#FFFFFF',
};

export const darkPalette: Palette = {
  background: '#0D1826',
  surface: '#17283A',
  card: '#17283A',
  text: '#F5F8FD',
  muted: '#A9BAC9',
  border: '#30465A',
  accent: '#FF895D',
  accentText: '#FF895D',
  accentSoft: '#3A2417',
  info: '#4FC3DB',
  warning: '#FDB022',
  danger: '#F97066',
  success: '#5BC5A5',
  demo: '#FFB25E',
  demoBackground: '#3A2417',
  onAccent: '#102B46',
};

/** 8dp grid. Screen horizontal padding is 20dp (spacing.lg). */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 24,
  xxl: 32,
};

/** Card radius 18–22dp; inputs 16dp; small chips 8dp. */
export const radii = {
  sm: 8,
  md: 16,
  lg: 20,
};

/**
 * Base font sizes (points). Multiplied by the user's text-scale setting.
 * Headline 28–34, section 20–24, body 16, secondary 14 minimum.
 */
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
