import {
  AnimatedText,
  GradientText,
} from "@/components/animations/animated-text"
import { Button } from "@/components/ui/button"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { PageWrapper } from "@/components/layout/page-transition"

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          {/* Main Heading */}
          <div className="space-y-4">
            <AnimatedText
              text="Tyler Schmidt"
              as="h1"
              variant="fade"
              className="text-6xl font-bold tracking-tight md:text-8xl"
              delay={0.2}
              stagger={0.05}
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

          {/* Gradient Text Showcase */}
          <div className="space-y-4">
            <GradientText
              text="Modern Design"
              gradient="primary"
              className="block text-2xl font-semibold"
            />
            <GradientText
              text="Sophisticated Animations"
              gradient="rainbow"
              className="block text-2xl font-semibold"
              animated
            />
            <GradientText
              text="Cutting-Edge Technology"
              gradient="sunset"
              className="block text-2xl font-semibold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Button size="lg" variant="magnetic">
              View My Work
            </Button>
            <Button size="lg" variant="outline">
              Get In Touch
            </Button>
          </div>

          {/* Component Showcase */}
          <div className="space-y-8 pt-16">
            <h3 className="text-2xl font-semibold">Component Showcase</h3>

            {/* Button Variants */}
            <div className="flex flex-wrap justify-center gap-4">
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
                  variant="fade"
                  className="text-lg font-medium"
                />
                <AnimatedText
                  text="Typewriter Effect"
                  variant="typewriter"
                  className="font-mono text-lg font-medium"
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
      <footer className="border-border border-t px-6 py-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground text-sm">
            Portfolio v3.0 — Built with Next.js, TypeScript, Tailwind CSS, and
            Framer Motion
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
