import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "Work",
  description: "A showcase of my recent projects and design work.",
}

export default function WorkPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <AnimatedText
              text="Selected Work"
              as="h1"
              variant="fade"
              className="text-4xl md:text-6xl font-bold"
            />
            
            <AnimatedText
              text="A collection of projects that showcase my approach to design and development."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            />
          </div>

          {/* Placeholder for projects */}
          <div className="grid gap-8">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Projects will be loaded from Sanity CMS</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 