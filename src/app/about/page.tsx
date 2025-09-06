import { Metadata } from "next"
import Link from "next/link"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"
import { PortraitImage } from "@/components/ui/portrait-image"

export const metadata: Metadata = {
  title: "About",
  description:
    "Product Designer crafting the future of digital commerce at Adobe. Specializing in conversion optimization and emerging technologies.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header - More punchy */}
          <div className="mb-16 space-y-4">
            <AnimatedText
              text="About"
              as="h1"
              variant="slide"
              className="text-4xl font-bold text-gray-900 dark:text-white md:text-6xl"
            />
          </div>

          {/* Main Content Grid */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Portrait */}
            <div className="lg:col-span-1">
              <PortraitImage
                src="/images/tyler-portrait@2x.jpg"
                alt="Tyler Schmidt - Product Designer"
                variant="creative"
                className="w-full lg:sticky lg:top-32"
              />
            </div>

            {/* Bio Content - Much more concise */}
            <div className="space-y-6 lg:col-span-2">
              <AnimatedText
                text="I design experiences that turn browsers into buyers."
                as="h2"
                variant="fade"
                delay={0.3}
                className="text-2xl font-bold text-foreground md:text-3xl"
              />

              <AnimatedText
                text="Currently optimizing commerce experiences at Adobe, where every pixel impacts millions in revenue. Previously transformed digital experiences at Ubisoft and led Web3 innovation at SketchSite."
                as="p"
                variant="fade"
                delay={0.5}
                className="text-lg leading-relaxed text-muted-foreground"
              />

              <AnimatedText
                text="Johns Hopkins alumni. Google intern turned Silicon Valley designer. Nielsen Norman certified. I believe great design isn't about making things pretty—it's about making the impossible feel inevitable."
                as="p"
                variant="fade"
                delay={0.7}
                className="text-lg leading-relaxed text-muted-foreground"
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">8+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50M+</div>
                  <div className="text-sm text-muted-foreground">
                    Users Impacted
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    Industries
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Expertise - Visual and Scannable */}
          <div className="mb-16">
            <AnimatedText
              text="What I Do"
              as="h2"
              variant="fade"
              delay={0.9}
              className="mb-8 text-2xl font-bold"
            />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl text-primary">💰</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      Commerce Optimization
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Turning friction into flow. Specializing in checkout
                      experiences that convert.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl text-primary">🤖</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      AI & Emerging Tech
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Making complex technology feel human. From AI interfaces
                      to Web3 experiences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl text-primary">📊</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      Strategic Design
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Every decision backed by data. Design that drives business
                      outcomes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl text-primary">🎯</span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      Systems Thinking
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Building experiences that scale. From components to
                      ecosystems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy - Simplified */}
          <div className="mb-16 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-8">
            <AnimatedText
              text="The best designs are invisible. They don't announce themselves—they simply work."
              as="p"
              variant="fade"
              delay={1.1}
              className="text-center text-xl font-medium italic text-foreground md:text-2xl"
            />
            <p className="mt-4 text-center text-muted-foreground">
              — My Design Philosophy
            </p>
          </div>

          {/* Notable Work - Quick Highlights */}
          <div className="mb-16">
            <AnimatedText
              text="Career Highlights"
              as="h2"
              variant="fade"
              delay={1.3}
              className="mb-8 text-2xl font-bold"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-accent">→</span>
                <span>
                  <strong className="text-foreground">Adobe:</strong> Leading
                  commerce growth initiatives, optimizing buy flows at scale
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-accent">→</span>
                <span>
                  <strong className="text-foreground">Ubisoft:</strong> Complete
                  redesign of Ubisoft.com, transforming their digital presence
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-accent">→</span>
                <span>
                  <strong className="text-foreground">SketchSite:</strong>{" "}
                  Product lead for innovative multichain wallet experiences
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-accent">→</span>
                <span>
                  <strong className="text-foreground">Recognition:</strong>{" "}
                  Nielsen Norman UX Certified, Google leadership award
                </span>
              </div>
            </div>
          </div>

          {/* CTA - Stronger and more direct */}
          <div className="space-y-6 border-t border-border py-12 text-center">
            <AnimatedText
              text="Let's create something extraordinary."
              as="h2"
              variant="fade"
              delay={1.5}
              className="text-3xl font-bold"
            />
            <div className="flex justify-center gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-md border border-input px-8 py-3 font-medium transition-all hover:bg-accent hover:text-accent-foreground"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
