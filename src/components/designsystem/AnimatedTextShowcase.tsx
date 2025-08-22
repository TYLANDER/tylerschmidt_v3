"use client"

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { AnimatedText } from '@/components/animations/animated-text'

interface AnimationExample {
  variant: "fade" | "slide" | "typewriter" | "reveal" | "decrypt"
  text: string
  description: string
}

const animations: AnimationExample[] = [
  {
    variant: "slide",
    text: "Slide Animation",
    description: "Text slides in from below with a smooth easing curve"
  },
  {
    variant: "fade",
    text: "Fade Animation",
    description: "Text fades in with opacity transition"
  },
  {
    variant: "typewriter",
    text: "Typewriter Effect",
    description: "Text appears character by character like typing"
  },
  {
    variant: "reveal",
    text: "Reveal Animation",
    description: "Text reveals from behind a mask"
  },
  {
    variant: "decrypt",
    text: "Decrypt Effect",
    description: "Text decrypts from random characters"
  }
]

export function AnimatedTextShowcase() {
  const [keys, setKeys] = useState<Record<string, number>>(
    animations.reduce((acc, anim) => ({ ...acc, [anim.variant]: 0 }), {})
  )

  const replay = (variant: string) => {
    setKeys(prev => ({ ...prev, [variant]: prev[variant] + 1 }))
  }

  return (
    <div className="space-y-8">
      {animations.map((animation) => (
        <div key={animation.variant} className="border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold capitalize">{animation.variant}</h4>
              <p className="text-sm text-muted-foreground mt-1">{animation.description}</p>
            </div>
            <button
              onClick={() => replay(animation.variant)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Replay animation"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <div className="min-h-[60px] flex items-center">
            <AnimatedText
              key={keys[animation.variant]}
              text={animation.text}
              variant={animation.variant}
              className="text-2xl font-medium"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
