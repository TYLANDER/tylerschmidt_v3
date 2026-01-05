"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HeroPrecisionPia } from "@/components/sections/HeroPrecisionPia"
import { HeroLivingAI } from "@/components/sections/HeroLivingAI"
import { HeroDimensional } from "@/components/sections/HeroDimensional"
import { HeroTemporalEcho } from "@/components/sections/HeroTemporalEcho"
import { HeroQuantum } from "@/components/sections/HeroQuantum"

const heroOptions = [
  {
    id: "current",
    name: "Current Hero (Precision)",
    description: "Your existing hero with parallax effects and grid breaking",
    component: HeroPrecisionPia,
  },
  {
    id: "living-ai",
    name: "Living Portfolio Generator",
    description:
      "AI builds personalized experience in real-time using visitor context",
    component: HeroLivingAI,
    innovation: "LangDiff-powered progressive UI generation",
  },
  {
    id: "dimensional",
    name: "Dimensional Typography",
    description:
      "Text that exists in multiple dimensions, revealing different messages",
    component: HeroDimensional,
    innovation: "WebGL impossible geometry with physics",
  },
  {
    id: "temporal",
    name: "Temporal Echo System",
    description: "See ghosts of previous visitors, leave your own trail",
    component: HeroTemporalEcho,
    innovation: "Collective behavior visualization",
  },
  {
    id: "quantum",
    name: "Quantum State Portfolio",
    description: "Portfolio exists in superposition until observed",
    component: HeroQuantum,
    innovation: "Quantum physics visualization with observer effect",
  },
]

export default function HeroLabPage() {
  const [selectedHero, setSelectedHero] = useState("current")
  const [showInfo, setShowInfo] = useState(true)

  const currentHero = heroOptions.find((h) => h.id === selectedHero)
  const HeroComponent = currentHero?.component

  return (
    <div className="min-h-screen bg-background">
      {/* Hero display */}
      <div className="relative">
        {HeroComponent && <HeroComponent />}

        {/* Control panel */}
        <motion.div
          className={`fixed right-4 top-20 z-50 max-w-sm rounded-lg border border-border bg-card/95 p-6 backdrop-blur-sm ${
            showInfo ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: showInfo ? 0 : "calc(100% + 1rem)" }}
          transition={{ type: "spring", damping: 20 }}
        >
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="absolute -left-10 top-6 rounded-l-lg border border-border bg-card px-2 py-4 text-sm"
          >
            {showInfo ? "→" : "←"}
          </button>

          <h2 className="mb-4 text-lg font-semibold">Hero Lab</h2>

          <div className="mb-6 space-y-2">
            {heroOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedHero(option.id)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedHero === option.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                <div className="font-medium">{option.name}</div>
                <div className="mt-1 text-xs opacity-80">
                  {option.description}
                </div>
              </button>
            ))}
          </div>

          {currentHero && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {currentHero.description}
                </p>
              </div>

              {currentHero.innovation && (
                <div>
                  <h3 className="mb-2 font-medium">Innovation</h3>
                  <p className="text-sm text-accent">
                    {currentHero.innovation}
                  </p>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  These concepts demonstrate cutting-edge web experiences that
                  create that &quot;how did he do that&quot; moment for Site of
                  the Day consideration.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
