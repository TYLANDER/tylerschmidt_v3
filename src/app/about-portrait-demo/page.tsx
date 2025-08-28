import { Metadata } from "next"
import {
  AnimatedText,
  ClassifiedText,
} from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"
import { PortraitImage } from "@/components/ui/portrait-image"
import { AboutWithPortrait } from "@/components/sections/AboutWithPortrait"
import { LivePhoto } from "@/components/ui/live-photo"

export const metadata: Metadata = {
  title: "About - Portrait Demo",
  description: "Portrait layout demonstration",
}

export default function AboutPortraitDemoPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 space-y-8 text-center">
            <AnimatedText
              text="About - Portrait Layout Demo"
              as="h1"
              variant="decrypt"
              className="rgb-text text-4xl font-bold md:text-6xl"
            />

            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Demonstrating different portrait layout options
            </p>
          </div>

          {/* Layout Options */}
          <div className="space-y-24">
            {/* Option 0: Live Photo */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">
                Option 0: Live Photo (iPhone-style)
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <div className="float-left mr-8 mb-8 w-full md:w-1/3">
                  <LivePhoto
                    videoSrc="/images/tyler-live-photo.mp4"
                    imageSrc="/images/tyler-portrait.jpg"
                    alt="Tyler Schmidt - Product Designer"
                    className="rounded-2xl shadow-2xl"
                    autoPlay={true}
                    playOnInView={true}
                    duration={2500}
                  />
                </div>
                
                <p className="text-foreground text-lg font-medium">
                  Experience the moment come to life.
                </p>

                <p>
                  This Live Photo feature mimics the iPhone experience, automatically playing a short video clip when the image comes into view, then settling on the still frame. It adds a dynamic, personal touch that brings your portrait to life.
                </p>

                <p>
                  The subtle movement creates an immediate connection with visitors, making the about page feel more personal and engaging. You can also click or hover to replay the animation.
                </p>
              </div>
            </div>
            {/* Option 1: Creative Floating Layout */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground">
                Option 1: Creative Floating Layout
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <PortraitImage
                  src="/images/tyler-portrait.jpg"
                  alt="Tyler Schmidt - Product Designer"
                  variant="creative"
                  className="md:w-1/3"
                />
                
                <p className="text-foreground text-lg font-medium">
                  I don&apos;t just design interfaces—I architect the future of how humans interact with technology.
                </p>

                <p>
                  My journey began at Johns Hopkins University, where I learned to think systemically about complex problems. But the real education happened in the trenches of Silicon Valley—from Google&apos;s agency team as a summer intern to leading buy flow optimization at Adobe, each role taught me that great design isn&apos;t about making things pretty. It&apos;s about making the impossible feel inevitable.
                </p>

                <p>
                  I&apos;ve had the privilege of working across the entire spectrum of digital transformation. At Adobe, I&apos;m currently focused on Commerce Growth, specifically buy flow optimization—the critical moment where browsing becomes buying. It&apos;s here that I&apos;ve learned that every pixel, every interaction, every micro-moment can be the difference between a lost opportunity and a converted customer.
                </p>

                <p>
                  The best designs are invisible. They don&apos;t announce themselves—they simply work. They anticipate needs before users know they have them. They turn complex processes into elegant experiences.
                </p>
              </div>
            </div>

            {/* Option 2: Shaped Layout */}
            <div className="space-y-8 border-t pt-16">
              <h2 className="text-2xl font-bold text-foreground">
                Option 2: Organic Shaped Layout
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <PortraitImage
                  src="/images/tyler-portrait.jpg"
                  alt="Tyler Schmidt - Product Designer"
                  variant="shaped"
                  className="md:w-1/3"
                />
                
                <p className="text-foreground text-lg font-medium">
                  Where strategy meets design, and innovation becomes inevitable.
                </p>

                <p>
                  My expertise spans the entire digital product lifecycle, but I&apos;m particularly passionate about the intersection of emerging technologies and human-centered design. Whether it&apos;s optimizing buy flows and conversion experiences at scale, designing interfaces that make AI feel natural and accessible, or bridging the gap between complex Web3 technology and mainstream adoption, I believe in creating experiences that not only solve problems but anticipate future needs.
                </p>

                <p>
                  Great products aren&apos;t collections of features—they&apos;re cohesive systems that scale. I design for the ecosystem, not just the screen. Technology evolves rapidly, and I design experiences that adapt and evolve, staying relevant as the digital landscape transforms.
                </p>
              </div>
            </div>

            {/* Option 3: Grid Layout */}
            <div className="space-y-8 border-t pt-16">
              <h2 className="text-2xl font-bold text-foreground">
                Option 3: Structured Grid Layout
              </h2>
              <AboutWithPortrait 
                portraitSrc="/images/tyler-portrait.jpg"
                variant="grid"
              />
            </div>

            {/* Option 4: Circular Float */}
            <div className="space-y-8 border-t pt-16">
              <h2 className="text-2xl font-bold text-foreground">
                Option 4: Circular Float Layout
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <PortraitImage
                  src="/images/tyler-portrait.jpg"
                  alt="Tyler Schmidt - Product Designer"
                  variant="floating"
                  className="md:w-1/3"
                />
                
                <p className="text-foreground text-lg font-medium">
                  Every design decision should drive business value.
                </p>

                <p>
                  I don&apos;t just solve user problems—I solve business problems through design. From UX certification with Nielsen Norman Group to leading the Ubisoft.com redesign, from product leadership for innovative multichain wallet experiences to recognition by Google leadership for exceptional contribution, my career has been marked by a consistent ability to deliver results that matter.
                </p>

                <p>
                  When I&apos;m not crafting digital experiences, you&apos;ll find me exploring the intersection of technology and culture. I&apos;m fascinated by how emerging technologies like AI and blockchain will reshape not just how we work, but how we connect, create, and collaborate.
                </p>

                <p>
                  The future isn&apos;t just arriving; it&apos;s being designed by people who understand that technology is only as powerful as the human experiences it enables. Whether you&apos;re looking to transform your digital experience, explore emerging technologies, or solve complex user problems, I&apos;d love to discuss how we can create something extraordinary together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
