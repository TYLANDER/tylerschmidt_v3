"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/Container"

interface StreamingContent {
  greeting: string
  subtitle: string
  insights: string[]
  suggestedProjects: Array<{
    title: string
    reason: string
    relevance: number
  }>
  theme: {
    mood: string
    accent: string
  }
}

export function HeroLivingAI() {
  const [content, setContent] = useState<StreamingContent>({
    greeting: "",
    subtitle: "",
    insights: [],
    suggestedProjects: [],
    theme: { mood: "neutral", accent: "blue" },
  })

  const [isStreaming, setIsStreaming] = useState(false)
  const [currentSection, setCurrentSection] = useState<
    "greeting" | "analysis" | "suggestions"
  >("greeting")
  const [visitorContext, setVisitorContext] = useState({
    time: new Date().getHours(),
    device: "",
    location: "",
    behavior: { scrollSpeed: 0, hoverCount: 0, timeOnPage: 0 },
  })

  const streamingRef = useRef<boolean>(false)

  // Simulate LangDiff-style progressive streaming
  const simulateStreaming = async (
    text: string,
    callback: (chunk: string) => void
  ) => {
    const words = text.split(" ")
    for (const word of words) {
      if (!streamingRef.current) break

      // Stream character by character for that typewriter effect
      for (const char of word + " ") {
        if (!streamingRef.current) break
        callback(char)
        await new Promise((resolve) =>
          setTimeout(resolve, 30 + Math.random() * 20)
        )
      }
    }
  }

  // Detect visitor context
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      if (width < 768) return "mobile"
      if (width < 1024) return "tablet"
      return "desktop"
    }

    setVisitorContext((prev) => ({
      ...prev,
      device: detectDevice(),
      location: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }))

    // Track behavior
    let scrollCount = 0
    let hoverCount = 0
    const startTime = Date.now()

    const handleScroll = () => {
      scrollCount++
    }
    const handleHover = () => {
      hoverCount++
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mouseover", handleHover)

    const interval = setInterval(() => {
      setVisitorContext((prev) => ({
        ...prev,
        behavior: {
          scrollSpeed: scrollCount,
          hoverCount: hoverCount,
          timeOnPage: Math.floor((Date.now() - startTime) / 1000),
        },
      }))
    }, 1000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseover", handleHover)
      clearInterval(interval)
    }
  }, [])

  // Start the AI experience
  useEffect(() => {
    const startExperience = async () => {
      if (streamingRef.current) return
      streamingRef.current = true
      setIsStreaming(true)

      // Greeting based on time
      const hour = visitorContext.time
      let greeting = ""
      if (hour < 12) greeting = "Good morning"
      else if (hour < 17) greeting = "Good afternoon"
      else greeting = "Good evening"

      // Stream the personalized greeting
      await simulateStreaming(
        `${greeting}. I'm Tyler Schmidt, and I'm building your experience in real-time.`,
        (chunk) =>
          setContent((prev) => ({ ...prev, greeting: prev.greeting + chunk }))
      )

      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentSection("analysis")

      // Stream the analysis
      await simulateStreaming(
        `Analyzing your context... ${visitorContext.device} user, visiting from ${visitorContext.location || "somewhere interesting"}.`,
        (chunk) =>
          setContent((prev) => ({ ...prev, subtitle: prev.subtitle + chunk }))
      )

      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add insights progressively
      const insights = [
        `You've been here for ${visitorContext.behavior.timeOnPage} seconds`,
        `Your interaction style suggests you appreciate ${visitorContext.behavior.hoverCount > 5 ? "detailed exploration" : "efficient navigation"}`,
        `Based on your device, I'll optimize for ${visitorContext.device === "mobile" ? "touch interactions" : "precision control"}`,
      ]

      for (const insight of insights) {
        let currentInsight = ""
        await simulateStreaming(insight, (chunk) => {
          currentInsight += chunk
          setContent((prev) => ({
            ...prev,
            insights: [...prev.insights.slice(0, -1), currentInsight].filter(
              Boolean
            ),
          }))
        })
        setContent((prev) => ({
          ...prev,
          insights: [...prev.insights, ""],
        }))
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      setCurrentSection("suggestions")

      // Suggest projects based on context
      const projectSuggestions = [
        {
          title: "Enterprise Design System",
          reason:
            visitorContext.device === "desktop"
              ? "Perfect for your large screen"
              : "Responsive at every size",
          relevance: 95,
        },
        {
          title: "Mobile-First Banking App",
          reason:
            hour > 17
              ? "Evening visitors often seek fintech work"
              : "Start your day with innovation",
          relevance: 88,
        },
        {
          title: "Real-time Collaboration Tool",
          reason: "Matches your interest in interactive experiences",
          relevance: 92,
        },
      ]

      for (const project of projectSuggestions) {
        setContent((prev) => ({
          ...prev,
          suggestedProjects: [...prev.suggestedProjects, project],
        }))
        await new Promise((resolve) => setTimeout(resolve, 600))
      }

      streamingRef.current = false
      setIsStreaming(false)
    }

    // Start after a brief delay
    const timer = setTimeout(startExperience, 1000)
    return () => {
      clearTimeout(timer)
      streamingRef.current = false
    }
  }, [
    visitorContext.time,
    visitorContext.device,
    visitorContext.location,
    visitorContext.behavior,
  ])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Dynamic background that responds to streaming */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          animate={{
            opacity: isStreaming ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Streaming indicators */}
        <svg className="absolute inset-0 h-full w-full">
          <motion.circle
            cx="50%"
            cy="50%"
            r="300"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary/10"
            animate={{
              r: isStreaming ? [300, 350, 300] : 300,
              opacity: isStreaming ? [0.1, 0.2, 0.1] : 0.05,
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Streaming greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
              <AnimatePresence mode="wait">
                {content.greeting.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </AnimatePresence>
              {isStreaming && currentSection === "greeting" && (
                <motion.span
                  className="ml-1 inline-block h-12 w-1 bg-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </h1>
          </motion.div>

          {/* Streaming subtitle */}
          {content.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 text-xl text-muted-foreground md:text-2xl"
            >
              {content.subtitle}
              {isStreaming && currentSection === "analysis" && (
                <motion.span
                  className="ml-1 inline-block h-6 w-0.5 bg-muted-foreground"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.p>
          )}

          {/* Insights */}
          {content.insights.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 space-y-2"
            >
              {content.insights
                .filter((i) => i.length > 0)
                .map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-primary">→</span>
                    <span className="text-muted-foreground">{insight}</span>
                  </motion.div>
                ))}
            </motion.div>
          )}

          {/* Project suggestions */}
          {content.suggestedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12"
            >
              <h2 className="mb-6 text-2xl font-semibold">Curated for you:</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {content.suggestedProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="group relative cursor-pointer rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
                    whileHover={{ y: -4 }}
                  >
                    <div className="absolute -right-3 -top-3 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                      {project.relevance}% match
                    </div>
                    <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.reason}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading state */}
          {isStreaming && (
            <motion.div
              className="fixed bottom-8 right-8 rounded-lg border border-border bg-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  AI is crafting your experience...
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
