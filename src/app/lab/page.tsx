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

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experimental projects, prototypes, and interactive demos showcasing cutting-edge web technologies.",
}

interface DemoCardProps {
  title: string
  description: string
  tech: string[]
  children: React.ReactNode
}

function DemoCard({ title, description, tech, children }: DemoCardProps) {
  return (
    <div className="bg-card border-border space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="bg-accent/10 text-accent rounded-md px-2 py-1 font-mono text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="border-border/50 h-80 overflow-hidden rounded-lg border">
        {children}
      </div>
    </div>
  )
}

export default function LabPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 space-y-8 text-center">
            <AnimatedText
              text="The Lab"
              as="h1"
              variant="fade"
              className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
            />

            <AnimatedText
              text="Experimental WebGL demos pushing the boundaries of what&apos;s possible in the browser. Click, hover, and interact with each simulation to explore cutting-edge web technologies."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed"
            />
          </div>

          {/* Demo Grid */}
          <div className="grid grid-cols-1 gap-8 space-y-0 lg:grid-cols-2">
            {/* Particle Galaxy */}
            <DemoCard
              title="🌌 Particle Galaxy"
              description="An interactive spiral galaxy with thousands of particles forming cosmic structures. Watch the galaxy slowly rotate while stars twinkle in the background."
              tech={[
                "Three.js",
                "Particle Systems",
                "Additive Blending",
                "Custom Shaders",
              ]}
            >
              <ParticleGalaxy />
            </DemoCard>

            {/* Liquid Metal */}
            <DemoCard
              title="🔮 Liquid Metal"
              description="Chrome-like liquid metal blob that morphs and distorts in real-time. Hover to interact and watch the surface ripple with metallic reflections."
              tech={[
                "Displacement Shaders",
                "PBR Materials",
                "Environment Mapping",
                "Mesh Distortion",
              ]}
            >
              <LiquidMetal />
            </DemoCard>

            {/* Neural Network */}
            <DemoCard
              title="⚡ Neural Network"
              description="Visualize how artificial neural networks process information. Click any node to trigger electrical pulses that propagate through the network layers."
              tech={[
                "Graph Algorithms",
                "Particle Trails",
                "Interactive Nodes",
                "Animation Sequencing",
              ]}
            >
              <NeuralNetworkViz />
            </DemoCard>

            {/* Fluid Dynamics */}
            <DemoCard
              title="🌊 Fluid Dynamics"
              description="Real-time fluid simulation with interactive dye mixing. Move your mouse to create turbulent flow patterns and watch colors blend in the fluid field."
              tech={[
                "Fluid Simulation",
                "Custom Shaders",
                "Turbulence",
                "Real-time Physics",
              ]}
            >
              <FluidDynamics />
            </DemoCard>

            {/* Audio Reactive Crystals */}
            <DemoCard
              title="🎵 Audio Reactive Crystals"
              description="Geometric crystals that pulse and grow with music or microphone input. Grant microphone access to see crystals react to your voice in real-time."
              tech={[
                "Web Audio API",
                "Frequency Analysis",
                "Procedural Geometry",
                "Real-time Audio",
              ]}
            >
              <AudioCrystals />
            </DemoCard>

            {/* Particle Fire */}
            <DemoCard
              title="🔥 Particle Fire"
              description="Realistic fire simulation with heat distortion effects. Move your mouse to influence the flames and watch particles transform from hot white to cool red."
              tech={[
                "Particle Physics",
                "Heat Simulation",
                "Custom Shaders",
                "Real-time Distortion",
              ]}
            >
              <ParticleFire />
            </DemoCard>

            {/* Morphing Wave Field */}
            <DemoCard
              title="🌊 Morphing Wave Field"
              description="An organic wave field that responds to your mouse with flowing geometric patterns. Watch as particles swarm around your cursor while the surface ripples with color."
              tech={[
                "Custom GLSL Shaders",
                "Procedural Noise",
                "Interactive Geometry",
                "Dynamic Particle Systems",
              ]}
            >
              <WaveField />
            </DemoCard>

            {/* Original Animated Hero */}
            <DemoCard
              title="🎭 Distorted Sphere"
              description="The original demo - a continuously morphing sphere with displacement mapping. A study in geometric transformation and surface distortion."
              tech={[
                "Geometry Displacement",
                "Orbit Controls",
                "Dynamic Materials",
                "Animation Loops",
              ]}
            >
              <AnimatedHero />
            </DemoCard>
          </div>

          {/* Performance Info */}
          <div className="border-border mt-16 rounded-lg border bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8">
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold">
                🚀 Performance Optimized
              </h3>
              <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
                <div className="space-y-2">
                  <div className="font-semibold text-green-400">
                    Hardware Accelerated
                  </div>
                  <p className="text-muted-foreground">
                    All demos use WebGL for GPU-accelerated rendering, ensuring
                    smooth 60fps performance
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-blue-400">
                    Adaptive Quality
                  </div>
                  <p className="text-muted-foreground">
                    Dynamic particle counts and LOD systems adjust to your
                    device capabilities
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-purple-400">
                    Optimized Shaders
                  </div>
                  <p className="text-muted-foreground">
                    Custom GLSL shaders minimize draw calls and maximize visual
                    impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Info */}
          <div className="from-muted/10 to-accent/5 border-border mt-8 rounded-lg border bg-gradient-to-r p-8">
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-semibold">Powered By</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  Three.js
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  @react-three/fiber
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  @react-three/drei
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  WebGL Shaders
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  GLSL
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  Web Audio API
                </span>
                <span className="bg-background border-border rounded-full border px-3 py-1">
                  TypeScript
                </span>
              </div>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
                All demos run entirely in the browser using WebGL for
                hardware-accelerated graphics. No plugins required - just modern
                web technology pushing creative boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
