import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './client/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD1C1',
          300: '#FFB397',
          400: '#FF8B61',
          500: '#FF5A2A',  // Main primary
          600: '#E4491F',
          700: '#C23819',
          800: '#9F2D15',
          900: '#7A2210',
        },
        secondary: {
          50: '#F5F3F2',
          100: '#E6E2E0',
          200: '#CEC5C1',
          300: '#B5A8A2',
          400: '#8C7A73',
          500: '#5C4A42',
          600: '#433732',
          700: '#342B27',
          800: '#2A1A16',  // Main secondary
          900: '#1F1310',
        },
        success: {
          500: '#1D7A4E',
          600: '#166139',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        info: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#6B7280',
          700: '#525252',
          800: '#374151',
          900: '#111827',
          950: '#171717',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display-1': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['60px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3': ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Headings
        h1: ['30px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        h2: ['24px', { lineHeight: '1.3' }],
        h3: ['20px', { lineHeight: '1.4' }],
        h4: ['18px', { lineHeight: '1.4' }],
        h5: ['16px', { lineHeight: '1.5' }],
        h6: ['14px', { lineHeight: '1.5' }],
      },
      spacing: {
        // Escala de 4px
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'primary-glow': '0 0 20px rgba(255, 90, 42, 0.3)',
        'success-glow': '0 0 20px rgba(29, 122, 78, 0.3)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
