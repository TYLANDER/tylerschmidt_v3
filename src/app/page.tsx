import { AnimatedText, GradientText } from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { PageWrapper } from "@/components/layout/page-transition"

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20 min-h-screen">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Main Heading */}
          <div className="space-y-4">
            <AnimatedText
              text="Tyler Schmidt"
              as="h1"
              variant="fade"
              className="text-6xl md:text-8xl font-bold tracking-tight"
              delay={0.2}
              stagger={0.05}
            />
            
            <AnimatedText
              text="UX/UI Designer & Engineer"
              as="h2"
              variant="slide"
              className="text-xl md:text-2xl text-muted-foreground font-medium"
              delay={0.8}
            />
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <AnimatedText
              text="Crafting award-winning digital experiences that push the boundaries of design and technology."
              as="p"
              variant="fade"
              className="text-lg text-muted-foreground leading-relaxed"
              delay={1.2}
            />
          </div>

          {/* Gradient Text Showcase */}
          <div className="space-y-4">
            <GradientText
              text="Modern Design"
              gradient="primary"
              className="text-2xl font-semibold block"
            />
            <GradientText
              text="Sophisticated Animations"
              gradient="rainbow"
              className="text-2xl font-semibold block"
              animated
            />
            <GradientText
              text="Cutting-Edge Technology"
              gradient="sunset"
              className="text-2xl font-semibold block"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" variant="magnetic">
              View My Work
            </Button>
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </div>

          {/* Component Showcase */}
          <div className="pt-16 space-y-8">
            <h3 className="text-2xl font-semibold">Component Showcase</h3>
            
            {/* Button Variants */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="magnetic">Magnetic</Button>
            </div>

            {/* Text Animation Variants */}
            <div className="space-y-6">
              <div className="grid gap-4">
                <AnimatedText
                  text="Fade Animation"
                  variant="fade"
                  className="text-lg font-medium"
                />
                <AnimatedText
                  text="Slide Animation"
                  variant="slide"
                  className="text-lg font-medium"
                />
                <AnimatedText
                  text="Wave Animation"
                  variant="wave"
                  className="text-lg font-medium"
                />
                <AnimatedText
                  text="Typewriter Effect"
                  variant="typewriter"
                  className="text-lg font-medium font-mono"
                />
                <AnimatedText
                  text="Reveal Animation"
                  variant="reveal"
                  className="text-lg font-medium"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Portfolio v3.0 — Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>

      {/* Loading Screen Demo - Hidden by default */}
      <LoadingScreen 
        show={false} 
        progress={65} 
        message="Building something amazing..." 
        variant="detailed" 
      />
    </PageWrapper>
  )
}
