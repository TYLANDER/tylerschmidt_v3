import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/Container'

export function Hero() {
  return (
    <section className="bg-white">
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="font-heading text-ink text-5xl md:text-7xl leading-tight mb-6">Precision Meets Purpose.</h1>
            <p className="text-ink/80 text-lg leading-relaxed mb-8 max-w-prose">UI/UX & Product Designer crafting bold, minimalist interfaces with a human edge.</p>
            <div className="flex items-center gap-4">
              <Link href="/work"><Button variant="default">View Work</Button></Link>
              <Link href="/about" className="text-accent font-medium">About Me</Link>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Artwork slot: optional image/graphic */}
            <div className="aspect-[4/3] rounded-md border border-ink/10 bg-muted" />
          </div>
        </div>
      </Container>
    </section>
  )
}


