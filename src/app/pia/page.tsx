"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function PiaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/Pia_hero_1.png"
            alt="Pia - Creative Director"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Grid background overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full">
            <defs>
              <pattern id="pia-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pia-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-end pb-20 px-6">
          <motion.div 
            className="max-w-6xl mx-auto w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Meet Pia
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p className="text-2xl md:text-3xl text-gray-200 mb-8">
                Creative Director
              </p>
              <div className="inline-flex items-center gap-4 text-sm font-mono text-gray-300">
                <span>Olympia Schmidt</span>
                <span>•</span>
                <span>5 Years Experience</span>
                <span>•</span>
                <span>100% Creative Vision</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating paw prints */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🐾
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              The Pia Standard™
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  principle: "The Comfort Test",
                  description: "If Pia wouldn't nap here, the UX needs work",
                  metric: "97% nap approval rate"
                },
                {
                  principle: "The Attention Standard",
                  description: "Must be more engaging than a tennis ball",
                  metric: "Holds attention for 3+ seconds"
                },
                {
                  principle: "The Welcome Protocol",
                  description: "Everyone gets greeted like they're holding treats",
                  metric: "Zero growls recorded"
                },
                {
                  principle: "The Play-Rest Balance",
                  description: "Sprint when excited, nap when needed",
                  metric: "Perfect work-life balance"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold mb-2">{item.principle}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-sm font-mono text-accent">{item.metric}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            A Day in the Life
          </h2>
          
          <div className="space-y-4 font-mono">
            {[
              { time: "09:00", activity: "Morning quality inspection", status: "critical" },
              { time: "09:30", activity: "Breakfast and treat evaluation", status: "important" },
              { time: "10:00", activity: "First nap (UX comfort testing)", status: "testing" },
              { time: "11:30", activity: "Code review from bed", status: "reviewing" },
              { time: "12:00", activity: "Mandatory walk (inspiration gathering)", status: "research" },
              { time: "13:00", activity: "Lunch and second nap", status: "recharging" },
              { time: "14:30", activity: "Play session (team building)", status: "collaboration" },
              { time: "15:00", activity: "Final approvals", status: "approving" },
              { time: "16:00", activity: "End of day report (tail wags)", status: "complete" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-muted-foreground">{item.time}</span>
                <span className="flex-1">{item.activity}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'critical' ? 'bg-destructive/20 text-destructive' :
                  item.status === 'important' ? 'bg-accent/20 text-accent' :
                  item.status === 'complete' ? 'bg-success/20 text-success' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            What Clients Say About Pia
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Best code review I&apos;ve ever had. The tail wag at the end really sealed the deal.",
                author: "Anonymous Developer",
                rating: "5/5 paws"
              },
              {
                quote: "Pia&apos;s comfort testing revealed critical UX issues we hadn&apos;t considered.",
                author: "Product Manager",
                rating: "10/10 would pet again"
              },
              {
                quote: "The &apos;treat-driven development&apos; methodology has revolutionized our workflow.",
                author: "Tech Lead",
                rating: "Certified Good Girl"
              },
              {
                quote: "Her attention to detail is unmatched. Also, she&apos;s very soft.",
                author: "Designer",
                rating: "Royal Approval"
              }
            ].map((item, index) => (
              <motion.blockquote
                key={index}
                className="bg-card border border-border rounded-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-lg mb-4 italic">&ldquo;{item.quote}&rdquo;</p>
                <footer className="text-sm text-muted-foreground">
                  <cite className="not-italic">{item.author}</cite>
                  <p className="text-accent mt-1">{item.rating}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Want to Meet Pia?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation and experience the Pia Standard™ firsthand.
            Treats optional but appreciated.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Schedule a Meeting
            <span className="text-xl">🐾</span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
