# Tyler Schmidt Portfolio v3

A modern portfolio website showcasing the intersection of design and engineering excellence. Built with cutting-edge web technologies and a focus on performance, accessibility, and user experience.

## Architecture Overview

### Tech Stack

#### Core Framework
- **Next.js 15.4.3** - React framework with App Router for optimal performance
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Full type safety across the codebase

#### Styling & Design System
- **Tailwind CSS 3.5.7** - Utility-first CSS with custom design tokens
- **Aeonik Variable Font** - Self-hosted premium typeface with multiple weights
- **CSS Grid & Flexbox** - Modern layout techniques for responsive design

#### Animation & Graphics
- **Framer Motion 12.3.1** - Declarative animations and page transitions
- **Three.js / React Three Fiber** - WebGL-powered 3D graphics
- **Canvas API** - Custom particle systems and 2D graphics
- **GSAP** - High-performance timeline animations

#### Content Management
- **Sanity.io** - Headless CMS with structured content
- **Portable Text** - Rich text rendering with custom components
- **GROQ** - Powerful query language for content fetching

#### Developer Experience
- **Turbopack** - Lightning-fast HMR in development
- **ESLint & Prettier** - Consistent code style
- **Husky** - Git hooks for quality control
- **TypeScript Strict Mode** - Maximum type safety

## Key Features

### Performance Optimizations
- Static generation for instant page loads
- Optimized image loading with Next.js Image component
- Code splitting and lazy loading for WebGL demos
- Adaptive quality settings for 3D graphics
- Service worker for offline capability

### Interactive Experiences
- **8 WebGL Demos** in the Lab section showcasing creative coding
- **Live Photo Support** - Apple-style animated portraits
- **Dynamic Theme System** - Light/dark mode with smooth transitions
- **Responsive Particle Typography** - Interactive hero sections

### Engineering Highlights

#### Component Architecture
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── sections/        # Page sections
│   ├── three/           # WebGL/Three.js components
│   └── animations/      # Animation components
├── app/                 # Next.js App Router pages
├── lib/                 # Utilities and helpers
└── types/              # TypeScript definitions
```

#### Custom Solutions
- **Enhanced Image Display** - Intelligent aspect ratio handling for various image dimensions
- **Sanity Integration** - Type-safe content queries with preview support
- **Animation System** - Reusable motion components with performance optimizations
- **Theme Provider** - Context-based theming with localStorage persistence

### Code Quality

#### Type Safety
- Strict TypeScript configuration
- Generated types for Sanity schema
- Type-safe API routes and data fetching

#### Testing & Validation
```bash
npm run verify      # Comprehensive checks
npm run type-check  # TypeScript validation
npm run lint        # ESLint with custom rules
npm run build       # Production build test
```

#### Bundle Analysis
- Optimized chunk splitting
- Tree-shaking for minimal bundle size
- Dynamic imports for code splitting

## Development

### Getting Started
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### Key Scripts
- `dev` - Development with Turbopack
- `build` - Production build
- `verify` - Full verification suite
- `format` - Prettier formatting
- `lint` - ESLint checks

## Performance Metrics

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: Optimized with dynamic imports

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

© 2025 Tyler Schmidt. All rights reserved.

---

Built with precision engineering and attention to detail.