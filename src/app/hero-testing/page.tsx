"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeroNeuralNetwork } from '@/components/sections/HeroNeuralNetwork'
import { HeroQuantum } from '@/components/sections/HeroQuantum'
import { HeroRealityLayers } from '@/components/sections/HeroRealityLayers'
import { HeroConsciousnessStream } from '@/components/sections/HeroConsciousnessStream'
import { HeroParticleTypography } from '@/components/sections/HeroParticleTypography'

const testConcepts = [
  {
    id: 'neural-network',
    name: 'Neural Network Visualizer',
    description: 'Your thoughts and skills visualized as a living neural network',
    component: HeroNeuralNetwork,
    status: 'ready'
  },
  {
    id: 'quantum',
    name: 'Quantum State Portfolio',
    description: 'Portfolio exists in multiple states simultaneously until observed',
    component: HeroQuantum,
    status: 'ready'
  },
  {
    id: 'reality-layers',
    name: 'The Reality Layers',
    description: 'Peel back layers of reality to reveal different dimensions',
    component: HeroRealityLayers,
    status: 'ready'
  },
  {
    id: 'consciousness',
    name: 'The Consciousness Stream',
    description: 'Hero that streams your actual development process',
    component: HeroConsciousnessStream,
    status: 'ready'
  },
  {
    id: 'particle-typography',
    name: 'Particle Typography Engine',
    description: 'Text made of thousands of autonomous particles',
    component: HeroParticleTypography,
    status: 'ready'
  }
]

export default function HeroTestingPage() {
  const [activeTest, setActiveTest] = useState<string | null>(null)
  
  const ActiveComponent = activeTest 
    ? testConcepts.find(c => c.id === activeTest)?.component 
    : null
  
  return (
    <div className="min-h-screen bg-background">
      {!activeTest ? (
        // Test selection screen
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hero Testing Lab</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Experimental hero concepts for Site of the Day consideration
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testConcepts.map((concept, index) => (
                <motion.button
                  key={concept.id}
                  onClick={() => setActiveTest(concept.id)}
                  className="text-left p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {concept.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      concept.status === 'ready' 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {concept.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {concept.description}
                  </p>
                </motion.button>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-6 bg-muted/30 rounded-lg"
            >
              <h2 className="text-lg font-semibold mb-2">Testing Instructions</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Click any concept to enter full-screen testing mode</li>
                <li>• Press ESC or use the back button to return to this menu</li>
                <li>• Each concept is optimized for desktop viewing</li>
                <li>• Performance may vary based on device capabilities</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        // Active test view
        <div className="relative">
          {ActiveComponent && <ActiveComponent />}
          
          {/* Back button */}
          <motion.button
            onClick={() => setActiveTest(null)}
            className="fixed top-6 left-6 z-50 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
          >
            ← Back to Tests
          </motion.button>
          
          {/* Test info */}
          <motion.div
            className="fixed top-6 right-6 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-semibold mb-1">
              {testConcepts.find(c => c.id === activeTest)?.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Press ESC to exit
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
