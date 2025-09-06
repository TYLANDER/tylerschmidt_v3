import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { AnimatedTextShowcase } from "./AnimatedTextShowcase"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { motion } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"

export interface ComponentProp {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
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
  guidelines?: string[]
}

export interface ComponentCategory {
  id: string
  name: string
  components: Component[]
}

export const componentCategories: ComponentCategory[] = [
  {
    id: "buttons",
    name: "Buttons",
    components: [
      {
        id: "primary-button",
        name: "Primary Button",
        description:
          "The primary call-to-action button used throughout the application. Built with accessibility in mind and supports multiple variants.",
        preview: (
          <div className="flex flex-wrap justify-center gap-4">
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
<Button disabled>Disabled</Button>`,
        },
        props: [
          {
            name: "variant",
            type: "default | destructive | outline | ghost",
            default: "default",
            description: "The visual style of the button",
          },
          {
            name: "size",
            type: "sm | md | lg",
            default: "md",
            description: "The size of the button",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the button is disabled",
          },
          {
            name: "onClick",
            type: "() => void",
            description: "Click handler function",
          },
          {
            name: "children",
            type: "ReactNode",
            description: "Button content",
            required: true,
          },
        ],
        variants: [
          {
            name: "Sizes",
            preview: (
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            ),
          },
          {
            name: "States",
            preview: (
              <div className="flex gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            ),
          },
        ],
        guidelines: [
          "Use default variant for primary actions",
          "Use destructive variant for dangerous actions like delete",
          "Ensure sufficient color contrast for accessibility",
          "Provide clear, action-oriented labels",
        ],
      },
    ],
  },
  {
    id: "cards",
    name: "Cards",
    components: [
      {
        id: "basic-card",
        name: "Basic Card",
        description:
          "A versatile container component for grouping related content. Cards provide a clean way to organize information.",
        preview: (
          <div className="mx-auto max-w-md">
            <Card className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Card Title</h3>
              <p className="text-muted-foreground">
                This is a basic card component that can be used to display
                various types of content in a clean, organized manner.
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
</Card>`,
        },
        props: [
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
          {
            name: "hover",
            type: "boolean",
            default: "false",
            description: "Enable hover effects",
          },
          {
            name: "children",
            type: "ReactNode",
            description: "Card content",
            required: true,
          },
        ],
        guidelines: [
          "Use consistent padding across all cards",
          "Group related information together",
          "Avoid overcrowding cards with too much content",
          "Consider using hover effects for interactive cards",
        ],
      },
      {
        id: "project-card",
        name: "Project Card",
        description:
          "A specialized card component designed specifically for showcasing portfolio projects with image, metadata, and technologies.",
        preview: (
          <div className="mx-auto max-w-md">
            <motion.div
              className="overflow-hidden rounded-lg border border-border"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="p-6">
                <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                  <span>Client Name</span>
                  <span>2024</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Project Title</h3>
                <p className="text-muted-foreground">
                  A brief description of the project and its key achievements.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                    React
                  </span>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                    TypeScript
                  </span>
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
}} />`,
        },
      },
    ],
  },
  {
    id: "images",
    name: "Images & Media",
    components: [
      {
        id: "image-modal",
        name: "Image Modal",
        description:
          "A full-screen modal for viewing images with zoom capabilities. Includes keyboard navigation and accessibility features.",
        preview: (
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
              <p className="mb-4 text-sm text-muted-foreground">
                Click an image to open modal
              </p>
              <div className="group relative inline-block cursor-pointer">
                <div className="aspect-video w-64 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        code: {
          jsx: `import { ImageModal } from '@/components/ui/image-modal'
import { useState } from 'react'

export function ImageExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <img src="/image.jpg" alt="Click to expand" />
      </button>
      
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        src="/image.jpg"
        alt="Full size image"
        caption="Optional image caption"
      />
    </>
  )
}`,
          usage: `<ImageModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  src="/image.jpg"
  alt="Description"
  caption="Optional caption"
/>`,
        },
        props: [
          {
            name: "isOpen",
            type: "boolean",
            description: "Controls modal visibility",
            required: true,
          },
          {
            name: "onClose",
            type: "() => void",
            description: "Callback when modal closes",
            required: true,
          },
          {
            name: "src",
            type: "string",
            description: "Image source URL",
            required: true,
          },
          {
            name: "alt",
            type: "string",
            description: "Alt text for accessibility",
            required: true,
          },
          {
            name: "caption",
            type: "string",
            description: "Optional image caption",
          },
        ],
        guidelines: [
          "Always provide meaningful alt text",
          "Ensure images are optimized for web",
          "Test keyboard navigation (Escape to close)",
          "Consider lazy loading for performance",
        ],
      },
      {
        id: "image-carousel-modal",
        name: "Image Carousel Modal",
        description:
          "A modal carousel for viewing multiple images with navigation controls. Features Apple-style pagination and keyboard support.",
        preview: (
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Multi-image gallery modal preview
              </p>
              <div className="relative mx-auto max-w-md">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500 to-pink-600" />
                <div className="absolute bottom-4 right-4 flex items-center gap-4 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md">
                  <button className="flex h-8 w-8 items-center justify-center text-white">
                    ←
                  </button>
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-6 rounded-full bg-white" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center text-white">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
        code: {
          jsx: `import { ImageCarouselModal, useImageCarouselModal } from '@/components/ui/image-carousel-modal'

export function GalleryExample() {
  const { modalProps, openModal } = useImageCarouselModal()
  
  const images = [
    { src: '/img1.jpg', alt: 'Image 1', caption: 'First image' },
    { src: '/img2.jpg', alt: 'Image 2', caption: 'Second image' },
    { src: '/img3.jpg', alt: 'Image 3' }
  ]

  return (
    <>
      <button onClick={() => openModal(images, 0)}>
        Open Gallery
      </button>
      
      <ImageCarouselModal {...modalProps} />
    </>
  )
}`,
          usage: `// Using the hook
const { modalProps, openModal } = useImageCarouselModal()

// Open modal with images
openModal(images, startIndex)

// Modal component
<ImageCarouselModal {...modalProps} />

// Direct usage
<ImageCarouselModal 
  isOpen={isOpen}
  onClose={handleClose}
  images={images}
  initialIndex={0}
  showPagination={true}
/>`,
        },
        props: [
          {
            name: "isOpen",
            type: "boolean",
            description: "Controls modal visibility",
            required: true,
          },
          {
            name: "onClose",
            type: "() => void",
            description: "Callback when modal closes",
            required: true,
          },
          {
            name: "images",
            type: "CarouselImage[]",
            description: "Array of images to display",
            required: true,
          },
          {
            name: "initialIndex",
            type: "number",
            default: "0",
            description: "Starting image index",
          },
          {
            name: "showPagination",
            type: "boolean",
            default: "true",
            description: "Show/hide navigation controls",
          },
        ],
        guidelines: [
          "Provide keyboard navigation (arrow keys)",
          "Show controls only for multiple images",
          "Preload adjacent images for smooth transitions",
          "Test on touch devices for swipe gestures",
        ],
      },
      {
        id: "image-gallery-carousel",
        name: "Image Gallery Carousel",
        description:
          "An on-page carousel component with Apple-inspired design. Features smooth transitions, thumbnail navigation, and loading states.",
        preview: (
          <div className="mx-auto max-w-2xl">
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-blue-600">
                <button className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center gap-2">
                <div className="h-2 w-8 rounded-full bg-gray-900 dark:bg-white" />
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
              <div className="flex justify-center gap-4">
                <div className="h-20 w-32 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 ring-2 ring-blue-500 ring-offset-2" />
                <div className="h-20 w-32 rounded-lg bg-gray-200 opacity-60 dark:bg-gray-700" />
                <div className="h-20 w-32 rounded-lg bg-gray-200 opacity-60 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ),
        code: {
          jsx: `import { ImageGalleryCarousel } from '@/components/ui/image-gallery-carousel'

export function ProjectGallery() {
  const images = [
    { src: '/project1.jpg', alt: 'Project screenshot 1', caption: 'Homepage design' },
    { src: '/project2.jpg', alt: 'Project screenshot 2', caption: 'Dashboard view' },
    { src: '/project3.jpg', alt: 'Project screenshot 3', caption: 'Mobile responsive' }
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Project Gallery</h2>
      <ImageGalleryCarousel 
        images={images}
        className="w-full"
      />
    </div>
  )
}`,
          usage: `<ImageGalleryCarousel 
  images={[
    { src: '/img1.jpg', alt: 'Image 1', caption: 'Caption 1' },
    { src: '/img2.jpg', alt: 'Image 2' },
    { src: '/img3.jpg', alt: 'Image 3', caption: 'Caption 3' }
  ]}
  className="w-full"
/>

// Minimal usage
<ImageGalleryCarousel images={images} />

// In a container
<div className="max-w-4xl mx-auto">
  <ImageGalleryCarousel images={galleryImages} />
</div>`,
        },
        props: [
          {
            name: "images",
            type: "GalleryImage[]",
            description: "Array of images with src, alt, and optional caption",
            required: true,
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes for the container",
          },
        ],
        guidelines: [
          "Optimize images for web performance",
          "Provide loading states for better UX",
          "Ensure touch-friendly navigation on mobile",
          "Keep thumbnail strip scrollable on small screens",
          "Use aspect ratios that work across devices",
        ],
      },
    ],
  },
  {
    id: "typography",
    name: "Typography",
    components: [
      {
        id: "animated-text",
        name: "Animated Text",
        description:
          "Text components with various entrance animations. Each animation serves a different purpose and creates unique visual emphasis.",
        preview: <AnimatedTextShowcase />,
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
<AnimatedText text="Your text" as="h1" />`,
        },
        props: [
          {
            name: "text",
            type: "string",
            description: "The text to animate",
            required: true,
          },
          {
            name: "variant",
            type: "slide | fade | typewriter | reveal | decrypt",
            default: "slide",
            description: "Animation variant",
          },
          {
            name: "delay",
            type: "number",
            default: "0",
            description: "Animation delay in seconds",
          },
          {
            name: "duration",
            type: "number",
            default: "0.6",
            description: "Animation duration in seconds",
          },
          {
            name: "as",
            type: "ElementType",
            default: "p",
            description: "HTML element to render as",
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
        ],
        guidelines: [
          "Use sparingly to avoid overwhelming users",
          "Consider user preferences for reduced motion",
          "Choose animations that match the content tone",
          "Ensure text remains readable during animation",
        ],
      },
      {
        id: "heading-styles",
        name: "Heading Hierarchy",
        description:
          "A consistent heading system that maintains visual hierarchy and readability across all screen sizes.",
        preview: (
          <div className="space-y-6">
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H1 • 5xl/7xl • Bold
              </p>
              <h1 className="text-5xl font-bold md:text-7xl">
                Main Page Title
              </h1>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H2 • 4xl/5xl • Bold
              </p>
              <h2 className="text-4xl font-bold md:text-5xl">
                Section Heading
              </h2>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H3 • 3xl/4xl • Semibold
              </p>
              <h3 className="text-3xl font-semibold md:text-4xl">
                Subsection Title
              </h3>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H4 • 2xl/3xl • Semibold
              </p>
              <h4 className="text-2xl font-semibold md:text-3xl">
                Card Heading
              </h4>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H5 • xl/2xl • Medium
              </p>
              <h5 className="text-xl font-medium md:text-2xl">Small Heading</h5>
            </div>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">
                H6 • lg/xl • Medium
              </p>
              <h6 className="text-lg font-medium md:text-xl">Label Heading</h6>
            </div>
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
<h1 className="text-5xl md:text-7xl font-bold mb-6">Page Title</h1>

// For section headings
<h2 className="text-4xl md:text-5xl font-bold mb-6">Section Title</h2>

// For subsections
<h3 className="text-3xl md:text-4xl font-semibold mb-4">Subsection</h3>`,
        },
        guidelines: [
          "Maintain consistent hierarchy throughout the page",
          "Use only one H1 per page for SEO",
          "Ensure sufficient contrast between heading levels",
          "Include responsive sizing for mobile devices",
        ],
      },
      {
        id: "body-copy",
        name: "Body Copy",
        description:
          "Standardized text styles for body content, ensuring optimal readability and consistency.",
        preview: (
          <div className="max-w-2xl space-y-6">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Body Large • lg
              </p>
              <p className="text-lg leading-relaxed">
                This is large body text used for important introductory content
                or emphasis. It provides better readability for key information.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Body Default • base
              </p>
              <p className="text-base leading-relaxed">
                This is the default body text size used throughout the
                application. It&apos;s optimized for readability at normal
                reading distances and provides a comfortable reading experience
                for longer content.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Body Small • sm
              </p>
              <p className="text-sm leading-relaxed">
                This is small body text used for secondary information,
                captions, or supporting details. It maintains readability while
                taking up less space.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                Body Muted • Muted Foreground
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                This is muted body text used for supplementary information that
                should be de-emphasized visually while remaining accessible.
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Link Text</p>
              <p className="text-base leading-relaxed">
                This is body text with an{" "}
                <a
                  href="#"
                  className="text-blue-500 underline transition-colors hover:text-blue-600"
                >
                  inline link
                </a>{" "}
                that stands out while maintaining readability.
              </p>
            </div>
          </div>
        ),
        code: {
          jsx: `// Large body text
<p className="text-lg leading-relaxed">
  Important introductory content
</p>

// Default body text
<p className="text-base leading-relaxed">
  Regular paragraph content
</p>

// Small body text
<p className="text-sm leading-relaxed">
  Secondary information
</p>

// Muted text
<p className="text-base text-muted-foreground">
  De-emphasized content
</p>

// Text with link
<p className="text-base">
  Text with <a href="#" className="text-blue-500 hover:text-blue-600 underline transition-colors">link</a>
</p>`,
          usage: `// Article or blog post
<article className="prose max-w-2xl">
  <h1 className="text-5xl font-bold mb-6">Article Title</h1>
  <p className="text-lg leading-relaxed mb-6">
    Introduction paragraph with larger text...
  </p>
  <p className="text-base leading-relaxed mb-4">
    Regular body paragraphs...
  </p>
</article>

// Card with mixed text sizes
<Card className="p-6">
  <h3 className="text-2xl font-semibold mb-2">Card Title</h3>
  <p className="text-base mb-4">Main content...</p>
  <p className="text-sm text-muted-foreground">Meta information</p>
</Card>`,
        },
        guidelines: [
          "Use 1.5x line height (leading-relaxed) for body text",
          "Limit line length to 65-75 characters for optimal readability",
          "Ensure sufficient contrast between text and background",
          "Use text-muted-foreground for secondary information",
        ],
      },
    ],
  },
  {
    id: "layout",
    name: "Layout",
    components: [
      {
        id: "container",
        name: "Container",
        description:
          "A responsive container component that provides consistent max-width constraints and padding. Essential for maintaining readable line lengths.",
        preview: (
          <Container className="rounded-lg bg-gray-100 py-8 dark:bg-gray-800">
            <p className="text-center">
              This content is wrapped in a Container component that provides
              consistent spacing and max-width constraints.
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
</Container>`,
        },
        props: [
          {
            name: "children",
            type: "ReactNode",
            description: "Content to be contained",
            required: true,
          },
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
          {
            name: "as",
            type: "ElementType",
            default: "div",
            description: "HTML element to render as",
          },
        ],
        guidelines: [
          "Use for all main content areas",
          "Provides responsive padding on mobile",
          "Maximum width prevents lines from becoming too long",
          "Can be nested for different width constraints",
        ],
      },
      {
        id: "grid-system",
        name: "Grid System",
        description:
          "A flexible CSS Grid-based layout system using Tailwind CSS. Supports responsive breakpoints and asymmetric layouts.",
        preview: (
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                12-Column Grid
              </p>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 rounded border border-blue-500 bg-blue-500/20 p-4 text-center">
                  col-span-8
                </div>
                <div className="col-span-4 rounded border border-blue-500 bg-blue-500/20 p-4 text-center">
                  col-span-4
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                Responsive Grid
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded border border-purple-500 bg-purple-500/20 p-4 text-center">
                  1
                </div>
                <div className="rounded border border-purple-500 bg-purple-500/20 p-4 text-center">
                  2
                </div>
                <div className="rounded border border-purple-500 bg-purple-500/20 p-4 text-center">
                  3
                </div>
                <div className="rounded border border-purple-500 bg-purple-500/20 p-4 text-center">
                  4
                </div>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted-foreground">
                Auto-fit Grid
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded border border-green-500 bg-green-500/20 p-4 text-center">
                  Auto
                </div>
                <div className="rounded border border-green-500 bg-green-500/20 p-4 text-center">
                  Fit
                </div>
                <div className="rounded border border-green-500 bg-green-500/20 p-4 text-center">
                  Grid
                </div>
              </div>
            </div>
          </div>
        ),
        code: {
          jsx: `// 12-column grid system
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar</div>
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</div>

// Auto-fit grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {features.map(feature => (
    <div key={feature.id}>{feature.name}</div>
  ))}
</div>`,
          usage: `// Project grid (used in /work)
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {projects.map(project => <ProjectCard key={project.id} {...project} />)}
</div>

// Feature grid (used in homepage)
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
  <div className="md:col-span-7">Featured content</div>
  <div className="md:col-span-5">Secondary content</div>
</div>

// Stats grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {stats.map(stat => <StatCard key={stat.id} {...stat} />)}
</div>`,
        },
        guidelines: [
          "Use consistent gap sizes: gap-4 (1rem), gap-6 (1.5rem), gap-8 (2rem)",
          "Always include responsive breakpoints for mobile",
          "Consider using 12-column grid for complex layouts",
          "Test on various screen sizes to ensure proper stacking",
        ],
      },
    ],
  },
  {
    id: "feedback",
    name: "Feedback",
    components: [
      {
        id: "loading-states",
        name: "Loading States",
        description:
          "Various loading indicators to provide feedback during asynchronous operations.",
        preview: (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
              <p className="mt-2 text-sm text-muted-foreground">Spinner</p>
            </div>
            <div className="space-y-3">
              <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <p className="mt-2 text-sm text-muted-foreground">Skeleton</p>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
              <p className="ml-4 text-sm text-muted-foreground">Dots</p>
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
</div>

// Loading dots
<div className="flex space-x-2">
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
</div>`,
          usage: `// Loading button
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
</div>`,
        },
      },
      {
        id: "toast-notifications",
        name: "Toast Notifications",
        description:
          "Temporary notification messages that appear at the edge of the screen to provide feedback.",
        preview: (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-lg bg-green-500 px-6 py-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Success! Your changes have been saved.</span>
              </div>
              <button className="rounded p-1 transition-colors hover:bg-green-600">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-red-500 px-6 py-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Error! Something went wrong.</span>
              </div>
              <button className="rounded p-1 transition-colors hover:bg-red-600">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-blue-500 px-6 py-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Info: New update available.</span>
              </div>
              <button className="rounded p-1 transition-colors hover:bg-blue-600">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-yellow-500 px-6 py-4 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Warning: This action cannot be undone.</span>
              </div>
              <button className="rounded p-1 transition-colors hover:bg-yellow-600">
                <X size={16} />
              </button>
            </div>
          </div>
        ),
        code: {
          jsx: `// Toast component
export function Toast({ type, message, onClose }) {
  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  }
  
  const icons = {
    success: <CheckIcon />,
    error: <XIcon />,
    info: <InfoIcon />,
    warning: <AlertIcon />
  }
  
  return (
    <div className={\`\${styles[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between gap-4\`}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <span>{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-black/10 rounded transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  )
}`,
          usage: `<Toast type="success" message="Changes saved!" onClose={() => {}} />
<Toast type="error" message="Something went wrong" onClose={() => {}} />
<Toast type="info" message="New update available" onClose={() => {}} />
<Toast type="warning" message="This action cannot be undone" onClose={() => {}} />

// Toast container (usually at app root)
<div className="fixed bottom-4 right-4 space-y-2 z-50">
  {toasts.map(toast => (
    <Toast 
      key={toast.id} 
      {...toast} 
      onClose={() => removeToast(toast.id)} 
    />
  ))}
</div>`,
        },
        guidelines: [
          "Position toasts at the edge of the viewport",
          "Auto-dismiss after 3-5 seconds for non-critical messages",
          "Always provide a close button for accessibility",
          "Stack multiple toasts with proper spacing",
          "Use appropriate colors for different message types",
        ],
      },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    components: [
      {
        id: "theme-toggle",
        name: "Theme Toggle",
        description:
          "A toggle component for switching between light and dark themes with smooth transitions.",
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
</div>`,
        },
        guidelines: [
          "Place in a consistent location across all pages",
          "Ensure the icon clearly indicates the current theme",
          "Persist user preference in localStorage",
          "Provide smooth transitions between themes",
        ],
      },
      {
        id: "navigation-menu",
        name: "Navigation Menu",
        description:
          "The primary navigation component with responsive design and animated hover states matching our production site.",
        preview: (
          <nav className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Tyler Schmidt</div>
              <div className="hidden items-center gap-8 md:flex">
                {["Work", "About", "Lab", "Pia"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="group relative text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-foreground"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
              <button className="md:hidden">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        ),
        code: {
          jsx: `export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-semibold text-lg">
            Tyler Schmidt
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
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

// Navigation items structure
const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/lab', label: 'Lab' },
  { href: '/pia', label: 'Pia' }
]`,
        },
        guidelines: [
          "Keep navigation items concise and clear",
          "Highlight the current page in the navigation",
          "Ensure mobile menu is easily accessible",
          "Use consistent animation timing across all interactions",
        ],
      },
    ],
  },
  {
    id: "effects",
    name: "Effects",
    components: [
      {
        id: "hover-effects",
        name: "Hover Effects",
        description:
          "Interactive hover states that provide visual feedback and enhance user experience.",
        preview: (
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="cursor-pointer rounded-lg border border-border p-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-center">Scale on Hover</p>
            </motion.div>
            <motion.div
              className="cursor-pointer rounded-lg border border-border p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-center">Lift on Hover</p>
            </motion.div>
            <motion.div
              className="col-span-2 cursor-pointer rounded-lg border border-border p-6"
              whileHover={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                borderColor: "rgb(59, 130, 246)",
              }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-center">Shadow & Border on Hover</p>
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
</motion.div>

// Shadow effect
<motion.div
  whileHover={{ 
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    borderColor: "rgb(59, 130, 246)"
  }}
  transition={{ duration: 0.2 }}
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
</motion.button>`,
        },
        guidelines: [
          "Keep hover effects subtle and purposeful",
          "Ensure effects don't cause layout shifts",
          "Provide visual feedback within 100ms",
          "Consider touch devices where hover isn&apos;t available",
        ],
      },
      {
        id: "glassmorphism",
        name: "Glassmorphism",
        description:
          "Modern frosted glass effect using backdrop blur and semi-transparent backgrounds.",
        preview: (
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600" />
            <div className="relative rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
              <h3 className="mb-2 text-xl font-semibold text-white">
                Glassmorphism
              </h3>
              <p className="text-sm text-white/80">
                A modern frosted glass effect using backdrop blur and
                transparency.
              </p>
            </div>
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
</div>`,
        },
        guidelines: [
          "Ensure sufficient contrast for text readability",
          "Use sparingly as it can impact performance",
          "Provide fallbacks for browsers without backdrop-filter support",
          "Test on various backgrounds to ensure visibility",
        ],
      },
    ],
  },
]
