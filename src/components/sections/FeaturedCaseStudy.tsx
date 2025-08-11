import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import projects from '@/data/projects'

export function FeaturedCaseStudy() {
  const featured = projects[0]
  if (!featured) return null
  return (
    <section className="bg-ink text-white">
      <Container className="py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="font-heading text-3xl md:text-4xl mb-4">{featured.title}</h3>
            <p className="text-white/80 mb-6 max-w-prose">{featured.oneLiner}</p>
            <Link href={`/work/${featured.slug}`}><Button variant="default" className="bg-accent text-white hover:bg-accent/90">Read Case Study</Button></Link>
          </div>
          <div className="relative aspect-video rounded-md overflow-hidden border border-white/10">
            <Image src={featured.coverSrc} alt={featured.title} fill className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  )
}


