import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { ContactForm } from "@/components/ui/contact-form"
import { PageWrapper } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to discuss your next project. I'm always excited to work on new challenges.",
}

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 space-y-8 text-center">
            <AnimatedText
              text="Let&apos;s Work Together"
              as="h1"
              variant="fade"
              className="text-4xl font-bold md:text-6xl"
            />

            <AnimatedText
              text="Ready to bring your vision to life? I&apos;d love to hear about your project."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-muted-foreground mx-auto max-w-2xl text-lg"
            />
          </div>

          <div className="mx-auto max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
