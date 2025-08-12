import { PageWrapper } from "@/components/layout/page-transition"
import { PrecisionPunkHero } from "@/components/sections/PrecisionPunkHero"
import { PrecisionPunkWork } from "@/components/sections/PrecisionPunkWork"
import { AboutTeaser } from "@/components/sections/AboutTeaser"
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy"
import { ContactCTA } from "@/components/sections/ContactCTA"


// migrated project typing handled by data source

// Removed - using InteractiveProjectCard instead

export default function HomePage() {
  // legacy data replaced by data/projects.ts

  return (
    <PageWrapper>
      <PrecisionPunkHero />

      <PrecisionPunkWork />
      <AboutTeaser />
      <FeaturedCaseStudy />
      <ContactCTA />

        
    </PageWrapper>
  )
}
