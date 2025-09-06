"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/Container"
import Link from "next/link"

interface GeneratedComponent {
  code: string
  element: React.ReactNode
  timestamp: Date
}

export default function CodeVisualPage() {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedComponents, setGeneratedComponents] = useState<
    GeneratedComponent[]
  >([])
  const [currentCode, setCurrentCode] = useState("")

  // Simulate progressive code generation
  const generateComponent = async (prompt: string) => {
    setIsGenerating(true)
    setCurrentCode("")

    // Parse the design request
    const componentType = prompt.toLowerCase().includes("button")
      ? "button"
      : prompt.toLowerCase().includes("card")
        ? "card"
        : prompt.toLowerCase().includes("form")
          ? "form"
          : prompt.toLowerCase().includes("nav")
            ? "nav"
            : "div"

    const style = prompt.toLowerCase().includes("brutalist")
      ? "brutalist"
      : prompt.toLowerCase().includes("minimal")
        ? "minimal"
        : prompt.toLowerCase().includes("glassmorphism")
          ? "glass"
          : prompt.toLowerCase().includes("neon")
            ? "neon"
            : "default"

    // Generate code progressively
    let code = ""
    const codeLines = generateCodeForComponent(componentType, style, prompt)

    for (const line of codeLines) {
      for (const char of line) {
        code += char
        setCurrentCode(code)
        await new Promise((resolve) => setTimeout(resolve, 10))
      }
      code += "\n"
      setCurrentCode(code)
    }

    // Generate the actual component
    const component = createComponentFromCode(componentType, style, prompt)

    setGeneratedComponents((prev) =>
      [
        {
          code,
          element: component,
          timestamp: new Date(),
        },
        ...prev,
      ].slice(0, 5)
    )

    setIsGenerating(false)
  }

  const generateCodeForComponent = (
    type: string,
    style: string,
    prompt: string
  ): string[] => {
    const styles = {
      brutalist: {
        button:
          "bg-black text-white border-4 border-white hover:bg-white hover:text-black px-8 py-4 font-bold uppercase tracking-wider transition-colors",
        card: "bg-black text-white border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
        form: "bg-black text-white border-4 border-white p-8 space-y-4",
        nav: "bg-black text-white border-b-4 border-white p-4 flex justify-between items-center",
      },
      minimal: {
        button:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors",
        card: "bg-white border border-gray-200 rounded-lg p-6 shadow-sm",
        form: "bg-white border border-gray-200 rounded-lg p-6 space-y-4",
        nav: "bg-white border-b border-gray-200 p-4 flex justify-between items-center",
      },
      glass: {
        button:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-6 py-3 rounded-xl transition-all",
        card: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6",
        form: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4",
        nav: "bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex justify-between items-center",
      },
      neon: {
        button:
          "bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-lg font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all",
        card: "bg-black/90 text-cyan-400 border-2 border-cyan-400 rounded-lg p-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        form: "bg-black/90 text-cyan-400 border-2 border-cyan-400 rounded-lg p-6 space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        nav: "bg-black/90 text-cyan-400 border-b-2 border-cyan-400 p-4 flex justify-between items-center",
      },
      default: {
        button:
          "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors",
        card: "bg-card border border-border rounded-lg p-6",
        form: "bg-card border border-border rounded-lg p-6 space-y-4",
        nav: "bg-background border-b border-border p-4 flex justify-between items-center",
      },
    }

    const className =
      styles[style as keyof typeof styles]?.[
        type as keyof typeof styles.brutalist
      ] || styles.default.button

    const templates = {
      button: [
        `function ${style.charAt(0).toUpperCase() + style.slice(1)}Button() {`,
        `  return (`,
        `    <button`,
        `      className="${className}"`,
        `      onClick={() => console.log('Clicked!')}>`,
        `      ${prompt}`,
        `    </button>`,
        `  )`,
        `}`,
      ],
      card: [
        `function ${style.charAt(0).toUpperCase() + style.slice(1)}Card() {`,
        `  return (`,
        `    <div className="${className}">`,
        `      <h3 className="text-2xl font-bold mb-4">`,
        `        ${prompt}`,
        `      </h3>`,
        `      <p className="opacity-80">`,
        `        This is a ${style} card component.`,
        `      </p>`,
        `    </div>`,
        `  )`,
        `}`,
      ],
      form: [
        `function ${style.charAt(0).toUpperCase() + style.slice(1)}Form() {`,
        `  return (`,
        `    <form className="${className}">`,
        `      <h3 className="text-2xl font-bold mb-4">${prompt}</h3>`,
        `      <input`,
        `        type="text"`,
        `        placeholder="Enter text..."`,
        `        className="w-full px-4 py-2 bg-white/10 border rounded"`,
        `      />`,
        `      <button type="submit" className="px-6 py-2 bg-primary rounded">`,
        `        Submit`,
        `      </button>`,
        `    </form>`,
        `  )`,
        `}`,
      ],
      nav: [
        `function ${style.charAt(0).toUpperCase() + style.slice(1)}Nav() {`,
        `  return (`,
        `    <nav className="${className}">`,
        `      <div className="text-xl font-bold">${prompt}</div>`,
        `      <div className="flex gap-4">`,
        `        <a href="#" className="hover:opacity-80">Home</a>`,
        `        <a href="#" className="hover:opacity-80">About</a>`,
        `        <a href="#" className="hover:opacity-80">Contact</a>`,
        `      </div>`,
        `    </nav>`,
        `  )`,
        `}`,
      ],
    }

    return templates[type as keyof typeof templates] || templates.button
  }

  const createComponentFromCode = (
    type: string,
    style: string,
    prompt: string
  ) => {
    const styles = {
      brutalist: {
        button:
          "bg-black text-white border-4 border-white hover:bg-white hover:text-black px-8 py-4 font-bold uppercase tracking-wider transition-colors",
        card: "bg-black text-white border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
        form: "bg-black text-white border-4 border-white p-8 space-y-4",
        nav: "bg-black text-white border-b-4 border-white p-4 flex justify-between items-center",
      },
      minimal: {
        button:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 px-6 py-2 rounded-lg font-medium transition-colors",
        card: "bg-white border border-gray-200 rounded-lg p-6 shadow-sm",
        form: "bg-white border border-gray-200 rounded-lg p-6 space-y-4",
        nav: "bg-white border-b border-gray-200 p-4 flex justify-between items-center",
      },
      glass: {
        button:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-6 py-3 rounded-xl transition-all",
        card: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6",
        form: "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-4",
        nav: "bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex justify-between items-center",
      },
      neon: {
        button:
          "bg-black text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black px-6 py-3 rounded-lg font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all",
        card: "bg-black/90 text-cyan-400 border-2 border-cyan-400 rounded-lg p-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        form: "bg-black/90 text-cyan-400 border-2 border-cyan-400 rounded-lg p-6 space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]",
        nav: "bg-black/90 text-cyan-400 border-b-2 border-cyan-400 p-4 flex justify-between items-center",
      },
      default: {
        button:
          "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors",
        card: "bg-card border border-border rounded-lg p-6",
        form: "bg-card border border-border rounded-lg p-6 space-y-4",
        nav: "bg-background border-b border-border p-4 flex justify-between items-center",
      },
    }

    const className =
      styles[style as keyof typeof styles]?.[
        type as keyof typeof styles.brutalist
      ] || styles.default.button

    switch (type) {
      case "button":
        return (
          <button
            className={className}
            onClick={() => alert("Generated button clicked!")}
          >
            {prompt}
          </button>
        )
      case "card":
        return (
          <div className={className}>
            <h3 className="mb-4 text-2xl font-bold">{prompt}</h3>
            <p className="opacity-80">
              This is a {style} card component generated from your description.
            </p>
          </div>
        )
      case "form":
        return (
          <form
            className={className}
            onSubmit={(e) => {
              e.preventDefault()
              alert("Form submitted!")
            }}
          >
            <h3 className="mb-4 text-2xl font-bold">{prompt}</h3>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full rounded border border-current bg-white/10 px-4 py-2"
            />
            <button
              type="submit"
              className="rounded bg-primary px-6 py-2 text-primary-foreground"
            >
              Submit
            </button>
          </form>
        )
      case "nav":
        return (
          <nav className={className}>
            <div className="text-xl font-bold">{prompt}</div>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">
                Home
              </a>
              <a href="#" className="hover:opacity-80">
                About
              </a>
              <a href="#" className="hover:opacity-80">
                Contact
              </a>
            </div>
          </nav>
        )
      default:
        return <div className={className}>{prompt}</div>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-20">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              Code-to-Visual Transformer
            </h1>
            <p className="text-xl text-muted-foreground">
              Type design concepts in plain English, watch them materialize into
              code and components
            </p>
          </motion.div>

          {/* Input section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  generateComponent(input)
                }}
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Try: 'Show me a brutalist button' or 'Create a glassmorphism card'"
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-primary focus:outline-none"
                    disabled={isGenerating}
                  />
                  <button
                    type="submit"
                    disabled={!input || isGenerating}
                    className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </button>
                </div>
              </form>

              {/* Quick examples */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Try:</span>
                {[
                  "brutalist button",
                  "glassmorphism card",
                  "minimal form",
                  "neon navigation",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setInput(`Create a ${example}`)}
                    className="rounded-full bg-muted px-3 py-1 text-sm transition-colors hover:bg-muted/80"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Live code generation */}
          {(isGenerating || currentCode) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-12"
            >
              <div className="overflow-x-auto rounded-lg bg-black p-6 font-mono text-sm text-green-400">
                <pre>
                  {currentCode}
                  {isGenerating && (
                    <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />
                  )}
                </pre>
              </div>
            </motion.div>
          )}

          {/* Generated components */}
          <AnimatePresence>
            {generatedComponents.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold">Generated Components</h2>

                {generatedComponents.map((component, index) => (
                  <motion.div
                    key={`${component.timestamp.getTime()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg border border-border bg-card p-6"
                  >
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Code */}
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                          Code
                        </h3>
                        <div className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">
                          <pre>{component.code}</pre>
                        </div>
                      </div>

                      {/* Preview */}
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                          Preview
                        </h3>
                        <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-background p-4">
                          {component.element}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-muted-foreground">
                      Generated at {component.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-4"
      >
        <Link
          href="/living-portfolio"
          className="rounded-lg border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          ← Previous: Living Portfolio
        </Link>
        <Link
          href="/conversation-canvas"
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Next: Conversation Canvas →
        </Link>
      </motion.div>
    </div>
  )
}
