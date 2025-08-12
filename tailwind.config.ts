import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#000000',
        'primary-foreground': '#ffffff',
        accent: '#0066ff',
        'accent-foreground': '#ffffff',
        muted: '#f5f5f5',
        'muted-foreground': '#666666',
        border: '#e5e5e5',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-aeonik)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
