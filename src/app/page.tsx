import { AnimatedText } from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/page-transition"
import { WebGLMeshGradient } from "@/components/ui/webgl-mesh-gradient"
import { InteractiveProjectCard } from "@/components/ui/interactive-project-card"
import { InteractiveStats } from "@/components/ui/interactive-stats"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  role: string
  company: string
  year: string
  gradient: string
}

// Removed - using InteractiveProjectCard instead

export default function HomePage() {
  const recentProjects: ProjectCardProps[] = [
    {
      title: "Commerce Growth Optimization",
      description:
        "Leading buy flow optimization initiatives that directly impact conversion rates for millions of users across Adobe's commerce ecosystem.",
      role: "Senior UX Designer",
      company: "Adobe",
      year: "2024-Present",
      gradient: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "Ubisoft.com Complete Redesign",
      description:
        "Spearheaded the complete digital transformation of Ubisoft's flagship website, creating a modern gaming-focused experience.",
      role: "Lead UX Designer",
      company: "Ubisoft",
      year: "2023",
      gradient: "from-orange-500/10 to-red-500/10",
    },
    {
      title: "Abacus Multichain Wallet",
      description:
        "Product lead for an innovative Web3 wallet experience that simplifies multichain cryptocurrency management.",
      role: "Product Lead",
      company: "Abacus",
      year: "2023",
      gradient: "from-green-500/10 to-teal-500/10",
    },
    {
      title: "Alfred AI Assistant",
      description:
        "Designed the core product experience for an AI-powered assistant, making artificial intelligence feel natural and accessible.",
      role: "Product Designer",
      company: "Alfred AI",
      year: "2022-2023",
      gradient: "from-violet-500/10 to-pink-500/10",
    },
  ]

  return (
    <PageWrapper>
      {/* Hero Section with Interactive Mesh Gradient */}
      <section className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-6 py-20">
        {/* Interactive Mesh Gradient Background */}
                  <WebGLMeshGradient />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
          {/* Main Heading */}
          <div className="space-y-4">
            <AnimatedText
              text="Tyler Schmidt"
              as="h1"
              variant="decrypt"
              className="text-6xl font-bold tracking-tight md:text-8xl"
              delay={0.2}
            />

            <AnimatedText
              text="UX/UI Designer & Engineer"
              as="h2"
              variant="slide"
              className="text-muted-foreground text-xl font-medium md:text-2xl"
              delay={0.8}
            />
          </div>

          {/* Description */}
          <div className="mx-auto max-w-2xl">
            <AnimatedText
              text="Crafting award-winning digital experiences that push the boundaries of design and technology."
              as="p"
              variant="fade"
              className="text-muted-foreground text-lg leading-relaxed"
              delay={1.2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link href="/work">
              <Button size="lg" variant="magnetic" className="chrome-button">
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <AnimatedText
              text="Recent Work"
              as="h2"
              variant="decrypt"
              className="rgb-text mb-4 text-4xl font-bold md:text-6xl"
              delay={0.2}
            />
            <AnimatedText
              text="Selected projects that showcase my approach to digital transformation and user-centered design."
              as="p"
              variant="fade"
              className="text-muted-foreground mx-auto max-w-2xl text-lg"
              delay={0.5}
            />
          </div>

          {/* Projects Grid */}
                      <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {recentProjects.map((project, index) => (
                <InteractiveProjectCard
                  key={project.title}
                  {...project}
                  index={index}
                />
              ))}
          </div>

          {/* View All Work CTA */}
          <div className="text-center">
            <Link href="/work">
              <Button
                size="lg"
                variant="outline"
                className="kinetic-hover group"
              >
                <span className="glitch-hover" data-text="View All Work">
                  View All Work
                </span>
                <span className="text-accent ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

              {/* Stats Section */}
        <section className="border-border/50 from-accent/5 to-primary/5 border-t bg-gradient-to-r px-6 py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="rotate-slow absolute top-10 left-10 w-32 h-32 border border-accent/30 rounded-full" />
            <div className="rotate-slow absolute bottom-20 right-20 w-24 h-24 border border-primary/30 rounded-full" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full animate-ping" />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="mx-auto max-w-4xl">
              <InteractiveStats />
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="border-border border-t px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground text-sm">
            Portfolio v3.0 — Built with Next.js, TypeScript, Tailwind CSS, and
            Framer Motion
          </p>
        </div>
      </footer>
    </PageWrapper>
  )
}
