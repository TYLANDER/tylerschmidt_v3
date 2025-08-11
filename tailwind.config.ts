import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0066FF',
        accent2: '#00FF7F',
        ink: '#111111',
        muted: '#F5F5F5',
        bg: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Aeonik', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1320px' },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0,0,0.2,1)',
      },
      transitionDuration: {
        200: '200ms',
        250: '250ms',
        300: '300ms',
        350: '350ms',
        400: '400ms',
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(0,0,0,.08)',
      },
      borderRadius: {
        md: '8px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
      },
    },
  },
  plugins: [],
}

export default config


