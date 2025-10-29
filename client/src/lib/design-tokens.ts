/**
 * JáRespondi - Design Tokens
 * Sistema de design completo
 * 
 * Fontes: Space Grotesk (títulos) + Inter (corpo)
 * Paleta: Laranja (#FF5A2A) + Café (#2A1A16)
 */

// ============================================================================
// CORES
// ============================================================================

export const colors = {
  // -------------------- PRIMARY (Laranja - Marca) --------------------
  primary: {
    50: '#FFF5F2',
    100: '#FFE4DC',
    200: '#FFC9B8',
    300: '#FFA38A',
    400: '#FF7A5C',
    500: '#FF5A2A', // Principal
    600: '#E4491F',
    700: '#CC3C19',
    800: '#A33016',
    900: '#7A2411',
  },

  // -------------------- SECONDARY (Café - Complementar) --------------------
  secondary: {
    50: '#F9F6F4',
    100: '#F3E9E5',
    200: '#EADDD7',
    300: '#D4C4BC',
    400: '#B9ADA8',
    500: '#8A6B61',
    600: '#6B5349',
    700: '#4A3730',
    800: '#2A1A16', // Principal
    900: '#1E120F',
  },

  // -------------------- NEUTRALS (Cinzas - Estrutura) --------------------
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },

  // -------------------- SEMÂNTICOS --------------------
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#1D7A4E', // Principal
    600: '#166343',
    700: '#124F36',
    800: '#0F3D2A',
    900: '#0A2C1F',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Principal
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Principal
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Principal
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // -------------------- SUPERFÍCIES & BACKGROUNDS --------------------
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F5F5F5',
  },

  // -------------------- TEXTOS --------------------
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    disabled: '#A3A3A3',
    inverse: '#FFFFFF',
  },

  // -------------------- BORDAS --------------------
  border: {
    light: '#E5E5E5',
    medium: '#D4D4D4',
    strong: '#A3A3A3',
  },
} as const;

// ============================================================================
// ÍCONES (Lucide React)
// ============================================================================

export const icons = {
  // -------------------- TAMANHOS --------------------
  sizes: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },

  // -------------------- STROKE WIDTH --------------------
  strokeWidth: {
    thin: 1.5,
    normal: 2,
    thick: 2.5,
  },

  // -------------------- CORES CONTEXTUAIS --------------------
  colors: {
    primary: colors.primary[500],
    secondary: colors.secondary[800],
    success: colors.success[500],
    error: colors.error[500],
    warning: colors.warning[500],
    info: colors.info[500],
    neutral: colors.neutral[600],
    muted: colors.neutral[400],
  },
} as const;

// Exportar tudo
export const tokens = {
  colors,
  icons,
} as const;

export default tokens;
