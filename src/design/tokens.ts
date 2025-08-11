export const tokens = {
  colors: {
    accent: '#0066FF', // switch to '#FF522B' to go red
    accent2: '#00FF7F',
    ink: '#111111',
    bg: '#FFFFFF',
    muted: '#F5F5F5',
  },
  radius: { sm: 6, md: 8 },
  shadow: '0 2px 8px rgba(0,0,0,.08)',
  spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96],
  type: {
    heading: 'Aeonik, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    scale: [96, 72, 48, 32, 24, 18, 16],
    lineHeight: {
      display: 1.3,
      body: 1.45,
    },
  },
} as const

export type Tokens = typeof tokens


