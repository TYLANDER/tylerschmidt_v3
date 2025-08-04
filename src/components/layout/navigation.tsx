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
    exit: { opacity: 0 }
  }

  const menuContentVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
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
          className="chrome-button flex items-center gap-3 px-4 py-3 rounded-full kinetic-hover neon-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <span className="text-sm font-medium neon-text">MENU</span>
          <div className="relative w-5 h-5 flex flex-col justify-center items-center">
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -3,
              }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-foreground absolute"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-foreground absolute"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 3,
              }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-foreground absolute"
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
              className="absolute inset-0 bg-background/95 backdrop-blur-lg dazzle-pattern corruption-grid" 
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              variants={menuContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full flex flex-col justify-center px-6 md:px-12"
            >
              <div className="max-w-6xl mx-auto w-full">
                
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
                          "block text-4xl md:text-6xl lg:text-7xl font-bold transition-colors glitch-hover disruptive-overlay data-viz",
                          pathname === item.href ? "rgb-text neon-glow" : "text-foreground hover:rgb-text"
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
                  className="mt-16 md:mt-20 space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <a 
                      href="mailto:hello@tylerschmidt.com"
                      className="text-lg md:text-xl text-muted-foreground hover:neon-text transition-colors kinetic-hover"
                    >
                      hello@tylerschmidt.com
                    </a>
                    <a 
                      href="tel:+1234567890"
                      className="text-lg md:text-xl text-muted-foreground hover:neon-text transition-colors kinetic-hover"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                  
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <a href="https://linkedin.com/in/tylerschmidt" className="hover:rgb-text transition-colors glitch-hover" data-text="LinkedIn">
                      LinkedIn
                    </a>
                    <a href="https://twitter.com/tylerschmidt" className="hover:rgb-text transition-colors glitch-hover" data-text="Twitter">
                      Twitter
                    </a>
                    <a href="https://github.com/tylerschmidt" className="hover:rgb-text transition-colors glitch-hover" data-text="GitHub">
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

 