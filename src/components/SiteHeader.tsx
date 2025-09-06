"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MobileNav } from "./MobileNav"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-xl font-bold text-foreground transition-colors duration-300 hover:text-accent md:text-2xl"
          >
            Tyler Schmidt
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-8 md:flex">
              {[
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/lab", label: "Lab" },
                { href: "/pia", label: "Pia" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="h-0.5 w-6 bg-foreground transition-all duration-300"
                animate={{
                  rotate: mobileNavOpen ? 45 : 0,
                  y: mobileNavOpen ? 6 : 0,
                }}
              />
              <motion.span
                className="h-0.5 w-4 bg-foreground transition-all duration-300"
                animate={{
                  opacity: mobileNavOpen ? 0 : 1,
                  x: mobileNavOpen ? 20 : 0,
                }}
              />
              <motion.span
                className="h-0.5 w-6 bg-foreground transition-all duration-300"
                animate={{
                  rotate: mobileNavOpen ? -45 : 0,
                  y: mobileNavOpen ? -6 : 0,
                }}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </motion.header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
