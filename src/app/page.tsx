import { PageWrapper } from "@/components/layout/page-transition"
import { Hero } from "@/components/sections/Hero"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { AboutTeaser } from "@/components/sections/AboutTeaser"
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy"
import { ContactCTA } from "@/components/sections/ContactCTA"
import { InteractiveStats } from "@/components/ui/interactive-stats"

// migrated project typing handled by data source

// Removed - using InteractiveProjectCard instead

export default function HomePage() {
  // legacy data replaced by data/projects.ts

  return (
    <PageWrapper>
      <Hero />

      <SelectedWork />
      <AboutTeaser />
      <FeaturedCaseStudy />
      <ContactCTA />

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
