import { AnimatedText } from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/page-transition"
import { MeshGradient } from "@/components/ui/mesh-gradient"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  role: string
  company: string
  year: string
  gradient: string
}

function RecentProjectCard({
  title,
  description,
  role,
  company,
  year,
  gradient,
}: ProjectCardProps) {
  return (
    <Link href="/work" className="group block">
      <div className="kinetic-hover disruptive-overlay relative cursor-pointer">
        {/* Media Area */}
        <div
          className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${gradient} border-border/50 dazzle-pattern relative overflow-hidden border transition-all duration-300 group-hover:scale-[1.02]`}
        >
          {/* Gradient overlay on hover */}
          <div className="rgb-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />

          {/* Project initial placeholder */}
          <div
            className="glitch-text data-viz flex h-full w-full items-center justify-center"
            data-text={title[0]}
          >
            <span className="text-foreground/80 text-6xl font-bold">
              {title[0]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 pt-4">
          <div className="space-y-1">
            <h3
              className="glitch-hover rgb-text group-hover:rgb-text text-xl font-bold transition-colors"
              data-text={title}
            >
              {title}
            </h3>
            <div className="text-accent bg-accent/20 border-accent/30 inline-block rounded-full border px-2 py-1 text-xs font-medium">
              {role} at {company}
            </div>
          </div>

          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{year}</span>
            <span
              className="hover:text-accent kinetic-hover glitch-hover text-accent transition-colors"
              data-text="View →"
            >
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

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
        <MeshGradient />

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
              <div
                key={project.title}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecentProjectCard {...project} />
              </div>
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
      <section className="border-border/50 from-accent/5 to-primary/5 border-t bg-gradient-to-r px-6 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="data-viz kinetic-hover text-center">
                <div className="text-accent mb-2 text-3xl font-bold md:text-4xl">
                  50M+
                </div>
                <div className="text-muted-foreground text-sm">
                  Users Impacted
                </div>
              </div>
              <div className="data-viz kinetic-hover text-center">
                <div className="text-accent mb-2 text-3xl font-bold md:text-4xl">
                  15%
                </div>
                <div className="text-muted-foreground text-sm">
                  Avg Conversion Lift
                </div>
              </div>
              <div className="data-viz kinetic-hover text-center">
                <div className="text-accent mb-2 text-3xl font-bold md:text-4xl">
                  6+
                </div>
                <div className="text-muted-foreground text-sm">
                  Years Experience
                </div>
              </div>
              <div className="data-viz kinetic-hover text-center">
                <div className="text-accent mb-2 text-3xl font-bold md:text-4xl">
                  200+
                </div>
                <div className="text-muted-foreground text-sm">
                  Projects Delivered
                </div>
              </div>
            </div>
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
