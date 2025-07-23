import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about my background, skills, and experience in UX/UI design and engineering.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <AnimatedText
              text="About Me"
              as="h1"
              variant="fade"
              className="text-4xl md:text-6xl font-bold"
            />
            
            <AnimatedText
              text="Passionate about creating exceptional digital experiences that make a difference."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            />
          </div>

          {/* Placeholder for about content */}
          <div className="space-y-12">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center max-w-md mx-auto">
              <p className="text-muted-foreground">Profile content from Sanity CMS</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 