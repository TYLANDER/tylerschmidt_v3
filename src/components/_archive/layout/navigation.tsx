"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/use-scroll"

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
]

interface NavigationProps {
  className?: string
}

export function Navigation({}: NavigationProps) {
  const pathname = usePathname()
  const { position, direction } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (position.y > 100) {
      if (direction.y === "down") {
        setIsVisible(false)
      } else if (direction.y === "up") {
        setIsVisible(true)
      }
    } else {
      setIsVisible(true)
    }
  }, [position.y, direction.y])

  const menuButtonVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const menuContentVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  }

  return (
    <>
      {/* Menu Button - Fixed Top Right */}
      <motion.div
        variants={menuButtonVariants}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="chrome-button kinetic-hover flex items-center gap-3 rounded-full px-4 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <span className="text-background text-sm font-medium">MENU</span>
          <div className="relative flex h-5 w-5 flex-col items-center justify-center">
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -3,
              }}
              transition={{ duration: 0.2 }}
              className="bg-foreground absolute h-0.5 w-5"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="bg-foreground absolute h-0.5 w-5"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 3,
              }}
              transition={{ duration: 0.2 }}
              className="bg-foreground absolute h-0.5 w-5"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Background Overlay */}
            <motion.div
              className="bg-background/98 absolute inset-0 backdrop-blur-xl"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Secondary Pattern Layer */}
            <motion.div className="dazzle-pattern corruption-grid pointer-events-none absolute inset-0 opacity-30" />

            {/* Menu Content */}
            <motion.div
              variants={menuContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex h-full flex-col justify-center px-6 md:px-12"
            >
              <div className="mx-auto w-full max-w-6xl">
                {/* Navigation Links */}
                <nav className="space-y-2 md:space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "glitch-hover disruptive-overlay data-viz block text-4xl font-bold transition-colors md:text-6xl lg:text-7xl",
                          pathname === item.href
                            ? "rgb-text neon-glow"
                            : "text-foreground hover:rgb-text"
                        )}
                        data-text={item.label}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-16 space-y-4 md:mt-20"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                    <a
                      href="mailto:hello@tylerschmidt.com"
                      className="text-muted-foreground hover:text-accent kinetic-hover text-lg transition-colors md:text-xl"
                    >
                      hello@tylerschmidt.com
                    </a>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-accent kinetic-hover text-lg transition-colors md:text-xl"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>

                  <div className="text-muted-foreground flex gap-6 text-sm">
                    <a
                      href="https://linkedin.com/in/tylerschmidt"
                      className="hover:rgb-text glitch-hover transition-colors"
                      data-text="LinkedIn"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://twitter.com/tylerschmidt"
                      className="hover:rgb-text glitch-hover transition-colors"
                      data-text="Twitter"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://github.com/tylerschmidt"
                      className="hover:rgb-text glitch-hover transition-colors"
                      data-text="GitHub"
                    >
                      GitHub
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
