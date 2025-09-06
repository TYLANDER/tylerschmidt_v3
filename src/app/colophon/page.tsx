"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { PageWrapper } from "@/components/layout/page-transition"
import { AnimatedText } from "@/components/animations/animated-text"
import {
  TechStackVisual,
  PerformanceMetrics,
} from "@/components/colophon/TechStackVisual"

const techStack = [
  {
    category: "Frontend Framework",
    items: [
      { name: "Next.js 15", description: "React framework with App Router" },
      { name: "TypeScript", description: "Type-safe development" },
      { name: "Tailwind CSS", description: "Utility-first styling" },
    ],
  },
  {
    category: "Animation & Graphics",
    items: [
      { name: "Framer Motion", description: "Declarative animations" },
      { name: "Three.js / R3F", description: "3D graphics and WebGL" },
      { name: "Canvas API", description: "Particle systems and 2D graphics" },
    ],
  },
  {
    category: "Content & Data",
    items: [
      { name: "Sanity.io", description: "Headless CMS" },
      { name: "Portable Text", description: "Rich content editing" },
      { name: "GROQ", description: "Graph-oriented query language" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Vercel", description: "Edge deployment & hosting" },
      { name: "GitHub", description: "Version control" },
      { name: "pnpm", description: "Efficient package management" },
    ],
  },
]

const designPrinciples = [
  {
    title: "Precision Engineering",
    description:
      "Every interaction is carefully crafted with attention to performance, accessibility, and user delight.",
  },
  {
    title: "Adaptive Design",
    description:
      "Seamless experience across devices with responsive layouts and adaptive interactions.",
  },
  {
    title: "Motion with Purpose",
    description:
      "Animations guide attention and provide feedback, never just decoration.",
  },
  {
    title: "Performance First",
    description:
      "Optimized bundle sizes, lazy loading, and efficient rendering for instant page loads.",
  },
]

export default function ColophonPage() {
  return (
    <PageWrapper>
      <section className="min-h-screen pb-20 pt-32">
        <Container>
          {/* Header */}
          <div className="mb-16">
            <AnimatedText
              text="Colophon"
              as="h1"
              variant="slide"
              className="mb-6 text-5xl font-bold md:text-7xl"
            />
            <AnimatedText
              text="The craft behind the creation"
              as="p"
              variant="fade"
              className="max-w-2xl text-lg text-gray-600 dark:text-gray-400"
              delay={0.5}
            />
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Performance</h2>
            <PerformanceMetrics />
          </motion.div>

          {/* Build Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Build Details</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This portfolio represents the intersection of design and
                engineering excellence. Built with Next.js 15 and TypeScript, it
                leverages cutting-edge web technologies to deliver an immersive,
                performant experience.
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
                  <h3 className="mb-2 text-xl font-semibold">Architecture</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Server-side rendering (SSR)</li>
                    <li>• Static site generation (SSG)</li>
                    <li>• Edge runtime optimization</li>
                    <li>• Progressive enhancement</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
                  <h3 className="mb-2 text-xl font-semibold">Key Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Dark/Light theme with system preference</li>
                    <li>• Mobile-first responsive design</li>
                    <li>• Accessibility compliant (WCAG 2.1)</li>
                    <li>• SEO optimized with dynamic OG images</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Design Inspiration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Design Inspiration</h2>
            <div className="prose prose-lg dark:prose-invert mb-8 max-w-none">
              <p>
                The design philosophy draws inspiration from Swiss design
                principles, brutalist architecture, and contemporary digital
                art. The particle typography system pays homage to generative
                artists like Casey Reas and Zach Lieberman, while the overall
                aesthetic channels the precision of Dieter Rams and the boldness
                of David Rudnick.
              </p>
            </div>

            {/* Visual representation */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="aspect-square rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300"
                />
              ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="border-l-4 border-gray-900 pl-6 dark:border-gray-100"
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Technology Stack</h2>
            <TechStackVisual />
            <div className="grid gap-8 md:grid-cols-2">
              {techStack.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + categoryIndex * 0.1 }}
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start justify-between"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="ml-4 text-right text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Signature Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Signature Features</h2>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-3 text-xl font-semibold">
                  Particle Typography Engine
                </h3>
                <p className="mb-3 text-gray-600 dark:text-gray-400">
                  A custom-built canvas-based typography system featuring:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 10,000+ particles forming dynamic text</li>
                  <li>• Magnetic mouse interactions with physics simulation</li>
                  <li>• RGB chromatic aberration effects</li>
                  <li>
                    • Mobile device motion integration with haptic feedback
                  </li>
                  <li>• Optimized rendering with offscreen canvas</li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                <h3 className="mb-3 text-xl font-semibold">Lab Experiments</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A showcase of cutting-edge web experiences including WebGL
                  shaders, 3D visualizations, and generative art experiments.
                  Each demo pushes the boundaries of what&apos;s possible in the
                  browser.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="mb-20"
          >
            <h2 className="mb-8 text-3xl font-bold">Acknowledgments</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-4">
                Special thanks to the open-source community and the creators of
                the incredible tools that made this portfolio possible.
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Type</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Aeonik by CoType Foundry
                    <br />
                    System UI fallback stack
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Tools</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Visual Studio Code
                    <br />
                    Cursor AI
                    <br />
                    Claude 3.5 Sonnet
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Awards Submission Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="rounded-lg bg-gray-50 p-8 dark:bg-gray-900"
          >
            <h3 className="mb-4 text-xl font-semibold">
              For Awards Consideration
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              This portfolio showcases advanced web development techniques while
              maintaining a focus on user experience and accessibility. Every
              detail has been considered, from micro-interactions to performance
              optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Site of the Day",
                "Developer Award",
                "Innovation",
                "UI Design",
                "Interaction Design",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ASCII Art Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
            className="mt-20 text-center"
          >
            <pre className="font-mono text-xs text-gray-400 dark:text-gray-600">
              {`
╔═══════════════════════════════════════╗
║  Crafted with precision and care      ║
║  Tyler Schmidt © ${new Date().getFullYear()}                   ║
╚═══════════════════════════════════════╝
`}
            </pre>
          </motion.div>
        </Container>
      </section>
    </PageWrapper>
  )
}
