"use client"

import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { AnimatedHero } from "@/components/three/animated-hero"
import { ParticleGalaxy } from "@/components/three/particle-galaxy"
import { LiquidMetal } from "@/components/three/liquid-metal"
import { NeuralNetworkViz } from "@/components/three/neural-network"
import { FluidDynamics } from "@/components/three/fluid-dynamics"
import { AudioCrystals } from "@/components/three/audio-crystals"
import { ParticleFire } from "@/components/three/particle-fire"
import { WaveField } from "@/components/three/wave-field"
import { PageWrapper } from "@/components/layout/page-transition"
import { motion } from "framer-motion"
import { cardVariants, revealContainer, revealItem } from "@/lib/interactions"
import { useState } from "react"

interface DemoCardProps {
  title: string
  description: string
  tech: string[]
  children: React.ReactNode
  index: number
}

function DemoCard({ title, description, tech, children, index }: DemoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div 
      className="bg-card border-border space-y-4 rounded-lg border p-6"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      custom={index}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-foreground/60 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <motion.span
              key={index}
              className="bg-accent/10 text-accent rounded-md px-2 py-1 font-mono text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.div 
        className="relative h-80 overflow-hidden rounded-lg border border-border bg-muted/20"
        animate={{ borderColor: isHovered ? "rgba(0, 102, 255, 0.2)" : "var(--border)" }}
        transition={{ duration: 0.3 }}
      >
        {children}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function LabPage() {
  const experiments = [
    {
      title: "Liquid Metal Blob",
      description: "Interactive metallic blob with realistic material properties and physics.",
      tech: ["three.js", "react-three-fiber", "physics"],
      component: <LiquidMetal />
    },
    {
      title: "Particle Galaxy",
      description: "Dynamic particle system with gravitational forces and interactive controls.",
      tech: ["webgl", "shaders", "particles"],
      component: <ParticleGalaxy />
    },
    {
      title: "Neural Network Visualization",
      description: "Real-time visualization of neural network processing and data flow.",
      tech: ["d3.js", "tensorflow", "webgl"],
      component: <NeuralNetworkViz />
    },
    {
      title: "Fluid Dynamics",
      description: "GPU-accelerated fluid simulation with interactive flow patterns.",
      tech: ["webgl2", "compute-shaders", "physics"],
      component: <FluidDynamics />
    },
    {
      title: "Wave Field",
      description: "Parametric wave field with customizable frequency and amplitude.",
      tech: ["three.js", "glsl", "math"],
      component: <WaveField />
    },
    {
      title: "Particle Fire",
      description: "Realistic fire effect using particle systems and custom shaders.",
      tech: ["particles", "shaders", "physics"],
      component: <ParticleFire />
    },
    {
      title: "Audio Reactive Crystals",
      description: "3D crystals that respond to audio input with dynamic deformations.",
      tech: ["web-audio", "three.js", "fft"],
      component: <AudioCrystals />
    },
    {
      title: "Animated Hero Background",
      description: "Layered animated background with parallax scrolling effects.",
      tech: ["react", "framer-motion", "svg"],
      component: <AnimatedHero />
    }
  ]

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background px-6 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedText
              text="Experimental Lab"
              as="h1"
              variant="slide"
              className="mb-6 text-5xl font-bold md:text-7xl text-foreground"
            />
            <AnimatedText
              text="A playground for exploring cutting-edge web technologies and creative coding experiments."
              as="p"
              variant="fade"
              className="text-foreground/70 mx-auto max-w-2xl text-lg"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="border-t border-border bg-muted/30 px-6 py-20">
        <div className="container mx-auto">
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={revealContainer}
            initial="hidden"
            animate="visible"
          >
            {experiments.map((experiment, index) => (
              <motion.div key={experiment.title} variants={revealItem}>
                <DemoCard
                  title={experiment.title}
                  description={experiment.description}
                  tech={experiment.tech}
                  index={index}
                >
                  {experiment.component}
                </DemoCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-t border-border bg-background px-6 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
              Technologies & Tools
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  category: "3D Graphics",
                  items: ["Three.js", "React Three Fiber", "WebGL", "GLSL Shaders"],
                },
                {
                  category: "Animation",
                  items: ["Framer Motion", "GSAP", "Lottie", "CSS Animations"],
                },
                {
                  category: "Creative Coding",
                  items: ["Canvas API", "Web Audio API", "WebGPU", "Matter.js"],
                },
              ].map((group, index) => (
                <motion.div
                  key={group.category}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-foreground/80 hover:text-accent transition-colors cursor-default"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 px-6 py-16">
        <div className="container mx-auto text-center">
          <p className="text-foreground/60 mb-4">
            Interested in collaborating on experimental projects?
          </p>
          <a
            href="/contact"
            className="text-accent hover:underline underline-offset-4 font-medium transition-all"
          >
            Let&apos;s create something unique →
          </a>
        </div>
      </section>
    </PageWrapper>
  )
}