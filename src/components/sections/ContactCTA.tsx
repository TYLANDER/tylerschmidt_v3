import { Container } from '@/components/ui/Container'

export function ContactCTA() {
  return (
    <section className="bg-white">
      <Container className="py-20 text-center">
        <h3 className="font-heading text-3xl md:text-4xl text-ink mb-3">Let’s Work Together.</h3>
        <p className="text-ink/80">Email <a className="text-accent underline" href="mailto:hello@tylerschmidt.com">hello@tylerschmidt.com</a> · <a className="text-accent underline" href="https://linkedin.com/in/tylerschmidt" target="_blank" rel="noreferrer">LinkedIn</a></p>
      </Container>
    </section>
  )
}


