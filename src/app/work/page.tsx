import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Tyler Schmidt's portfolio of digital experiences - from Adobe Commerce optimization to Ubisoft redesigns and Web3 innovations.",
}

interface ProjectCardProps {
  title: string
  description: string
  role: string
  company: string
  year: string
  isComingSoon?: boolean
  gradient: string
}

function ProjectCard({
  title,
  description,
  role,
  company,
  year,
  isComingSoon = false,
  gradient,
}: ProjectCardProps) {
  return (
    <div className="group kinetic-hover disruptive-overlay relative cursor-pointer">
      {/* Media Area - Large visual space with Digital Dazzle effects */}
      <div
        className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${gradient} border-border/50 dazzle-pattern corruption-grid relative overflow-hidden border`}
      >
        {isComingSoon && (
          <div className="bg-background/90 text-accent neon-glow absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-medium backdrop-blur">
            Coming Soon
          </div>
        )}

        {/* Placeholder for media with glitch effect */}
        <div className="data-viz flex h-full w-full items-center justify-center">
          <div
            className="glitch-text rgb-text text-6xl font-bold opacity-30"
            data-text={title.charAt(0)}
          >
            {title.charAt(0)}
          </div>
        </div>

        {/* Hover overlay with RGB effects */}
        <div className="rgb-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
      </div>

      {/* Content Area - Minimal and focused */}
      <div className="space-y-3 pt-6">
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="font-medium">{company}</span>
            <span>•</span>
            <span>{year}</span>
          </div>

          <h3
            className="text-foreground group-hover:rgb-text glitch-hover text-xl font-bold transition-colors"
            data-text={title}
          >
            {title}
          </h3>

          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-accent bg-accent/20 border-accent/30 rounded-full border px-2 py-1 text-xs">
            {role}
          </span>

          {!isComingSoon && (
            <button
              className="text-muted-foreground hover:text-accent glitch-hover kinetic-hover text-sm transition-colors"
              data-text="View →"
            >
              View →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const projects: ProjectCardProps[] = [
    {
      title: "Commerce Growth Optimization",
      description:
        "Leading buy flow optimization initiatives that directly impact conversion rates for millions of users across Adobe's commerce ecosystem.",
      role: "Senior UX Designer",
      company: "Adobe",
      year: "2024-Present",

      gradient: "from-blue-500/10 to-purple-500/10",
      isComingSoon: true,
    },
    {
      title: "Ubisoft.com Complete Redesign",
      description:
        "Spearheaded the complete digital transformation of Ubisoft's flagship website, creating a modern gaming-focused experience for millions of players.",
      role: "Lead UX Designer",
      company: "Ubisoft",
      year: "2023",

      gradient: "from-orange-500/10 to-red-500/10",
    },
    {
      title: "Abacus Multichain Wallet",
      description:
        "Product lead for an innovative Web3 wallet experience that simplifies multichain cryptocurrency management and mainstream adoption.",
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
    {
      title: "Destiny UX Optimization",
      description:
        "Enhanced user experience for a high-traffic digital platform, focusing on engagement and conversion optimization through data-driven design.",
      role: "UX Designer",
      company: "Destiny",
      year: "2022",

      gradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "Mothership Design System",
      description:
        "Architected a comprehensive design system for Ubisoft's digital properties, ensuring consistency across multiple gaming platforms.",
      role: "Design Systems Lead",
      company: "Ubisoft",
      year: "2022",

      gradient: "from-indigo-500/10 to-purple-500/10",
      isComingSoon: true,
    },
  ]

  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header - Left-aligned designer style */}
          <div className="mb-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              {/* Left column - Title */}
              <div className="lg:col-span-5">
                <AnimatedText
                  text="Selected Work"
                  as="h1"
                  variant="fade"
                  className="rgb-text glitch-text text-5xl leading-none font-bold tracking-tight md:text-7xl lg:text-8xl"
                  data-text="Selected Work"
                />
              </div>

              {/* Right column - Description and stats */}
              <div className="space-y-8 lg:col-span-7">
                <AnimatedText
                  text="Crafting digital experiences that transform how people interact with technology—from e-commerce optimization to cutting-edge Web3 innovations."
                  as="p"
                  variant="fade"
                  delay={0.3}
                  className="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl"
                />

                {/* Inline stats - Digital Dazzle style */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  <div className="data-viz kinetic-hover space-y-1">
                    <div className="text-accent text-2xl font-bold md:text-3xl">
                      50M+
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Users Impacted
                    </div>
                  </div>
                  <div className="data-viz kinetic-hover space-y-1">
                    <div className="text-accent text-2xl font-bold md:text-3xl">
                      18%
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Conversion Lift
                    </div>
                  </div>
                  <div className="data-viz kinetic-hover space-y-1">
                    <div className="text-accent text-2xl font-bold md:text-3xl">
                      40%
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Performance Gain
                    </div>
                  </div>
                  <div className="data-viz kinetic-hover space-y-1">
                    <div className="text-accent text-2xl font-bold md:text-3xl">
                      6+
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid - Inspired by Reform Collective layout */}
          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {/* CTA Section - Designer style */}
          <div className="border-border/50 border-t pt-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left - CTA Text */}
              <div className="space-y-6">
                <h2
                  className="rgb-text glitch-text text-4xl leading-tight font-bold md:text-5xl"
                  data-text="Let&apos;s Build Something Great Together"
                >
                  Let&apos;s Build Something Great Together
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ready to transform your digital experience? I&apos;m always
                  excited to tackle new challenges and create exceptional
                  solutions.
                </p>
              </div>

              {/* Right - Contact Actions */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <a
                    href="/contact"
                    className="group border-border/50 hover:border-accent/50 kinetic-hover disruptive-overlay block rounded-lg border p-6 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="group-hover:text-accent mb-1 font-semibold transition-colors">
                          Start a Project
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Let&apos;s discuss your vision
                        </p>
                      </div>
                      <div className="text-accent transition-transform group-hover:translate-x-1">
                        →
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@tylerschmidt.com"
                    className="group border-border/50 hover:border-accent/50 kinetic-hover disruptive-overlay block rounded-lg border p-6 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="group-hover:text-accent mb-1 font-semibold transition-colors">
                          Send an Email
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          hello@tylerschmidt.com
                        </p>
                      </div>
                      <div className="text-accent transition-transform group-hover:translate-x-1">
                        →
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
