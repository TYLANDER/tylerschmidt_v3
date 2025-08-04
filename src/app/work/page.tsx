import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "Work",
  description: "Explore Tyler Schmidt's portfolio of digital experiences - from Adobe Commerce optimization to Ubisoft redesigns and Web3 innovations.",
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
  gradient
}: ProjectCardProps) {
  return (
    <div className="relative group cursor-pointer">
      {/* Media Area - Large visual space */}
      <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${gradient} border border-border/50 overflow-hidden relative`}>
        {isComingSoon && (
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-medium z-10">
            Coming Soon
          </div>
        )}
        
        {/* Placeholder for media - replace with actual images later */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl opacity-20 font-bold">
            {title.charAt(0)}
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content Area - Minimal and focused */}
      <div className="pt-6 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{company}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
            {role}
          </span>
          
          {!isComingSoon && (
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
      description: "Leading buy flow optimization initiatives that directly impact conversion rates for millions of users across Adobe's commerce ecosystem.",
      role: "Senior UX Designer",
      company: "Adobe",
      year: "2024-Present",

      gradient: "from-blue-500/10 to-purple-500/10",
      isComingSoon: true
    },
    {
      title: "Ubisoft.com Complete Redesign",
      description: "Spearheaded the complete digital transformation of Ubisoft's flagship website, creating a modern gaming-focused experience for millions of players.",
      role: "Lead UX Designer",
      company: "Ubisoft",
      year: "2023",

      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      title: "Abacus Multichain Wallet",
      description: "Product lead for an innovative Web3 wallet experience that simplifies multichain cryptocurrency management and mainstream adoption.",
      role: "Product Lead",
      company: "Abacus",
      year: "2023",

      gradient: "from-green-500/10 to-teal-500/10"
    },
    {
      title: "Alfred AI Assistant",
      description: "Designed the core product experience for an AI-powered assistant, making artificial intelligence feel natural and accessible.",
      role: "Product Designer",
      company: "Alfred AI",
      year: "2022-2023",

      gradient: "from-violet-500/10 to-pink-500/10"
    },
    {
      title: "Destiny UX Optimization",
      description: "Enhanced user experience for a high-traffic digital platform, focusing on engagement and conversion optimization through data-driven design.",
      role: "UX Designer",
      company: "Destiny",
      year: "2022",

      gradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      title: "Mothership Design System",
      description: "Architected a comprehensive design system for Ubisoft's digital properties, ensuring consistency across multiple gaming platforms.",
      role: "Design Systems Lead",
      company: "Ubisoft",
      year: "2022",

      gradient: "from-indigo-500/10 to-purple-500/10",
      isComingSoon: true
    }
  ]

  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header - Left-aligned designer style */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              
              {/* Left column - Title */}
              <div className="lg:col-span-5">
                <AnimatedText
                  text="Selected Work"
                  as="h1"
                  variant="fade"
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
                />
              </div>
              
              {/* Right column - Description and stats */}
              <div className="lg:col-span-7 space-y-8">
                <AnimatedText
                  text="Crafting digital experiences that transform how people interact with technology—from e-commerce optimization to cutting-edge Web3 innovations."
                  as="p"
                  variant="fade"
                  delay={0.3}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                />
                
                {/* Inline stats - Reform Collective style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">50M+</div>
                    <div className="text-sm text-muted-foreground">Users Impacted</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">18%</div>
                    <div className="text-sm text-muted-foreground">Conversion Lift</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">40%</div>
                    <div className="text-sm text-muted-foreground">Performance Gain</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">6+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid - Inspired by Reform Collective layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {/* CTA Section - Designer style */}
          <div className="border-t border-border/50 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - CTA Text */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Let&apos;s Build Something Great Together
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ready to transform your digital experience? I&apos;m always excited to tackle new challenges 
                  and create exceptional solutions.
                </p>
              </div>
              
              {/* Right - Contact Actions */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <a
                    href="/contact"
                    className="group block p-6 border border-border/50 rounded-lg hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Start a Project</h3>
                        <p className="text-sm text-muted-foreground">Let&apos;s discuss your vision</p>
                      </div>
                      <div className="text-accent group-hover:translate-x-1 transition-transform">
                        →
                      </div>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:hello@tylerschmidt.com"
                    className="group block p-6 border border-border/50 rounded-lg hover:border-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Send an Email</h3>
                        <p className="text-sm text-muted-foreground">hello@tylerschmidt.com</p>
                      </div>
                      <div className="text-accent group-hover:translate-x-1 transition-transform">
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