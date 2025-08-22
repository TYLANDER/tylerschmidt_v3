import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { AnimatedText } from '@/components/animations/animated-text'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { motion } from 'framer-motion'

export interface ComponentProp {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentVariant {
  name: string
  preview: React.ReactNode
}

export interface Component {
  id: string
  name: string
  description: string
  preview: React.ReactNode
  code: {
    jsx: string
    css?: string
    usage: string
  }
  props?: ComponentProp[]
  variants?: ComponentVariant[]
}

export interface ComponentCategory {
  id: string
  name: string
  components: Component[]
}

export const componentCategories: ComponentCategory[] = [
  {
    id: 'buttons',
    name: 'Buttons',
    components: [
      {
        id: 'primary-button',
        name: 'Primary Button',
        description: 'The primary call-to-action button used throughout the application.',
        preview: (
          <div className="flex gap-4 flex-wrap justify-center">
            <Button>Default Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
        code: {
          jsx: `import { Button } from '@/components/ui/button'

export function ButtonDemo() {
  return (
    <Button onClick={() => console.log('clicked')}>
      Click me
    </Button>
  )
}`,
          usage: `<Button>Default Button</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>`
        },
        props: [
          { name: 'variant', type: 'default | destructive | outline | ghost', default: 'default', description: 'The visual style of the button' },
          { name: 'size', type: 'sm | md | lg', default: 'md', description: 'The size of the button' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled' },
          { name: 'onClick', type: '() => void', description: 'Click handler function' }
        ],
        variants: [
          {
            name: 'Sizes',
            preview: (
              <div className="flex gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            )
          },
          {
            name: 'States',
            preview: (
              <div className="flex gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            )
          }
        ]
      },
      {
        id: 'glitch-button',
        name: 'Glitch Button',
        description: 'An animated button with a glitch effect on hover.',
        preview: (
          <div className="flex justify-center">
            <button className="glitch-button px-6 py-3 font-medium">
              <span data-text="Glitch Effect">Glitch Effect</span>
            </button>
          </div>
        ),
        code: {
          jsx: `export function GlitchButton({ children, onClick }) {
  return (
    <button className="glitch-button" onClick={onClick}>
      <span data-text={children}>{children}</span>
    </button>
  )
}`,
          css: `.glitch-button {
  position: relative;
  padding: 12px 24px;
  background: transparent;
  border: 2px solid currentColor;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.glitch-button span {
  position: relative;
  display: block;
}

.glitch-button:hover span::before,
.glitch-button:hover span::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-button:hover span::before {
  animation: glitch-1 0.3s infinite;
  color: #00ffff;
  z-index: -1;
}

.glitch-button:hover span::after {
  animation: glitch-2 0.3s infinite;
  color: #ff00ff;
  z-index: -2;
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
}`,
          usage: `<GlitchButton onClick={() => console.log('Glitched!')}>
  Click Me
</GlitchButton>`
        }
      }
    ]
  },
  {
    id: 'cards',
    name: 'Cards',
    components: [
      {
        id: 'basic-card',
        name: 'Basic Card',
        description: 'A versatile card component for displaying content.',
        preview: (
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Card Title</h3>
              <p className="text-muted-foreground">
                This is a basic card component that can be used to display various types of content in a clean, organized manner.
              </p>
            </Card>
          </div>
        ),
        code: {
          jsx: `import { Card } from '@/components/ui/Card'

export function CardExample() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-2">Card Title</h3>
      <p className="text-muted-foreground">
        Card content goes here
      </p>
    </Card>
  )
}`,
          usage: `<Card>Simple card content</Card>

<Card className="p-6">
  <h3>Title</h3>
  <p>Content</p>
</Card>

<Card hover className="p-4">
  Hoverable card
</Card>`
        },
        props: [
          { name: 'className', type: 'string', description: 'Additional CSS classes' },
          { name: 'hover', type: 'boolean', default: 'false', description: 'Enable hover effects' },
          { name: 'children', type: 'ReactNode', description: 'Card content' }
        ]
      },
      {
        id: 'project-card',
        name: 'Project Card',
        description: 'A specialized card for displaying project information.',
        preview: (
          <div className="max-w-md mx-auto">
            <motion.div
              className="border border-border rounded-lg overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="p-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Client Name</span>
                  <span>2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Title</h3>
                <p className="text-muted-foreground">
                  A brief description of the project and its key achievements.
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">React</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">TypeScript</span>
                </div>
              </div>
            </motion.div>
          </div>
        ),
        code: {
          jsx: `import { motion } from 'framer-motion'

export function ProjectCard({ project }) {
  return (
    <motion.div
      className="border border-border rounded-lg overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
      <div className="p-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="flex gap-2 mt-4">
          {project.technologies.map(tech => (
            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}`,
          usage: `<ProjectCard project={{
  client: "Client Name",
  year: "2024",
  title: "Project Title",
  description: "Project description",
  technologies: ["React", "TypeScript"]
}} />`
        }
      }
    ]
  },
  {
    id: 'typography',
    name: 'Typography',
    components: [
      {
        id: 'animated-text',
        name: 'Animated Text',
        description: 'Text components with entrance animations.',
        preview: (
          <div className="space-y-6">
            <AnimatedText
              text="Slide Animation"
              variant="slide"
              className="text-3xl font-bold"
            />
            <AnimatedText
              text="Fade Animation"
              variant="fade"
              className="text-2xl"
              delay={0.2}
            />
            <AnimatedText
              text="Typewriter animation effect"
              variant="typewriter"
              className="text-xl"
              delay={0.4}
            />
          </div>
        ),
        code: {
          jsx: `import { AnimatedText } from '@/components/animations/animated-text'

export function AnimatedTextExample() {
  return (
    <>
      <AnimatedText
        text="Slide Animation"
        variant="slide"
        className="text-3xl font-bold"
      />
      <AnimatedText
        text="Fade Animation"
        variant="fade"
        delay={0.2}
      />
      <AnimatedText
        text="Typewriter effect"
        variant="typewriter"
        delay={0.4}
      />
    </>
  )
}`,
          usage: `<AnimatedText text="Your text" />
<AnimatedText text="Your text" variant="fade" />
<AnimatedText text="Your text" variant="slide" />
<AnimatedText text="Your text" variant="typewriter" />
<AnimatedText text="Your text" variant="reveal" />
<AnimatedText text="Your text" variant="decrypt" />
<AnimatedText text="Your text" delay={0.5} />
<AnimatedText text="Your text" as="h1" />`
        },
        props: [
          { name: 'text', type: 'string', description: 'The text to animate' },
          { name: 'variant', type: 'slide | fade | typewriter | reveal | decrypt', default: 'slide', description: 'Animation variant' },
          { name: 'delay', type: 'number', default: '0', description: 'Animation delay in seconds' },
          { name: 'as', type: 'ElementType', default: 'p', description: 'HTML element to render as' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      },
      {
        id: 'heading-styles',
        name: 'Heading Styles',
        description: 'Consistent heading styles across the application.',
        preview: (
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">Heading 1</h1>
            <h2 className="text-4xl md:text-5xl font-bold">Heading 2</h2>
            <h3 className="text-3xl md:text-4xl font-semibold">Heading 3</h3>
            <h4 className="text-2xl md:text-3xl font-semibold">Heading 4</h4>
            <h5 className="text-xl md:text-2xl font-medium">Heading 5</h5>
            <h6 className="text-lg md:text-xl font-medium">Heading 6</h6>
          </div>
        ),
        code: {
          jsx: `// Heading styles using Tailwind classes
<h1 className="text-5xl md:text-7xl font-bold">Heading 1</h1>
<h2 className="text-4xl md:text-5xl font-bold">Heading 2</h2>
<h3 className="text-3xl md:text-4xl font-semibold">Heading 3</h3>
<h4 className="text-2xl md:text-3xl font-semibold">Heading 4</h4>
<h5 className="text-xl md:text-2xl font-medium">Heading 5</h5>
<h6 className="text-lg md:text-xl font-medium">Heading 6</h6>`,
          usage: `// For main page titles
<h1 className="text-5xl md:text-7xl font-bold">Page Title</h1>

// For section headings
<h2 className="text-4xl md:text-5xl font-bold mb-6">Section Title</h2>

// For subsections
<h3 className="text-3xl md:text-4xl font-semibold mb-4">Subsection</h3>`
        }
      }
    ]
  },
  {
    id: 'layout',
    name: 'Layout',
    components: [
      {
        id: 'container',
        name: 'Container',
        description: 'A responsive container component that constrains content width.',
        preview: (
          <Container className="bg-gray-100 dark:bg-gray-800 py-8 rounded-lg">
            <p className="text-center">
              This content is wrapped in a Container component that provides consistent spacing and max-width constraints.
            </p>
          </Container>
        ),
        code: {
          jsx: `import { Container } from '@/components/ui/Container'

export function ContainerExample() {
  return (
    <Container>
      <h1>Your content here</h1>
      <p>The container provides consistent spacing and width constraints.</p>
    </Container>
  )
}`,
          usage: `<Container>
  Your content here
</Container>

<Container className="py-20">
  Padded container
</Container>

<Container as="section">
  Semantic HTML element
</Container>`
        },
        props: [
          { name: 'children', type: 'ReactNode', description: 'Content to be contained' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' },
          { name: 'as', type: 'ElementType', default: 'div', description: 'HTML element to render as' }
        ]
      },
      {
        id: 'grid-system',
        name: 'Grid System',
        description: 'Responsive grid layouts using Tailwind CSS.',
        preview: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-center">Column 1</div>
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-center">Column 2</div>
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-center">Column 3</div>
          </div>
        ),
        code: {
          jsx: `// Responsive grid with Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`,
          usage: `// Basic grid
<div className="grid grid-cols-3 gap-4">
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</div>

// Asymmetric grid
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar</div>
</div>`
        }
      }
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback',
    components: [
      {
        id: 'loading-states',
        name: 'Loading States',
        description: 'Various loading indicators and skeleton screens.',
        preview: (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-sm text-muted-foreground">Spinner</p>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
              <p className="mt-2 text-sm text-muted-foreground">Skeleton</p>
            </div>
          </div>
        ),
        code: {
          jsx: `// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />

// Skeleton Screen
<div className="space-y-3">
  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
</div>`,
          usage: `// Loading spinner in button
<Button disabled>
  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
  Loading...
</Button>

// Full page skeleton
<div className="animate-pulse">
  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
  <div className="space-y-3">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
  </div>
</div>`
        }
      },
      {
        id: 'toast-notifications',
        name: 'Toast Notifications',
        description: 'Temporary notification messages.',
        preview: (
          <div className="space-y-4">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Success! Your changes have been saved.</span>
            </div>
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Error! Something went wrong.</span>
            </div>
          </div>
        ),
        code: {
          jsx: `// Toast component
export function Toast({ type, message }) {
  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }
  
  return (
    <div className={\`\${styles[type]} text-white px-6 py-4 rounded-lg shadow-lg\`}>
      {message}
    </div>
  )
}`,
          usage: `<Toast type="success" message="Changes saved!" />
<Toast type="error" message="Something went wrong" />
<Toast type="info" message="New update available" />`
        }
      }
    ]
  },
  {
    id: 'navigation',
    name: 'Navigation',
    components: [
      {
        id: 'theme-toggle',
        name: 'Theme Toggle',
        description: 'A toggle switch for dark/light mode.',
        preview: (
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        ),
        code: {
          jsx: `import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <ThemeToggle />
    </header>
  )
}`,
          usage: `<ThemeToggle />

// With custom styling
<div className="fixed top-4 right-4">
  <ThemeToggle />
</div>`
        }
      },
      {
        id: 'navigation-menu',
        name: 'Navigation Menu',
        description: 'Responsive navigation menu with mobile support.',
        preview: (
          <nav className="border border-border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Logo</div>
              <div className="hidden md:flex gap-6">
                <a href="#" className="text-sm hover:text-blue-500 transition-colors">Home</a>
                <a href="#" className="text-sm hover:text-blue-500 transition-colors">About</a>
                <a href="#" className="text-sm hover:text-blue-500 transition-colors">Work</a>
                <a href="#" className="text-sm hover:text-blue-500 transition-colors">Contact</a>
              </div>
              <button className="md:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        ),
        code: {
          jsx: `export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex gap-6">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="text-sm hover:text-blue-500 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
          <button 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  )
}`,
          usage: `<Navigation />

// With custom items
<Navigation items={[
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' }
]} />`
        }
      }
    ]
  },
  {
    id: 'effects',
    name: 'Effects',
    components: [
      {
        id: 'hover-effects',
        name: 'Hover Effects',
        description: 'Various hover interactions and effects.',
        preview: (
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="p-6 border border-border rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-center">Scale on Hover</p>
            </motion.div>
            <motion.div
              className="p-6 border border-border rounded-lg cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-center">Lift on Hover</p>
            </motion.div>
          </div>
        ),
        code: {
          jsx: `import { motion } from 'framer-motion'

// Scale effect
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Hover me
</motion.div>

// Lift effect
<motion.div
  whileHover={{ y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Hover me
</motion.div>`,
          usage: `// Card with hover effect
<motion.div
  className="card"
  whileHover={{ 
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  }}
>
  Card content
</motion.div>

// Button with complex hover
<motion.button
  whileHover={{ 
    scale: 1.05,
    backgroundColor: "#3b82f6"
  }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>`
        }
      },
      {
        id: 'glassmorphism',
        name: 'Glassmorphism',
        description: 'Frosted glass effect for modern UI elements.',
        preview: (
          <div className="relative p-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border border-white/20">
            <h3 className="text-xl font-semibold mb-2">Glassmorphism</h3>
            <p className="text-sm text-muted-foreground">
              A modern frosted glass effect using backdrop blur and transparency.
            </p>
          </div>
        ),
        code: {
          css: `.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.glass-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}`,
          jsx: `<div className="glass p-6">
  <h3 className="text-xl font-semibold">Glass Card</h3>
  <p>Content with glassmorphism effect</p>
</div>`,
          usage: `// Basic glass effect
<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6">
  Glass content
</div>

// Colored glass
<div className="bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 rounded-lg p-6">
  Blue tinted glass
</div>

// Dark mode glass
<div className="bg-black/10 dark:bg-white/10 backdrop-blur-lg border border-white/10 rounded-lg p-6">
  Adaptive glass
</div>`
        }
      }
    ]
  }
]
