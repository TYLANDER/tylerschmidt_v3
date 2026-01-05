import { Metadata } from "next"
import { notFound } from "next/navigation"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"
import { PortraitImage } from "@/components/ui/portrait-image"
import { sanityFetch } from "@/sanity/lib/client"
import { aboutPageQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { AboutPage } from "@/types/sanity"

export async function generateMetadata(): Promise<Metadata> {
  const about = await sanityFetch<AboutPage>({
    query: aboutPageQuery,
  })

  if (!about) {
    return {
      title: "About",
      description: "Learn more about Tyler Schmidt",
    }
  }

  return {
    title: about.seo?.metaTitle || about.title || "About",
    description:
      about.seo?.metaDescription ||
      "Product Designer crafting the future of digital commerce at Adobe. Specializing in conversion optimization and emerging technologies.",
  }
}

export default async function AboutPage() {
  const about = await sanityFetch<AboutPage>({
    query: aboutPageQuery,
  })

  if (!about) {
    notFound()
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header - Removed About title per request */}

          {/* Main Content Grid */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Portrait */}
            <div className="lg:col-span-1">
              {about.portraitImage && (
                <PortraitImage
                  src={urlFor(about.portraitImage).width(800).quality(90).url()}
                  alt={
                    about.portraitImage.alt ||
                    "Tyler Schmidt - Product Designer"
                  }
                  variant="creative"
                  className="w-full lg:sticky lg:top-32"
                />
              )}
            </div>

            {/* Bio Content */}
            <div className="space-y-6 lg:col-span-2">
              <AnimatedText
                text={about.headline}
                as="h2"
                variant="fade"
                delay={0.3}
                className="text-2xl font-bold text-foreground md:text-3xl"
              />

              <AnimatedText
                text={about.bioFirstParagraph}
                as="p"
                variant="fade"
                delay={0.5}
                className="text-lg leading-relaxed text-muted-foreground"
              />

              <AnimatedText
                text={about.bioSecondParagraph}
                as="p"
                variant="fade"
                delay={0.7}
                className="text-lg leading-relaxed text-muted-foreground"
              />
            </div>
          </div>

          {/* Core Expertise */}
          {about.expertiseSection && (
            <div className="mb-16">
              <AnimatedText
                text={about.expertiseSection.title}
                as="h2"
                variant="fade"
                delay={0.9}
                className="mb-8 text-2xl font-bold"
              />

              <div className="grid gap-6 md:grid-cols-2">
                {about.expertiseSection.skills.map((skill, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-xl text-primary">{skill.icon}</span>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Philosophy */}
          {about.philosophyQuote && (
            <div className="mb-16 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <AnimatedText
                text={about.philosophyQuote.quote}
                as="p"
                variant="fade"
                delay={1.1}
                className="text-center text-xl font-medium italic text-foreground md:text-2xl"
              />
              {about.philosophyQuote.showAttribution && (
                <p className="mt-4 text-center text-muted-foreground">
                  — My Design Philosophy
                </p>
              )}
            </div>
          )}

          {/* Career Highlights */}
          {about.careerHighlights &&
            about.careerHighlights.highlights.length > 0 && (
              <div className="mb-16">
                <AnimatedText
                  text={about.careerHighlights.title}
                  as="h2"
                  variant="fade"
                  delay={1.3}
                  className="mb-8 text-2xl font-bold"
                />

                <div className="space-y-4">
                  {about.careerHighlights.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <span className="text-accent">→</span>
                      <span>
                        <strong className="text-foreground">
                          {highlight.company}:
                        </strong>{" "}
                        {highlight.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </PageWrapper>
  )
}
