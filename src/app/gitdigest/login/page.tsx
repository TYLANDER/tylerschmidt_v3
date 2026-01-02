"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/gitdigest"

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/gitdigest/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(redirect)
        router.refresh()
      } else {
        setError(data.error || "Invalid password")
        setPassword("")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Glass card */}
        <div className="glass shadow-smooth rounded-2xl p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10"
            >
              <Lock className="h-8 w-8 text-accent" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">GitDigest</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter password to access your dev reports
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-lg border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground",
                    "transition-all duration-200",
                    "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                    error &&
                      "border-destructive focus:border-destructive focus:ring-destructive/20"
                  )}
                  autoFocus
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground",
                "transition-all duration-200",
                "hover:opacity-90",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access GitDigest</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your GitHub activity, summarized for humans.
        </p>
      </motion.div>
    </div>
  )
}

function LoginSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass shadow-smooth rounded-2xl p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-muted" />
            <div className="mx-auto h-6 w-32 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-6">
            <div className="h-12 animate-pulse rounded-lg bg-muted" />
            <div className="h-12 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GitDigestLoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}
