"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

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
          <svg className="h-full w-full">
            <defs>
              <pattern
                id="pia-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pia-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen items-end px-6 pb-20">
          <motion.div
            className="mx-auto w-full max-w-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              className="mb-4 text-6xl font-bold text-white md:text-8xl lg:text-9xl"
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
              <p className="mb-8 text-2xl text-gray-200 md:text-3xl">
                Creative Director
              </p>
              <div className="inline-flex items-center gap-4 font-mono text-sm text-gray-300">
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
              The Pia Standard™
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  principle: "The Comfort Test",
                  description: "If Pia wouldn't nap here, the UX needs work",
                  metric: "97% nap approval rate",
                },
                {
                  principle: "The Attention Standard",
                  description: "Must be more engaging than a tennis ball",
                  metric: "Holds attention for 3+ seconds",
                },
                {
                  principle: "The Welcome Protocol",
                  description:
                    "Everyone gets greeted like they're holding treats",
                  metric: "Zero growls recorded",
                },
                {
                  principle: "The Play-Rest Balance",
                  description: "Sprint when excited, nap when needed",
                  metric: "Perfect work-life balance",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="mb-2 text-xl font-semibold">
                    {item.principle}
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="font-mono text-sm text-accent">{item.metric}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="bg-muted/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
            A Day in the Life
          </h2>

          <div className="space-y-4 font-mono">
            {[
              {
                time: "09:00",
                activity: "Morning quality inspection",
                status: "critical",
              },
              {
                time: "09:30",
                activity: "Breakfast and treat evaluation",
                status: "important",
              },
              {
                time: "10:00",
                activity: "First nap (UX comfort testing)",
                status: "testing",
              },
              {
                time: "11:30",
                activity: "Code review from bed",
                status: "reviewing",
              },
              {
                time: "12:00",
                activity: "Mandatory walk (inspiration gathering)",
                status: "research",
              },
              {
                time: "13:00",
                activity: "Lunch and second nap",
                status: "recharging",
              },
              {
                time: "14:30",
                activity: "Play session (team building)",
                status: "collaboration",
              },
              {
                time: "15:00",
                activity: "Final approvals",
                status: "approving",
              },
              {
                time: "16:00",
                activity: "End of day report (tail wags)",
                status: "complete",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-muted-foreground">{item.time}</span>
                <span className="flex-1">{item.activity}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    item.status === "critical"
                      ? "bg-destructive/20 text-destructive"
                      : item.status === "important"
                        ? "bg-accent/20 text-accent"
                        : item.status === "complete"
                          ? "bg-success/20 text-success"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold md:text-5xl">
            What Clients Say About Pia
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote:
                  "Best code review I've ever had. The tail wag at the end really sealed the deal.",
                author: "Anonymous Developer",
                rating: "5/5 paws",
              },
              {
                quote:
                  "Pia's comfort testing revealed critical UX issues we hadn't considered.",
                author: "Product Manager",
                rating: "10/10 would pet again",
              },
              {
                quote:
                  "The 'treat-driven development' methodology has revolutionized our workflow.",
                author: "Tech Lead",
                rating: "Certified Good Girl",
              },
              {
                quote:
                  "Her attention to detail is unmatched. Also, she's very soft.",
                author: "Designer",
                rating: "Royal Approval",
              },
            ].map((item, index) => (
              <motion.blockquote
                key={index}
                className="rounded-lg border border-border bg-card p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="mb-4 text-lg italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="text-sm text-muted-foreground">
                  <cite className="not-italic">{item.author}</cite>
                  <p className="mt-1 text-accent">{item.rating}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            Want to Meet Pia?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Schedule a consultation and experience the Pia Standard™ firsthand.
            Treats optional but appreciated.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Schedule a Meeting
            <span className="text-xl">🐾</span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
