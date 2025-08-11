# Precision Bold Design System

## Overview

This portfolio uses a minimalist design system that automatically adapts to your local sunrise and sunset times. The theme switching is completely automatic - no toggle required. The site naturally transitions from light to dark mode based on the sun's position in your location.

## Automatic Sun-Based Theming 🌅

### How It Works

1. **Location Detection** (Privacy-First)
   - IP-based geolocation (city-level accuracy, no permissions)
   - Optional browser geolocation (exact location, requires permission)
   - Timezone fallback (ensures it always works)

2. **Sun Calculations**
   - Uses NOAA astronomical algorithms
   - Calculates sunrise, sunset, and civil twilight
   - Updates automatically throughout the day
   - Smooth transitions during dawn/dusk

3. **Theme Application**
   - Light theme during daylight hours
   - Dark theme during nighttime
   - 1-second fade transitions at twilight
   - No flash of wrong theme on load

### Privacy & Performance

- **Zero tracking**: Location data stays in your browser
- **Fast loading**: ~50ms for geolocation via edge functions
- **Cached calculations**: Sun times cached for 24 hours
- **Graceful degradation**: Falls back to system preference if needed

### Technical Implementation

```typescript
// The magic happens in three key modules:

// 1. Sun calculations (src/lib/sun-calc.ts)
const sunTimes = calculateSunTimes({ latitude, longitude })
const theme = getThemeFromSunTimes(sunTimes)

// 2. Geolocation (src/lib/geolocation.ts)
const location = await getUserCoordinates() // Hybrid approach

// 3. Theme provider (src/components/sun-theme-provider.tsx)
<SunThemeProvider>
  {/* Your app - theme automatically managed */}
</SunThemeProvider>
```

## Color System

### Design Principles

- **Minimal palette**: Focus on content, not decoration
- **High contrast**: Excellent readability in all conditions
- **Automatic adaptation**: Colors change based on time of day
- **Consistent experience**: Same design language, different moods

### Color Tokens

All colors use CSS custom properties that automatically switch:

```css
/* Light Theme (Daytime) */
--background: #FFFFFF       /* Pure white */
--foreground: #111111       /* Deep ink */
--accent: #0066FF          /* Bright blue */
--muted: #F5F5F5          /* Light gray */

/* Dark Theme (Nighttime) */
--background: #0A0A0A       /* Near black */
--foreground: #FAFAFA       /* Off-white */
--accent: #3B82F6          /* Softer blue */
--muted: #1A1A1A          /* Dark gray */
```

### Usage in Components

```tsx
// ❌ Don't use hardcoded colors
<div className="text-black bg-white">

// ✅ Use semantic color utilities
<div className="text-foreground bg-background">

// ✅ These automatically adapt to the current theme
<button className="bg-accent text-accent-foreground">
```

## Typography

### Font Stack

- **Headings**: Aeonik (Custom font) - Bold, modern, geometric
- **Body**: Inter (System fallback) - Clean, readable, versatile

### Type Scale

Fluid typography that scales with viewport:

- Display: `3rem → 6rem` (48px → 96px)
- H1: `2.5rem → 4.5rem` (40px → 72px)  
- H2: `2rem → 3rem` (32px → 48px)
- H3: `1.5rem → 2rem` (24px → 32px)
- Body: `1rem` (16px)

## Spacing System

Based on 4px grid for consistency:

- `spacing-1`: 4px
- `spacing-2`: 8px
- `spacing-3`: 12px
- `spacing-4`: 16px
- `spacing-6`: 24px
- `spacing-8`: 32px
- `spacing-12`: 48px
- `spacing-16`: 64px
- `spacing-24`: 96px

## Animation & Transitions

### Micro-interactions

- **Hover states**: 200-300ms ease-out
- **Page transitions**: 600ms ease-in-out
- **Theme transitions**: 1000ms ease (during sunrise/sunset)
- **Focus states**: Instant (for accessibility)

### Motion Principles

1. **Purposeful**: Every animation has a reason
2. **Smooth**: 60fps performance is non-negotiable
3. **Subtle**: Enhance, don't distract
4. **Natural**: Movements follow real-world physics

## Components

### Design Patterns

1. **Cards**: Subtle borders, hover elevations
2. **Buttons**: Multiple variants (primary, outline, ghost)
3. **Forms**: Minimal styling, clear focus states
4. **Navigation**: Sticky header with scroll effects

### Accessibility

- WCAG AA compliant color contrast
- Keyboard navigation support
- Focus indicators on all interactive elements
- Semantic HTML structure
- Screen reader friendly

## Development Guidelines

### Adding New Components

1. Use semantic color tokens (never hardcode)
2. Test in both light and dark themes
3. Ensure smooth theme transitions
4. Follow the spacing grid
5. Add proper TypeScript types

### Testing Theme Behavior

```bash
# Test different times of day
# Open DevTools Console and run:
localStorage.setItem('theme', 'dark')  # Force dark
localStorage.setItem('theme', 'light') # Force light
localStorage.removeItem('theme')       # Auto mode
```

### Performance Tips

1. Colors are CSS-only (no JS recalculation)
2. Theme switches via single class toggle
3. Transitions use GPU-accelerated properties
4. Sun calculations cached for 24 hours

## Edge Cases Handled

- **Polar regions**: Handles extreme latitudes gracefully
- **VPN users**: Falls back to timezone estimation
- **No location**: Uses system preference
- **Rapid travel**: Recalculates on page load
- **Performance mode**: Respects reduced-motion preference

## Future Enhancements

- [ ] Golden hour color temperature adjustments
- [ ] Seasonal theme variations
- [ ] Manual override gesture (for demos)
- [ ] Theme transition scheduling API
- [ ] Aurora mode for far northern users

---

The goal is simple: Create a browsing experience that feels as natural as the world outside your window. The site should feel right whether you're working late at night or browsing with your morning coffee - all without you having to think about it.
