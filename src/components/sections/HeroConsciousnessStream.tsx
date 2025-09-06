"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/Container"

interface CommitEvent {
  id: string
  timestamp: Date
  type: "commit" | "design" | "thought" | "debug"
  message: string
  files?: string[]
  diff?: { additions: number; deletions: number }
  branch?: string
}

// Simulated development stream
const generateDevelopmentStream = (): CommitEvent[] => {
  const events: CommitEvent[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 3600000),
      type: "thought",
      message: "Exploring quantum state visualization concepts...",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 3500000),
      type: "design",
      message: "Sketching superposition UI states",
      files: ["quantum-hero-wireframe.fig"],
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 3400000),
      type: "commit",
      message: "feat: initial quantum hero component setup",
      files: ["src/components/HeroQuantum.tsx"],
      diff: { additions: 145, deletions: 0 },
      branch: "feature/quantum-hero",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 3300000),
      type: "debug",
      message:
        "Fixed: State probability calculations not normalizing correctly",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 3200000),
      type: "commit",
      message: "refactor: optimize quantum state transitions",
      files: ["src/components/HeroQuantum.tsx", "src/utils/quantum.ts"],
      diff: { additions: 67, deletions: 23 },
      branch: "feature/quantum-hero",
    },
    {
      id: "6",
      timestamp: new Date(Date.now() - 3100000),
      type: "thought",
      message: "What if cursor distance affects quantum probability?",
    },
    {
      id: "7",
      timestamp: new Date(Date.now() - 3000000),
      type: "commit",
      message: "feat: add observer effect based on mouse position",
      files: ["src/components/HeroQuantum.tsx"],
      diff: { additions: 34, deletions: 12 },
      branch: "feature/quantum-hero",
    },
  ]

  return events
}

function StreamEvent({ event, index }: { event: CommitEvent; index: number }) {
  const getEventIcon = () => {
    switch (event.type) {
      case "commit":
        return "💾"
      case "design":
        return "🎨"
      case "thought":
        return "💭"
      case "debug":
        return "🐛"
      default:
        return "📝"
    }
  }

  const getEventColor = () => {
    switch (event.type) {
      case "commit":
        return "text-green-500"
      case "design":
        return "text-purple-500"
      case "thought":
        return "text-blue-500"
      case "debug":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group flex gap-4"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={`h-10 w-10 rounded-full ${getEventColor()} bg-current/10 flex items-center justify-center text-lg`}
        >
          {getEventIcon()}
        </div>
        <div className="h-full w-0.5 bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="rounded-lg border border-border bg-card p-4 transition-colors group-hover:border-primary/50">
          <div className="mb-2 flex items-start justify-between">
            <span className={`font-mono text-xs ${getEventColor()}`}>
              {event.type.toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground">
              {event.timestamp.toLocaleTimeString()}
            </span>
          </div>

          <p className="mb-2 text-sm">{event.message}</p>

          {event.files && (
            <div className="mb-2 flex flex-wrap gap-2">
              {event.files.map((file) => (
                <span
                  key={file}
                  className="rounded bg-muted px-2 py-1 font-mono text-xs"
                >
                  {file}
                </span>
              ))}
            </div>
          )}

          {event.diff && (
            <div className="flex gap-4 font-mono text-xs">
              <span className="text-green-500">+{event.diff.additions}</span>
              <span className="text-red-500">-{event.diff.deletions}</span>
            </div>
          )}

          {event.branch && (
            <span className="font-mono text-xs text-muted-foreground">
              on {event.branch}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function HeroConsciousnessStream() {
  const [events, setEvents] = useState<CommitEvent[]>([])
  const [isLive, setIsLive] = useState(true)
  const [currentThought, setCurrentThought] = useState("")
  const [showTimeMachine, setShowTimeMachine] = useState(false)

  // Initialize with historical events
  useEffect(() => {
    setEvents(generateDevelopmentStream())
  }, [])

  // Simulate live events
  useEffect(() => {
    if (!isLive) return

    const thoughts = [
      "Optimizing render performance...",
      "Considering accessibility improvements",
      "Exploring new animation possibilities",
      "Refactoring component structure",
      "Testing cross-browser compatibility",
      "Implementing responsive design patterns",
    ]

    const interval = setInterval(() => {
      const newEvent: CommitEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: Math.random() > 0.7 ? "thought" : "commit",
        message: thoughts[Math.floor(Math.random() * thoughts.length)],
        ...(Math.random() > 0.5 && {
          files: [
            `src/components/Hero${Math.random().toString(36).substring(7)}.tsx`,
          ],
          diff: {
            additions: Math.floor(Math.random() * 100),
            deletions: Math.floor(Math.random() * 50),
          },
        }),
      }

      setEvents((prev) => [newEvent, ...prev].slice(0, 20))
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  // Typing animation for current thought
  useEffect(() => {
    const thoughtTexts = [
      "How can I make this more intuitive?",
      "What if we tried a different approach?",
      "This needs better performance optimization",
      "The user experience could be smoother here",
    ]

    let currentText = ""
    let textIndex = 0
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex < thoughtTexts[textIndex].length) {
        currentText += thoughtTexts[textIndex][charIndex]
        setCurrentThought(currentText)
        charIndex++
      } else {
        setTimeout(() => {
          currentText = ""
          setCurrentThought("")
          textIndex = (textIndex + 1) % thoughtTexts.length
          charIndex = 0
        }, 2000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <section className="min-h-screen overflow-hidden bg-background">
      <Container className="py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              Tyler Schmidt
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Consciousness Stream • Live Development Process
            </p>

            {/* Current thought */}
            <motion.div
              className="mb-8 inline-block rounded-lg border border-border bg-card px-6 py-3"
              animate={{ opacity: currentThought ? 1 : 0.5 }}
            >
              <span className="font-mono text-sm text-muted-foreground">
                Current thought: {currentThought}
                <motion.span
                  className="ml-1 inline-block h-4 w-0.5 bg-primary"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </motion.div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                  isLive ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {isLive ? "● LIVE" : "○ PAUSED"}
              </button>

              <button
                onClick={() => setShowTimeMachine(!showTimeMachine)}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Time Machine
              </button>
            </div>
          </motion.div>

          {/* Time machine */}
          <AnimatePresence>
            {showTimeMachine && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 rounded-lg border border-border bg-card p-6"
              >
                <h3 className="mb-4 font-semibold">Development Timeline</h3>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="24"
                  defaultValue="0"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>24 hours ago</span>
                  <span>12 hours ago</span>
                  <span>Now</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event stream */}
          <div className="relative">
            {/* Live indicator */}
            {isLive && (
              <motion.div
                className="absolute -left-16 top-0"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="h-2 w-2 rounded-full bg-red-500" />
              </motion.div>
            )}

            {/* Events */}
            <AnimatePresence mode="popLayout">
              {events.map((event, index) => (
                <StreamEvent key={event.id} event={event} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              {
                label: "Commits Today",
                value: events.filter((e) => e.type === "commit").length,
              },
              {
                label: "Thoughts",
                value: events.filter((e) => e.type === "thought").length,
              },
              {
                label: "Files Changed",
                value: new Set(events.flatMap((e) => e.files || [])).size,
              },
              { label: "Active Time", value: "4.5 hrs" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-card p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
