/**
 * Precision Punk Design Tokens
 * Where mathematical precision meets raw emotion
 */

export const precisionPunk = {
  // The Grid That Breathes
  grid: {
    base: 8, // The atomic unit
    golden: 1.618, // The mathematical beauty
    rebel: 1.414, // √2 - The irrational break
  },

  // Kinetic Type Scale - Based on musical intervals
  type: {
    // Perfect Fifth (3:2 ratio) progression
    display: 'clamp(4rem, 12vw, 8rem)',      // The shout
    headline: 'clamp(2.667rem, 8vw, 5.333rem)', // The statement  
    title: 'clamp(1.777rem, 5vw, 3.555rem)',    // The emphasis
    body: 'clamp(1rem, 2vw, 1.185rem)',         // The conversation
    detail: 'clamp(0.889rem, 1.5vw, 1rem)',     // The whisper
  },

  // Rhythm & Timing - Based on heartbeat
  motion: {
    pulse: '860ms',     // Average human heartbeat
    quick: '215ms',     // Quarter beat
    flow: '430ms',      // Half beat
    breath: '1720ms',   // Double beat
    suspend: '3440ms',  // Held breath
  },

  // Emotional Mathematics - Easing curves
  easing: {
    precision: 'cubic-bezier(0.23, 1, 0.32, 1)',      // Swiss watch
    punk: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',  // Elastic rebellion
    breathe: 'cubic-bezier(0.37, 0, 0.63, 1)',       // Natural rhythm
    impact: 'cubic-bezier(0.87, 0, 0.13, 1)',        // Emotional hit
  },

  // Living Color System
  color: {
    // The Brutalist Base
    void: '#000000',
    raw: '#0A0A0A',
    concrete: '#1A1A1A',
    steel: '#2D2D2D',
    
    // The Precision Light
    pure: '#FFFFFF',
    ghost: '#FAFAFA',
    smoke: '#F0F0F0',
    ash: '#E0E0E0',
    
    // The Punk Accent - High voltage
    voltage: '#0066FF',     // Primary current
    danger: '#FF0044',      // Warning signal
    acid: '#00FF88',        // Digital nature
    plasma: '#FF00FF',      // Synthetic rebellion
  },

  // Breaking Points - Where the grid rebels
  breakpoints: {
    crack: '428px',   // Where mobile breaks
    fault: '768px',   // Where tablet fractures  
    quake: '1280px',  // Where desktop shifts
    void: '1920px',   // Where cinema begins
  },

  // Z-Index Layers - The dimensional stack
  layers: {
    buried: -1,
    ground: 0,
    float: 10,
    rise: 100,
    hover: 1000,
    modal: 10000,
    system: 100000,
  },
}
