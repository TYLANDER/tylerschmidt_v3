# Tyler Schmidt Portfolio v3.0

An award-winning portfolio website showcasing cutting-edge UX/UI design and engineering work. Built with modern web technologies and sophisticated animations to create an exceptional user experience.

## 🚀 Features

### Design & User Experience
- **Apple-inspired Design Language**: Clean, sophisticated, and modern aesthetic
- **Sophisticated Animations**: Framer Motion with custom easing and staggered animations
- **WebGL Integration**: Three.js powered interactive 3D elements
- **Smooth Scrolling**: Lenis for buttery-smooth scroll experiences
- **Magnetic Interactions**: Hover effects that follow cursor movement
- **Page Transitions**: Seamless navigation with animated overlays

### Technical Excellence
- **Next.js 14+**: Latest App Router with server-side rendering
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS v4**: Utility-first styling with custom design tokens
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Performance Optimized**: Core Web Vitals optimized for 90+ Lighthouse scores
- **Accessibility**: WCAG AA compliant with screen reader support

### Content Management
- **Sanity CMS**: Headless CMS for easy content management
- **Structured Content**: Schemas for projects, about, contact, and site settings
- **Media Management**: Optimized image and video handling
- **SEO Optimized**: Dynamic meta tags and Open Graph images

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js with React Three Fiber
- **CMS**: Sanity.io
- **UI Components**: Radix UI primitives
- **Deployment**: Vercel
- **Version Control**: Git with Husky hooks

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/tylerschmidt/portfolio-v3.git
cd portfolio-v3
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

4. **Configure Sanity (required for CMS)**
- Create a new Sanity project at [sanity.io](https://sanity.io)
- Update `.env.local` with your project details:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your_api_token"
```

5. **Start development server**
```bash
npm run dev
```

## 🎨 Design System

The portfolio includes a comprehensive design system with:

### Colors
- **Primary**: Black/White for maximum contrast
- **Accent**: Warm amber for highlights and interactions
- **Semantic**: Success, warning, error, and info colors
- **Dark Mode**: Automatic system preference detection

### Typography
- **Sans**: Inter font family for body text
- **Mono**: JetBrains Mono for code and technical content
- **Scale**: 9-step typography scale from 12px to 128px
- **Features**: OpenType features for professional typography

### Animations
- **Easing**: Custom Apple-inspired easing curves
- **Durations**: Consistent timing scale from 75ms to 1000ms
- **Variants**: Fade, slide, wave, typewriter, and reveal animations
- **Performance**: Hardware-accelerated animations with reduced motion support

## 📱 Components

### Layout Components
- `Navigation`: Responsive navbar with hide-on-scroll
- `SmoothScrollWrapper`: Lenis integration for smooth scrolling
- `PageTransition`: Route change animations
- `PageWrapper`: Page-level animation wrapper

### UI Components
- `Button`: Multiple variants with magnetic hover effects
- `ContactForm`: Advanced form with validation and microinteractions
- `LoadingScreen`: Three loading variants with progress indication

### Animation Components
- `AnimatedText`: Five text animation variants
- `GradientText`: Animated gradient text effects
- `AnimatedHero`: WebGL Three.js interactive hero

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Performance

This portfolio is optimized for exceptional performance:

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Image Optimization**: Next.js Image component with lazy loading
- **Font Loading**: Optimized web font loading with font-display: swap

## 🤝 Contributing

While this is a personal portfolio, contributions for improvements are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Apple, Linear, and Awwwards featured sites
- **Technologies**: The amazing open-source community
- **Fonts**: Google Fonts for Inter and JetBrains Mono
- **Icons**: Lucide React for beautiful icons

---

**Built with ❤️ by Tyler Schmidt**

For questions or collaboration inquiries, reach out at [your-email@example.com](mailto:your-email@example.com).
