export interface Project {
  slug: string
  title: string
  oneLiner: string
  coverSrc: string
  role: string
  year: string
  tags: string[]
  featured?: boolean
}

const projects: Project[] = [
  {
    slug: 'adobe-commerce-optimization',
    title: 'Adobe Commerce Platform',
    oneLiner: 'Redesigned checkout flow increasing conversion by 23% across global markets.',
    coverSrc: '/images/projects/adobe-commerce.jpg',
    role: 'Senior Product Designer',
    year: '2024',
    tags: ['UX Strategy', 'E-commerce', 'Design System'],
    featured: true,
  },
  {
    slug: 'ubisoft-redesign',
    title: 'Ubisoft.com Redesign',
    oneLiner: 'Complete digital transformation for 100M+ annual visitors gaming platform.',
    coverSrc: '/images/projects/ubisoft.jpg',
    role: 'Lead UX Designer',
    year: '2023',
    tags: ['Web Design', 'Gaming', 'Brand'],
    featured: true,
  },
  {
    slug: 'abacus-wallet',
    title: 'Abacus Multichain Wallet',
    oneLiner: 'Simplified Web3 experience for managing assets across 20+ blockchains.',
    coverSrc: '/images/projects/abacus.jpg',
    role: 'Product Lead',
    year: '2023',
    tags: ['Web3', 'Mobile', 'Fintech'],
  },
  {
    slug: 'alfred-ai',
    title: 'Alfred AI Assistant',
    oneLiner: 'Natural language interface making AI accessible to non-technical users.',
    coverSrc: '/images/projects/alfred.jpg',
    role: 'Product Designer',
    year: '2022',
    tags: ['AI/ML', 'Conversational UI', 'SaaS'],
  },
  {
    slug: 'design-system-pro',
    title: 'Design System Pro',
    oneLiner: 'Enterprise design system powering 50+ products across multiple platforms.',
    coverSrc: '/images/projects/design-system.jpg',
    role: 'Design System Lead',
    year: '2022',
    tags: ['Design Systems', 'Documentation', 'Components'],
  },
  {
    slug: 'neural-interface',
    title: 'Neural Interface',
    oneLiner: 'Experimental UI for brain-computer interface research platform.',
    coverSrc: '/images/projects/neural.jpg',
    role: 'UX Researcher',
    year: '2021',
    tags: ['Research', 'Experimental', 'Healthcare'],
  },
]

export default projects