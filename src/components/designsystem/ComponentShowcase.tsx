"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Code, Eye } from 'lucide-react'
import type { Component } from './componentData'

interface ComponentShowcaseProps {
  component: Component
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedCodeType, setSelectedCodeType] = useState<'jsx' | 'css' | 'usage'>('jsx')

  const copyToClipboard = async (code: string, type: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getCodeContent = () => {
    switch (selectedCodeType) {
      case 'jsx':
        return component.code.jsx
      case 'css':
        return component.code.css || '/* No custom CSS required */'
      case 'usage':
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
        <h2 className="text-3xl font-bold mb-2">{component.name}</h2>
        <p className="text-lg text-muted-foreground">{component.description}</p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setViewMode('preview')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${viewMode === 'preview' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
              : 'bg-gray-100 dark:bg-gray-900 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={() => setViewMode('code')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
            ${viewMode === 'code' 
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
              : 'bg-gray-100 dark:bg-gray-900 text-muted-foreground hover:text-foreground'
            }
          `}
        >
          <Code size={16} />
          Code
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'preview' ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Preview Area */}
            <div className="border border-border rounded-xl p-8 md:p-12 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center">
              <div className="w-full max-w-4xl">
                {component.preview}
              </div>
            </div>

            {/* Variants */}
            {component.variants && component.variants.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6">Variants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {component.variants.map((variant, index) => (
                    <div key={index} className="border border-border rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50">
                      <h4 className="text-sm font-medium text-muted-foreground mb-4">{variant.name}</h4>
                      <div className="flex items-center justify-center min-h-[100px]">
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
                <h3 className="text-xl font-semibold mb-6">Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium">Prop</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Default</th>
                        <th className="text-left py-3 px-4 text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.props.map((prop, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-3 px-4 text-sm font-mono">{prop.name}</td>
                          <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{prop.type}</td>
                          <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{prop.default || '—'}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{prop.description}</td>
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
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedCodeType('jsx')}
                className={`
                  px-3 py-1 rounded text-sm font-medium transition-all
                  ${selectedCodeType === 'jsx' 
                    ? 'bg-gray-200 dark:bg-gray-800 text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                Component
              </button>
              <button
                onClick={() => setSelectedCodeType('usage')}
                className={`
                  px-3 py-1 rounded text-sm font-medium transition-all
                  ${selectedCodeType === 'usage' 
                    ? 'bg-gray-200 dark:bg-gray-800 text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                Usage
              </button>
              {component.code.css && (
                <button
                  onClick={() => setSelectedCodeType('css')}
                  className={`
                    px-3 py-1 rounded text-sm font-medium transition-all
                    ${selectedCodeType === 'css' 
                      ? 'bg-gray-200 dark:bg-gray-800 text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  Styles
                </button>
              )}
            </div>

            {/* Code Block */}
            <div className="relative group">
              <pre className="border border-border rounded-lg p-6 bg-gray-50 dark:bg-gray-900 overflow-x-auto">
                <code className="text-sm font-mono">{getCodeContent()}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(getCodeContent(), selectedCodeType)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
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
