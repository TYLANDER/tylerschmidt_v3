import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import projects from '@/data/projects'

export function SelectedWork() {
  const items = projects.slice(0, 6)
  return (
    <section className="bg-white">
      <Container className="py-16">
        <h2 className="font-heading text-3xl md:text-4xl text-ink mb-8">Selected Work</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`}>
              <Card className="group">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={p.coverSrc} alt={p.title} fill className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors" />
                </div>
                <div className="p-4">
                  <h3 className="text-ink font-semibold mb-1 group-hover:underline underline-offset-4 decoration-accent">{p.title}</h3>
                  <p className="text-ink/70 text-sm">{p.oneLiner}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}


