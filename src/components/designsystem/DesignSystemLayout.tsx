"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronRight, Menu, X } from "lucide-react"
import type { ComponentCategory } from "./componentData"

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
        className="fixed left-4 top-4 z-50 rounded-lg border border-border bg-background p-2 md:hidden"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 z-40 h-full w-80 transform border-r border-border bg-background transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        initial={false}
      >
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold">Components</h2>
        </div>

        <nav className="h-[calc(100vh-80px)] overflow-y-auto p-6">
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {category.name}
              </h3>
              <ul className="space-y-1">
                {category.components.map((component) => {
                  const isActive =
                    selectedCategory === category.id &&
                    selectedComponent === component.id

                  return (
                    <li key={component.id}>
                      <button
                        onClick={() => {
                          onSelectCategory(category.id)
                          onSelectComponent(component.id)
                          setSidebarOpen(false)
                        }}
                        className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all ${
                          isActive
                            ? "bg-gray-100 font-medium text-foreground dark:bg-gray-900"
                            : "text-muted-foreground hover:bg-gray-50 hover:text-foreground dark:hover:bg-gray-900"
                        } `}
                      >
                        <span>{component.name}</span>
                        <ChevronRight
                          size={14}
                          className={`opacity-0 transition-all group-hover:opacity-100 ${isActive ? "opacity-100" : ""} `}
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
      <main className="min-h-screen md:ml-80">
        <div className="max-w-6xl px-6 py-12 md:px-12 md:py-16">{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
