import { Metadata } from "next"
import { AnimatedText } from "@/components/animations/animated-text"
import { PageWrapper } from "@/components/layout/page-transition"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Work",
  description: "Explore Tyler Schmidt's portfolio of digital experiences - from Adobe Commerce optimization to Ubisoft redesigns and Web3 innovations.",
}

interface ProjectCardProps {
  title: string
  description: string
  role: string
  company: string
  year: string
  tags: string[]
  features: string[]
  isComingSoon?: boolean
  gradient: string
}

function ProjectCard({
  title,
  description,
  role,
  company,
  year,
  tags,
  features,
  isComingSoon = false,
  gradient
}: ProjectCardProps) {
  return (
    <div className={`relative rounded-lg p-8 bg-gradient-to-br ${gradient} border border-border/50 overflow-hidden group`}>
      {isComingSoon && (
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          Case Study Coming Soon
        </div>
      )}
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium">{company}</span>
            <span>•</span>
            <span>{year}</span>
            <span>•</span>
            <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">{role}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-background/50 backdrop-blur text-foreground text-xs rounded-full border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Achievements:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!isComingSoon && (
          <div className="pt-4">
            <button className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
              View Details
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function WorkPage() {
  const projects: ProjectCardProps[] = [
    {
      title: "Commerce Growth Optimization",
      description: "Leading buy flow optimization initiatives that directly impact conversion rates for millions of users across Adobe's commerce ecosystem. Transforming complex purchase journeys into seamless, intuitive experiences.",
      role: "Senior UX Designer",
      company: "Adobe",
      year: "2024-Present",
      tags: ["E-commerce", "Conversion Optimization", "A/B Testing", "User Research", "Design Systems"],
      features: [
        "Increased checkout conversion rates by 18% through strategic UX improvements",
        "Led cross-functional team of 12+ stakeholders across product, engineering, and marketing",
        "Implemented data-driven design methodology with continuous testing and iteration",
        "Created scalable design patterns adopted across multiple Adobe Commerce products"
      ],
      gradient: "from-blue-500/10 to-purple-500/10",
      isComingSoon: true
    },
    {
      title: "Ubisoft.com Complete Redesign",
      description: "Spearheaded the complete digital transformation of Ubisoft's flagship website, creating a modern, gaming-focused experience that better showcases their world-class game portfolio and engages millions of players worldwide.",
      role: "Lead UX Designer",
      company: "Ubisoft",
      year: "2023",
      tags: ["Web Design", "Gaming", "Brand Identity", "Responsive Design", "Content Strategy"],
      features: [
        "Redesigned entire user experience for 50M+ monthly visitors",
        "Implemented modern design system aligned with gaming culture and brand values",
        "Improved page load speeds by 40% through optimized user flows",
        "Created seamless game discovery experience connecting users to Ubisoft's ecosystem"
      ],
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      title: "Abacus Multichain Wallet",
      description: "Product lead for an innovative Web3 wallet experience that simplifies multichain cryptocurrency management. Bridging the gap between complex blockchain technology and mainstream user adoption.",
      role: "Product Lead",
      company: "Abacus",
      year: "2023",
      tags: ["Web3", "Blockchain", "Product Strategy", "Mobile Design", "Security UX"],
      features: [
        "Designed intuitive multichain wallet supporting 15+ blockchain networks",
        "Reduced user onboarding time by 60% through streamlined KYC flows",
        "Implemented advanced security features without compromising usability",
        "Led product strategy resulting in 200K+ active wallet users within 6 months"
      ],
      gradient: "from-green-500/10 to-teal-500/10"
    },
    {
      title: "Alfred AI Assistant",
      description: "Designed the core product experience for an AI-powered assistant that helps users navigate complex workflows. Focused on making artificial intelligence feel natural and accessible for everyday tasks.",
      role: "Product Designer",
      company: "Alfred AI",
      year: "2022-2023",
      tags: ["AI/ML", "Conversational UI", "Product Design", "User Testing", "Interaction Design"],
      features: [
        "Created conversational interface handling 1M+ daily interactions",
        "Designed adaptive AI responses based on user behavior patterns",
        "Implemented voice and text interaction modes for accessibility",
        "Achieved 4.8/5.0 user satisfaction rating through iterative testing"
      ],
      gradient: "from-violet-500/10 to-pink-500/10"
    },
    {
      title: "Destiny UX Optimization",
      description: "Enhanced user experience for a high-traffic digital platform, focusing on user engagement, retention, and conversion optimization through data-driven design decisions.",
      role: "UX Designer",
      company: "Destiny",
      year: "2022",
      tags: ["UX Design", "Data Analysis", "User Research", "Prototyping", "Growth"],
      features: [
        "Increased user engagement by 35% through improved information architecture",
        "Conducted extensive user research with 500+ participants",
        "Streamlined user onboarding reducing drop-off rates by 25%",
        "Implemented responsive design supporting mobile-first user base"
      ],
      gradient: "from-cyan-500/10 to-blue-500/10"
    },
    {
      title: "Mothership Design System",
      description: "Architected and implemented a comprehensive design system for Ubisoft's digital properties, ensuring consistency and scalability across multiple gaming platforms and experiences.",
      role: "Design Systems Lead",
      company: "Ubisoft",
      year: "2022",
      tags: ["Design Systems", "Component Library", "Brand Guidelines", "Developer Tools", "Scalability"],
      features: [
        "Built comprehensive design system serving 50+ digital products",
        "Created automated design-to-code workflow reducing development time by 40%",
        "Established design governance processes across multiple teams",
        "Documented 200+ reusable components with usage guidelines"
      ],
      gradient: "from-indigo-500/10 to-purple-500/10",
      isComingSoon: true
    }
  ]

  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center space-y-8 mb-16">
            <AnimatedText
              text="Selected Work"
              as="h1"
              variant="fade"
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            />
            
            <AnimatedText
              text="Crafting digital experiences that transform how people interact with technology—from e-commerce optimization to cutting-edge Web3 innovations."
              as="p"
              variant="fade"
              delay={0.3}
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            />
          </div>

          {/* Work Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">50M+</div>
              <div className="text-sm text-muted-foreground">Users Impacted</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">18%</div>
              <div className="text-sm text-muted-foreground">Conversion Increase</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">40%</div>
              <div className="text-sm text-muted-foreground">Performance Gain</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">6+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            <AnimatedText
              text="Professional Journey"
              as="h2"
              variant="fade"
              delay={0.5}
              className="text-3xl font-bold text-center"
            />
            
            <div className="bg-gradient-to-r from-muted/10 to-accent/5 rounded-lg p-8">
              <div className="space-y-8">
                
                <div className="border-l-2 border-accent/20 pl-6 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-3 h-3 bg-accent rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h3 className="text-lg font-semibold">Senior UX Designer - Commerce Growth</h3>
                        <span className="text-sm text-muted-foreground">Adobe • 2024-Present</span>
                      </div>
                      <p className="text-muted-foreground">Leading buy flow optimization and conversion rate improvements for Adobe Commerce ecosystem.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-3 h-3 bg-primary rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h3 className="text-lg font-semibold">Lead UX Designer</h3>
                        <span className="text-sm text-muted-foreground">Ubisoft • 2022-2023</span>
                      </div>
                      <p className="text-muted-foreground">Spearheaded complete Ubisoft.com redesign and developed Mothership Design System.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h3 className="text-lg font-semibold">Product Designer & Strategist</h3>
                        <span className="text-sm text-muted-foreground">Various Startups • 2020-2022</span>
                      </div>
                      <p className="text-muted-foreground">Product lead for Web3 innovations, AI assistants, and user experience optimization across multiple ventures.</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-8 top-1 w-3 h-3 bg-muted-foreground rounded-full"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h3 className="text-lg font-semibold">Summer Intern - Agency Team</h3>
                        <span className="text-sm text-muted-foreground">Google • 2019</span>
                      </div>
                      <p className="text-muted-foreground">Contributed to agency partnerships and digital advertising solutions, recognized for exceptional performance and organization.</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 mt-16">
            <h2 className="text-2xl font-bold">Interested in Working Together?</h2>
                         <p className="text-muted-foreground max-w-2xl mx-auto">
               I&apos;m always excited to tackle new challenges and create exceptional digital experiences. 
               Let&apos;s discuss how we can bring your vision to life.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Start a Project
              </a>
              <a
                href="/lab"
                className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-medium rounded-md hover:bg-accent/10 transition-colors"
              >
                Explore My Lab
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 