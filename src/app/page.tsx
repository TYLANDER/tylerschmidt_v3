import { PageWrapper } from "@/components/layout/page-transition"
import { Hero } from "@/components/sections/Hero"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { AboutTeaser } from "@/components/sections/AboutTeaser"
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy"
import { ContactCTA } from "@/components/sections/ContactCTA"


// migrated project typing handled by data source

// Removed - using InteractiveProjectCard instead

export default function HomePage() {
  // Precision Punk aesthetic - where math meets emotion
  // legacy data replaced by data/projects.ts

  return (
    <PageWrapper>
      <Hero />

      <SelectedWork />
      <AboutTeaser />
      <FeaturedCaseStudy />
      <ContactCTA />

        
    </PageWrapper>
  )
}
