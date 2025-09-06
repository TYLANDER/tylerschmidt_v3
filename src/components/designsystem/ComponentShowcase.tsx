"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Code, Eye } from "lucide-react"
import type { Component } from "./componentData"

interface ComponentShowcaseProps {
  component: Component
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedCodeType, setSelectedCodeType] = useState<
    "jsx" | "css" | "usage"
  >("jsx")

  const copyToClipboard = async (code: string, type: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getCodeContent = () => {
    switch (selectedCodeType) {
      case "jsx":
        return component.code.jsx
      case "css":
        return component.code.css || "/* No custom CSS required */"
      case "usage":
        return component.code.usage
      default:
        return component.code.jsx
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Component Header */}
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold">{component.name}</h2>
        <p className="text-lg text-muted-foreground">{component.description}</p>
      </div>

      {/* View Mode Toggle */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setViewMode("preview")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            viewMode === "preview"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-muted-foreground hover:text-foreground dark:bg-gray-900"
          } `}
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={() => setViewMode("code")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            viewMode === "code"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-muted-foreground hover:text-foreground dark:bg-gray-900"
          } `}
        >
          <Code size={16} />
          Code
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Preview Area */}
            <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-border bg-gray-50 p-8 dark:bg-gray-900/50 md:p-12">
              <div className="w-full max-w-4xl">{component.preview}</div>
            </div>

            {/* Variants */}
            {component.variants && component.variants.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-semibold">Variants</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {component.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-gray-50 p-6 dark:bg-gray-900/50"
                    >
                      <h4 className="mb-4 text-sm font-medium text-muted-foreground">
                        {variant.name}
                      </h4>
                      <div className="flex min-h-[100px] items-center justify-center">
                        {variant.preview}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Props Table */}
            {component.props && component.props.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-semibold">Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-sm font-medium">
                          Prop
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                          Default
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.props.map((prop, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="px-4 py-3 font-mono text-sm">
                            {prop.name}
                          </td>
                          <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                            {prop.type}
                          </td>
                          <td className="px-4 py-3 font-mono text-sm text-muted-foreground">
                            {prop.default || "—"}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Code Type Selector */}
            <div className="mb-4 flex items-center gap-2">
              <button
                onClick={() => setSelectedCodeType("jsx")}
                className={`rounded px-3 py-1 text-sm font-medium transition-all ${
                  selectedCodeType === "jsx"
                    ? "bg-gray-200 text-foreground dark:bg-gray-800"
                    : "text-muted-foreground hover:text-foreground"
                } `}
              >
                Component
              </button>
              <button
                onClick={() => setSelectedCodeType("usage")}
                className={`rounded px-3 py-1 text-sm font-medium transition-all ${
                  selectedCodeType === "usage"
                    ? "bg-gray-200 text-foreground dark:bg-gray-800"
                    : "text-muted-foreground hover:text-foreground"
                } `}
              >
                Usage
              </button>
              {component.code.css && (
                <button
                  onClick={() => setSelectedCodeType("css")}
                  className={`rounded px-3 py-1 text-sm font-medium transition-all ${
                    selectedCodeType === "css"
                      ? "bg-gray-200 text-foreground dark:bg-gray-800"
                      : "text-muted-foreground hover:text-foreground"
                  } `}
                >
                  Styles
                </button>
              )}
            </div>

            {/* Code Block */}
            <div className="group relative">
              <pre className="overflow-x-auto rounded-lg border border-border bg-gray-50 p-6 dark:bg-gray-900">
                <code className="font-mono text-sm">{getCodeContent()}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(getCodeContent(), selectedCodeType)
                }
                className="absolute right-4 top-4 rounded-lg border border-border bg-background p-2 opacity-0 transition-opacity group-hover:opacity-100"
              >
                {copiedCode === selectedCodeType ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
