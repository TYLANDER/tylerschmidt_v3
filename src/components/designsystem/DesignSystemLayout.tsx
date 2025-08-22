"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'
import type { ComponentCategory } from './componentData'

interface DesignSystemLayoutProps {
  children: React.ReactNode
  categories: ComponentCategory[]
  selectedCategory: string
  selectedComponent: string
  onSelectCategory: (categoryId: string) => void
  onSelectComponent: (componentId: string) => void
}

export function DesignSystemLayout({
  children,
  categories,
  selectedCategory,
  selectedComponent,
  onSelectCategory,
  onSelectComponent,
}: DesignSystemLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-background border border-border"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-background border-r border-border
          transform transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        initial={false}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Design System</h2>
        </div>

        <nav className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <ul className="space-y-1">
                {category.components.map((component) => {
                  const isActive = selectedCategory === category.id && selectedComponent === component.id
                  
                  return (
                    <li key={component.id}>
                      <button
                        onClick={() => {
                          onSelectCategory(category.id)
                          onSelectComponent(component.id)
                          setSidebarOpen(false)
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                          flex items-center justify-between group
                          ${isActive 
                            ? 'bg-gray-100 dark:bg-gray-900 text-foreground font-medium' 
                            : 'text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-foreground'
                          }
                        `}
                      >
                        <span>{component.name}</span>
                        <ChevronRight 
                          size={14} 
                          className={`
                            transition-all opacity-0 group-hover:opacity-100
                            ${isActive ? 'opacity-100' : ''}
                          `}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className="md:ml-80 min-h-screen">
        <div className="px-6 md:px-12 py-12 md:py-16 max-w-6xl">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
