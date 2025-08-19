"use client"

import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"
import { motion } from "framer-motion"
import { revealContainer, revealItem } from "@/lib/interactions"
import Link from "next/link"
import {
  ParticleTypographyVisual,
  NeuralNetworkVisual,
  QuantumStateVisual,
  RealityLayersVisual,
  ConsciousnessStreamVisual,
  LivingPortfolioVisual,
  CodeVisualVisual,
  ConversationCanvasVisual,
  DimensionalTypographyVisual,
  TemporalEchoVisual
} from "@/components/lab/experiment-visuals"

interface ExperimentCardProps {
  title: string
  description: string
  href: string
  tags: string[]
  visual?: React.ReactNode
}

function ExperimentCard({ title, description, href, tags, visual }: ExperimentCardProps) {
  return (
    <Link href={href} className="group block">
      <motion.div 
        className="h-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Preview Window */}
        <div className="relative h-48 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          {visual ? (
            <div className="absolute inset-0 flex items-center justify-center">
              {visual}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                {title.split(' ').map(word => word[0]).join('')}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function LabPage() {
  const experiments = [
    {
      title: "Particle Typography",
      description: "RGB chromatic aberration text with magnetic particle effects and device motion support.",
      href: "/",
      tags: ["Canvas", "Particles", "Motion", "Haptics"],
      visual: <ParticleTypographyVisual />
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D neural network with real-time data flow visualization.",
      href: "/hero-testing",
      tags: ["Three.js", "WebGL", "AI", "3D"],
      visual: <NeuralNetworkVisual />
    },
    {
      title: "Quantum State Portfolio",
      description: "Projects exist in quantum superposition until observed.",
      href: "/hero-testing",
      tags: ["Physics", "Animation", "Interactive"],
      visual: <QuantumStateVisual />
    },
    {
      title: "Reality Layers",
      description: "Peel back layers of reality to reveal hidden dimensions.",
      href: "/hero-testing",
      tags: ["Parallax", "3D", "Interactive"],
      visual: <RealityLayersVisual />
    },
    {
      title: "Consciousness Stream",
      description: "AI-generated thoughts flowing through digital consciousness.",
      href: "/hero-testing",
      tags: ["AI", "Generative", "Text"],
      visual: <ConsciousnessStreamVisual />
    },
    {
      title: "Living Portfolio",
      description: "Portfolio that evolves and grows with AI-generated content.",
      href: "/living-portfolio",
      tags: ["AI", "Dynamic", "Generative"],
      visual: <LivingPortfolioVisual />
    },
    {
      title: "Code-to-Visual Transformer",
      description: "Transform code into stunning visual representations.",
      href: "/code-visual",
      tags: ["Code", "Visualization", "Interactive"],
      visual: <CodeVisualVisual />
    },
    {
      title: "Conversation Canvas",
      description: "Paint with words in an AI-powered creative canvas.",
      href: "/conversation-canvas",
      tags: ["AI", "Creative", "Canvas"],
      visual: <ConversationCanvasVisual />
    },
    {
      title: "Dimensional Typography",
      description: "Text that exists across multiple dimensions.",
      href: "/hero-lab",
      tags: ["3D", "Typography", "WebGL"],
      visual: <DimensionalTypographyVisual />
    },
    {
      title: "Temporal Echo System",
      description: "Visualize the echoes of past visitors in real-time.",
      href: "/hero-lab",
      tags: ["Time", "Data", "Visualization"],
      visual: <TemporalEchoVisual />
    }
  ]

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-black px-6 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedText
              text="Experimental Lab"
              as="h1"
              variant="slide"
              className="mb-6 text-5xl font-bold md:text-7xl"
            />
            <AnimatedText
              text="Pushing the boundaries of web experiences with cutting-edge technology and creative experimentation."
              as="p"
              variant="fade"
              className="text-gray-600 dark:text-gray-400 mx-auto max-w-2xl text-lg"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="border-t border-gray-200 dark:border-gray-800 px-6 py-20">
        <div className="container mx-auto">
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={revealContainer}
            initial="hidden"
            animate="visible"
          >
            {experiments.map((experiment) => (
              <motion.div key={experiment.title} variants={revealItem}>
                <ExperimentCard {...experiment} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t border-gray-200 dark:border-gray-800 px-6 py-16">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Built with Three.js, React, Canvas API, WebGL, AI APIs, and experimental web technologies
          </p>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 font-medium"
          >
            Let&apos;s experiment together →
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}