"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DesignSystemLayout } from '@/components/designsystem/DesignSystemLayout'
import { ComponentShowcase } from '@/components/designsystem/ComponentShowcase'
import { componentCategories } from '@/components/designsystem/componentData'

export default function DesignSystemPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedComponent, setSelectedComponent] = useState('')

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
        {/* Header - only show when no component is selected */}
        {!currentComponent && (
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
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Getting Started</h2>
              <p className="text-muted-foreground">
                Select a component from the sidebar to view its documentation, live preview, and code examples.
              </p>
            </div>
          </motion.div>
        )}

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
