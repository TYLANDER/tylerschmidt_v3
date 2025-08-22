"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DesignSystemLayout } from '@/components/designsystem/DesignSystemLayout'
import { ComponentShowcase } from '@/components/designsystem/ComponentShowcase'
import { componentCategories } from '@/components/designsystem/componentData'

export default function DesignSystemPage() {
  const [selectedCategory, setSelectedCategory] = useState('buttons')
  const [selectedComponent, setSelectedComponent] = useState('primary-button')

  const currentCategory = componentCategories.find(cat => cat.id === selectedCategory)
  const currentComponent = currentCategory?.components.find(comp => comp.id === selectedComponent)

  return (
    <DesignSystemLayout
      categories={componentCategories}
      selectedCategory={selectedCategory}
      selectedComponent={selectedComponent}
      onSelectCategory={setSelectedCategory}
      onSelectComponent={setSelectedComponent}
    >
      <div className="min-h-screen">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Design System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A comprehensive collection of components, patterns, and guidelines that define the visual language and interaction patterns of our digital products.
          </p>
        </motion.div>

        {/* Component Showcase */}
        {currentComponent && (
          <ComponentShowcase
            component={currentComponent}
            key={currentComponent.id}
          />
        )}
      </div>
    </DesignSystemLayout>
  )
}
