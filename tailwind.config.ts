import type { Config } from 'tailwindcss'

/**
 * Tailwind CSS Configuration - Precision Bold Design System
 * 
 * This configuration extends Tailwind with our custom design tokens
 * while maintaining full compatibility with the automatic sun-based
 * theme switching system.
 * 
 * Key Features:
 * - All colors reference CSS variables for theme switching
 * - Custom spacing scale based on 4px grid system
 * - Extended animations for micro-interactions
 * - Typography scale optimized for both light/dark themes
 */

const config: Config = {
  darkMode: 'class', // Enables .dark class for theme switching
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Color Palette
         * 
         * All colors use CSS custom properties (variables) that
         * automatically update when the theme changes. This ensures
         * consistent theming without manual dark: variants.
         * 
         * The actual color values are defined in globals.css and
         * change based on whether it's day or night in your location.
         */
        
        // Primary brand colors
        accent: 'var(--accent)',           // Blue - CTAs, links, focus
        accent2: '#00FF7F',               // Green - success, secondary accent
        
        // Legacy color mappings (for backward compatibility)
        ink: 'var(--foreground)',         // Main text color
        muted: 'var(--muted)',           // Muted backgrounds
        bg: 'var(--background)',         // Main background
        
        // Semantic color mappings
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        ring: 'var(--ring)',
      },
      fontFamily: {
        heading: ['var(--font-aeonik)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config


