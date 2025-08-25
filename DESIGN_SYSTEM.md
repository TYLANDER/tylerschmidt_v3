# Precision Bold Design System

> A comprehensive guide to the design language and interaction patterns for tylerschmidt.dev

## Table of Contents
- [Philosophy](#philosophy)
- [Visual Language](#visual-language)
- [Typography](#typography)
- [Color System](#color-system)
- [Spacing & Layout](#spacing--layout)
- [Interaction Patterns](#interaction-patterns)
- [Components](#components)
- [Animation Principles](#animation-principles)
- [Accessibility](#accessibility)
- [Performance Guidelines](#performance-guidelines)

---

## Philosophy

**Precision Bold (with Human Edge)** is a design philosophy that balances technical precision with human warmth. It's about being bold where it matters and quiet everywhere else.

### Core Principles
1. **Reduction Over Addition** - Strip away the unnecessary to reveal what truly matters
2. **Intentional Whitespace** - Space is not empty, it's full of possibility
3. **Bold Typography** - Let type do the heavy lifting
4. **Subtle Interactions** - Delight without distraction
5. **Performance First** - Speed is a feature

---

## Visual Language

### Grid System
- **Base Unit**: 8px
- **Container**: 1320px max-width
- **Columns**: 12-column grid with 32px gutters
- **Breakpoints**:
  - Mobile: 0-640px
  - Tablet: 641-1024px
  - Desktop: 1025px+

### Elevation
```css
/* Subtle elevation for depth */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.15);
```

---

## Typography

### Font Stack
```css
--font-heading: 'Aeonik', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
```

### Type Scale
| Level | Size | Line Height | Usage |
|-------|------|-------------|--------|
| Display | 96px | 1.1 | Hero headlines |
| H1 | 72px | 1.15 | Page titles |
| H2 | 48px | 1.2 | Section headers |
| H3 | 32px | 1.3 | Subsections |
| H4 | 24px | 1.4 | Card titles |
| Body | 18px | 1.45 | Paragraphs |
| Small | 16px | 1.5 | Captions |

### Font Weights
- **Thin**: 200 (Aeonik only)
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Black**: 900

---

## Color System

### Primary Palette
```typescript
const colors = {
  accent: '#0066FF',    // Electric Blue (switch to #FF522B for Red)
  accent2: '#00FF7F',   // Neon Green (use sparingly)
  ink: '#111111',       // Near black for text
  bg: '#FFFFFF',        // Pure white background
  muted: '#F5F5F5',     // Light gray for subtle backgrounds
}
```

### Color Usage
- **Primary Actions**: `accent`
- **Body Text**: `ink`
- **Secondary Text**: `ink/70` (70% opacity)
- **Borders**: `ink/10` (10% opacity)
- **Hover States**: Darken by 10%

---

## Spacing & Layout

### Spacing Scale
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

### Layout Patterns
1. **Hero Sections**: 96-128px vertical padding
2. **Content Sections**: 64-96px vertical padding
3. **Card Padding**: 24-32px
4. **Button Padding**: 16px horizontal, 12px vertical

---

## Interaction Patterns

### Hover States
```typescript
// Button hover
hover: { 
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" }
}

// Card hover
hover: { 
  y: -4,
  boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
}

// Link hover
hover: {
  textDecoration: "underline",
  textUnderlineOffset: "4px"
}
```

### Click/Tap Feedback
```typescript
tap: { 
  scale: 0.98,
  transition: { duration: 0.1 }
}
```

### Magnetic Cursor Effect
Applied to primary CTAs and interactive elements with `magneticEffect()` function.

---

## Components

### Button
```tsx
<Button variant="default|outline|link" size="default|lg">
  Action
</Button>
```

**Variants**:
- `default`: Solid background with accent color
- `outline`: Border only, transparent background
- `link`: Text only with underline on hover

### Card
```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardContent />
</Card>
```

**Features**:
- Subtle border and shadow
- Lift effect on hover
- Rounded corners (8px)

### Container
```tsx
<Container className="py-16">
  <Content />
</Container>
```

**Properties**:
- Max-width: 1320px
- Horizontal padding: 16px (mobile), 32px (desktop)

### Image Modal
```tsx
<ImageModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  src="/image.jpg"
  alt="Description"
  caption="Optional caption"
/>
```

**Features**:
- Full viewport image display with zoom
- Keyboard navigation (Escape to close)
- Accessibility compliant with focus management
- Optional caption support
- Prevents body scroll when open

### Image Carousel Modal
```tsx
<ImageCarouselModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  images={[/* array of images */]}
  initialIndex={0}
  showPagination={true}
/>
```

**Features**:
- Multi-image navigation with keyboard support
- Apple-style pagination controls
- Optional pagination toggle
- Smooth transitions between images
- Full accessibility support

### Image Gallery Carousel
```tsx
<ImageGalleryCarousel 
  images={[
    { src: '/img1.jpg', alt: 'Image 1', caption: 'Caption' },
    { src: '/img2.jpg', alt: 'Image 2' }
  ]}
  className="w-full"
/>
```

**Features**:
- On-page carousel with Apple-inspired design
- Thumbnail navigation strip
- Keyboard arrow navigation
- Smooth animations with loading states
- Responsive design with touch support

---

## Animation Principles

### Timing Functions
```typescript
const easings = {
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { stiffness: 300, damping: 30 }
}
```

### Duration Guidelines
- **Micro-interactions**: 100-200ms
- **Hover transitions**: 200-300ms
- **Page transitions**: 300-400ms
- **Scroll reveals**: 400-600ms

### Stagger Animations
```typescript
container: {
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0.1
  }
}
```

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}
```

### Color Contrast
- **Text on Background**: WCAG AAA (7:1)
- **Large Text**: WCAG AA (3:1)
- **Interactive Elements**: WCAG AA (4.5:1)

### Keyboard Navigation
- All interactive elements accessible via Tab
- Skip links for main content
- Proper ARIA labels and roles

---

## Performance Guidelines

### Image Optimization
1. Use Next.js Image component
2. Provide blur placeholders
3. Set proper sizes attribute
4. Use WebP format when possible

### Font Loading
```css
font-display: swap; /* Prevent FOIT */
```

### Code Splitting
- Lazy load heavy components
- Use dynamic imports for non-critical features
- Keep First Load JS under 200KB

### Animation Performance
- Use `transform` and `opacity` only
- Enable GPU acceleration with `will-change`
- Respect `prefers-reduced-motion`

---

## Implementation Examples

### Hero Section
```tsx
<section className="bg-white py-24 md:py-32">
  <Container>
    <motion.h1 
      className="font-heading text-display text-ink"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Precision Meets Purpose.
    </motion.h1>
  </Container>
</section>
```

### Interactive Card
```tsx
<motion.article
  variants={cardVariants}
  initial="rest"
  whileHover="hover"
  className="bg-white rounded-lg border border-ink/10"
>
  <OptimizedImage src="/project.jpg" blurDataURL={blur} />
  <div className="p-6">
    <h3 className="font-heading text-xl">Project Title</h3>
  </div>
</motion.article>
```

---

## Version History

- **v1.0.0** (2024-01-20): Initial design system
  - Established core visual language
  - Defined interaction patterns
  - Created component library

---

## Contributing

To maintain consistency:
1. Follow the established patterns
2. Document new components
3. Test across devices
4. Ensure accessibility compliance
5. Monitor performance impact

---

*"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs*
