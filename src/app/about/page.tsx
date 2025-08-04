import { Metadata } from "next"
import {
  AnimatedText,
  ClassifiedText,
} from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Tyler Schmidt's journey from Johns Hopkins to Silicon Valley, designing experiences that bridge technology and human needs.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 space-y-8 text-center">
            <AnimatedText
              text="About"
              as="h1"
              variant="decrypt"
              className="rgb-text text-4xl font-bold md:text-6xl"
            />

            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Where strategy meets design, and innovation becomes inevitable.
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none space-y-12">
            {/* The Story */}
            <div className="space-y-6">
              <AnimatedText
                text="The Intersection of Vision and Execution"
                as="h2"
                variant="decrypt"
                delay={0.5}
                className="text-foreground mb-6 text-3xl font-bold"
              />

              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <ClassifiedText
                  text="I don't just design interfaces—I architect the future of how humans interact with technology."
                  className="text-foreground text-lg font-medium"
                  redactionRate={0.2}
                  delay={0.7}
                />

                <ClassifiedText
                  text="My journey began at Johns Hopkins University, where I learned to think systemically about complex problems. But the real education happened in the trenches of Silicon Valley—from Google's agency team as a summer intern to leading buy flow optimization at Adobe, each role taught me that great design isn't about making things pretty. It's about making the impossible feel inevitable."
                  className="text-muted-foreground"
                  redactionRate={0.15}
                  delay={1.0}
                />

                <ClassifiedText
                  text="I've had the privilege of working across the entire spectrum of digital transformation. At Adobe, I'm currently focused on Commerce Growth, specifically buy flow optimization—the critical moment where browsing becomes buying. It's here that I've learned that every pixel, every interaction, every micro-moment can be the difference between a lost opportunity and a converted customer."
                  className="text-muted-foreground"
                  redactionRate={0.18}
                  delay={1.3}
                />
              </div>
            </div>

            {/* Philosophy */}
            <div className="from-accent/5 to-primary/5 space-y-6 rounded-lg bg-gradient-to-r p-8">
              <AnimatedText
                text="Design Philosophy: Beyond the Interface"
                as="h2"
                variant="decrypt"
                delay={1.3}
                className="text-foreground text-2xl font-bold"
              />

              <ClassifiedText
                text="The best designs are invisible. They don't announce themselves—they simply work. They anticipate needs before users know they have them. They turn complex processes into elegant experiences."
                className="text-muted-foreground italic"
                redactionRate={0.25}
                delay={1.8}
              />

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold">
                    Strategic Thinking
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Every design decision should drive business value. I
                    don&apos;t just solve user problems—I solve business
                    problems through design.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold">
                    Systems Mindset
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Great products aren&apos;t collections of
                    features—they&apos;re cohesive systems that scale. I design
                    for the ecosystem, not just the screen.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-foreground font-semibold">
                    Future-Forward
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Technology evolves rapidly. I design experiences that adapt
                    and evolve, staying relevant as the digital landscape
                    transforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-6">
              <AnimatedText
                text="Where Innovation Meets Impact"
                as="h2"
                variant="decrypt"
                delay={1.7}
                className="text-foreground text-3xl font-bold"
              />

              <ClassifiedText
                text="My expertise spans the entire digital product lifecycle, but I'm particularly passionate about the intersection of emerging technologies and human-centered design."
                className="text-muted-foreground"
                redactionRate={0.2}
                delay={2.2}
              />

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-foreground text-xl font-semibold">
                    Current Focus Areas
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        <strong>Commerce Innovation:</strong> Optimizing buy
                        flows and conversion experiences at scale
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        <strong>AI Integration:</strong> Designing interfaces
                        that make AI feel natural and accessible
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        <strong>Web3 & Blockchain:</strong> Bridging the gap
                        between complex technology and mainstream adoption
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        <strong>Design Systems:</strong> Building scalable,
                        consistent experiences across platforms
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-foreground text-xl font-semibold">
                    Notable Achievements
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        UX Certificate from Nielsen Norman Group (2021)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        Led Ubisoft.com redesign - a complete digital
                        transformation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        Product lead for innovative multichain wallet
                        experiences
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>
                        Recognized by Google leadership for exceptional
                        contribution and organization
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Personal */}
            <div className="border-border space-y-6 border-t pt-8">
              <AnimatedText
                text="Beyond the Pixels"
                as="h2"
                variant="decrypt"
                delay={2.1}
                className="text-foreground text-3xl font-bold"
              />

              <ClassifiedText
                text="When I'm not crafting digital experiences, you'll find me exploring the intersection of technology and culture. I'm fascinated by how emerging technologies like AI and blockchain will reshape not just how we work, but how we connect, create, and collaborate."
                className="text-muted-foreground"
                redactionRate={0.15}
                delay={2.6}
              />

              <ClassifiedText
                text="I'm particularly drawn to projects that sit at the bleeding edge—whether that's designing for AI agents, creating seamless Web3 experiences, or rethinking how we approach digital commerce. The future isn't just arriving; it's being designed by people who understand that technology is only as powerful as the human experiences it enables."
                className="text-muted-foreground"
                redactionRate={0.22}
                delay={2.9}
              />
            </div>

            {/* CTA */}
            <div className="from-primary/10 to-accent/10 space-y-4 rounded-lg bg-gradient-to-r p-8 text-center">
              <AnimatedText
                text="Ready to Build the Future?"
                as="h2"
                variant="decrypt"
                delay={2.7}
                className="text-foreground text-2xl font-bold"
              />
              <ClassifiedText
                text="Whether you're looking to transform your digital experience, explore emerging technologies, or solve complex user problems, I'd love to discuss how we can create something extraordinary together."
                className="text-muted-foreground mx-auto max-w-2xl"
                redactionRate={0.18}
                delay={3.2}
              />
              <div className="pt-4">
                <a
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-8 py-3 font-medium transition-colors"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
