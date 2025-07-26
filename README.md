# Tyler Schmidt Portfolio v3

A modern, high-performance portfolio website built with Next.js 15, featuring interactive WebGL demos and strategic content design.

## 🎯 Features

- **Strategic Content**: Compelling about and work sections with persuasive communication style
- **Interactive WebGL Lab**: 8 cutting-edge demos including particle systems, fluid dynamics, and audio-reactive visualizations
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js
- **Performance Optimized**: 60fps WebGL rendering, static generation, optimized bundles
- **Responsive Design**: Mobile-first approach with smooth animations

## 🚀 WebGL Demos

1. **Particle Galaxy** - 5,000 particle spiral formation
2. **Liquid Metal** - Chrome PBR materials with real-time distortion
3. **Neural Network** - Interactive AI visualization
4. **Fluid Dynamics** - Real-time fluid simulation with dye mixing
5. **Audio Reactive Crystals** - Microphone-responsive geometric animations
6. **Particle Fire** - Realistic fire simulation with heat effects
7. **Morphing Wave Field** - Organic geometry with particle swarms
8. **Animated Hero** - Original morphing sphere demo

## 🛠 Development

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run with type checking and linting
npm run dev:check
```

### Testing & Verification

```bash
# Run comprehensive verification (recommended before deployment)
npm run verify

# Individual checks
npm run type-check    # TypeScript validation
npm run lint          # ESLint checks
npm run build         # Production build test
```

### Deployment Verification

The project includes a comprehensive verification system that catches common deployment issues:

- **Unescaped entities** in JSX content
- **Explicit `any` types** in TypeScript
- **Unused imports** and variables
- **Build failures** in production mode
- **Vercel-style strict linting**

### Scripts

- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run verify` - Run all verification tests
- `npm run check-all` - Complete quality check
- `npm run format` - Format code with Prettier

## 🔧 Tech Stack

- **Framework**: Next.js 15.4.3 with App Router
- **React**: 19.1.0
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS with custom design system
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animation**: Framer Motion, GSAP
- **Fonts**: Aeonik variable font family
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📦 Build & Deploy

The project is optimized for Vercel deployment with:

- Static page generation
- Optimized bundle splitting
- WebGL performance optimization
- Comprehensive error catching

### Environment Variables

Create `.env.local`:

```env
# Add any required environment variables
```

## 🧪 Quality Assurance

- **Automated Testing**: GitHub Actions CI with Node 18.x and 20.x
- **Code Quality**: ESLint, TypeScript strict mode, Prettier
- **Performance**: Bundle analysis, build optimization
- **Deployment**: Pre-deployment verification with Vercel simulation

## 📊 Performance

- **Build Size**: Optimized chunks with Next.js code splitting
- **WebGL**: 60fps animations with adaptive quality
- **Loading**: Static generation for instant page loads
- **SEO**: Comprehensive meta tags and structured data

---

Built with ❤️ and cutting-edge web technologies.
