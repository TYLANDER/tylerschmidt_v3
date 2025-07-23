import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { AnimatedHero } from "@/components/three/animated-hero"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "Lab",
  description: "Experimental projects, prototypes, and interactive demos showcasing cutting-edge web technologies.",
}

export default function LabPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <AnimatedText
              text="The Lab"
              as="h1"
              variant="fade"
              className="text-4xl md:text-6xl font-bold"
            />
            
            <AnimatedText
              text="Experimental projects and interactive demos pushing the boundaries of web technology."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            />
          </div>

          {/* Three.js Demo */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-muted to-background rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">WebGL Animation Demo</h3>
              <div className="h-96 rounded-lg overflow-hidden">
                <AnimatedHero />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 