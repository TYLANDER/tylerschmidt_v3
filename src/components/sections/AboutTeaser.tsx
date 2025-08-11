import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'

export function AboutTeaser() {
  return (
    <section className="bg-white">
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square rounded-md border border-ink/10 overflow-hidden bg-muted">
            <Image src="/next.svg" alt="about" fill className="object-contain p-8" />
          </div>
          <div>
            <h3 className="font-heading text-2xl md:text-3xl text-ink mb-3">Design Without Distraction.</h3>
            <p className="text-ink/80 leading-relaxed mb-6">I build systems and surfaces that get out of the way—bold where it matters, quiet everywhere else.</p>
            <Link href="/about"><Button variant="outline">About</Button></Link>
          </div>
        </div>
      </Container>
    </section>
  )
}


