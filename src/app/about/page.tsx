import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Tyler Schmidt's journey from Johns Hopkins to Silicon Valley, designing experiences that bridge technology and human needs.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-8 mb-16">
            <AnimatedText
              text="About"
              as="h1"
              variant="fade"
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            />
            
            <AnimatedText
              text="Where strategy meets design, and innovation becomes inevitable."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            />
          </div>

          {/* Main Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none space-y-12">
            
            {/* The Story */}
            <div className="space-y-6">
              <AnimatedText
                text="The Intersection of Vision and Execution"
                as="h2"
                variant="fade"
                delay={0.5}
                className="text-3xl font-bold text-foreground mb-6"
              />
              
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <AnimatedText
                  text="I don't just design interfaces—I architect the future of how humans interact with technology."
                  as="p"
                  variant="fade"
                  delay={0.7}
                  className="text-lg font-medium text-foreground"
                />
                
                <AnimatedText
                  text="My journey began at Johns Hopkins University, where I learned to think systemically about complex problems. But the real education happened in the trenches of Silicon Valley—from Google's agency team as a summer intern to leading buy flow optimization at Adobe, each role taught me that great design isn&apos;t about making things pretty. It&apos;s about making the impossible feel inevitable."
                  as="p"
                  variant="fade"
                  delay={0.9}
                />
                
                <AnimatedText
                  text="I&apos;ve had the privilege of working across the entire spectrum of digital transformation. At Adobe, I&apos;m currently focused on Commerce Growth, specifically buy flow optimization—the critical moment where browsing becomes buying. It&apos;s here that I&apos;ve learned that every pixel, every interaction, every micro-moment can be the difference between a lost opportunity and a converted customer."
                  as="p"
                  variant="fade"
                  delay={1.1}
                />
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-8 space-y-6">
              <AnimatedText
                text="Design Philosophy: Beyond the Interface"
                as="h2"
                variant="fade"
                delay={1.3}
                className="text-2xl font-bold text-foreground"
              />
              
              <AnimatedText
                text="The best designs are invisible. They don't announce themselves—they simply work. They anticipate needs before users know they have them. They turn complex processes into elegant experiences."
                as="p"
                variant="fade"
                delay={1.5}
                className="text-muted-foreground italic"
              />
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Strategic Thinking</h3>
                  <p className="text-sm text-muted-foreground">Every design decision should drive business value. I don't just solve user problems—I solve business problems through design.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Systems Mindset</h3>
                  <p className="text-sm text-muted-foreground">Great products aren't collections of features—they're cohesive systems that scale. I design for the ecosystem, not just the screen.</p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Future-Forward</h3>
                  <p className="text-sm text-muted-foreground">Technology evolves rapidly. I design experiences that adapt and evolve, staying relevant as the digital landscape transforms.</p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-6">
              <AnimatedText
                text="Where Innovation Meets Impact"
                as="h2"
                variant="fade"
                delay={1.7}
                className="text-3xl font-bold text-foreground"
              />
              
              <AnimatedText
                text="My expertise spans the entire digital product lifecycle, but I'm particularly passionate about the intersection of emerging technologies and human-centered design."
                as="p"
                variant="fade"
                delay={1.9}
                className="text-muted-foreground"
              />

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Current Focus Areas</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span><strong>Commerce Innovation:</strong> Optimizing buy flows and conversion experiences at scale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span><strong>AI Integration:</strong> Designing interfaces that make AI feel natural and accessible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span><strong>Web3 & Blockchain:</strong> Bridging the gap between complex technology and mainstream adoption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span><strong>Design Systems:</strong> Building scalable, consistent experiences across platforms</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Notable Achievements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>UX Certificate from Nielsen Norman Group (2021)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>Led Ubisoft.com redesign - a complete digital transformation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>Product lead for innovative multichain wallet experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>Recognized by Google leadership for exceptional contribution and organization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Personal */}
            <div className="border-t border-border pt-8 space-y-6">
              <AnimatedText
                text="Beyond the Pixels"
                as="h2"
                variant="fade"
                delay={2.1}
                className="text-3xl font-bold text-foreground"
              />
              
              <AnimatedText
                text="When I&apos;m not crafting digital experiences, you&apos;ll find me exploring the intersection of technology and culture. I&apos;m fascinated by how emerging technologies like AI and blockchain will reshape not just how we work, but how we connect, create, and collaborate."
                as="p"
                variant="fade"
                delay={2.3}
                className="text-muted-foreground"
              />
              
              <AnimatedText
                text="I&apos;m particularly drawn to projects that sit at the bleeding edge—whether that&apos;s designing for AI agents, creating seamless Web3 experiences, or rethinking how we approach digital commerce. The future isn&apos;t just arriving; it&apos;s being designed by people who understand that technology is only as powerful as the human experiences it enables."
                as="p"
                variant="fade"
                delay={2.5}
                className="text-muted-foreground"
              />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Ready to Build the Future?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you're looking to transform your digital experience, explore emerging technologies, or solve complex user problems, I'd love to discuss how we can create something extraordinary together.
              </p>
              <div className="pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Let's Talk
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 