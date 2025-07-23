"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const { position, direction } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80",
          className
        )}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-xl font-bold">
                TS
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavigationLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
                             <Button variant="magnetic" size="sm">
                 Let&apos;s Talk
               </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4,
                }}
                className="w-6 h-0.5 bg-foreground absolute"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                className="w-6 h-0.5 bg-foreground absolute"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 4,
                }}
                className="w-6 h-0.5 bg-foreground absolute"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-background/95 backdrop-blur-lg" />
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="text-center space-y-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-3xl font-medium hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigationItems.length * 0.1 }}
                  className="pt-8"
                >
                                     <Button variant="magnetic" size="lg">
                     Let&apos;s Talk
                   </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface NavigationLinkProps {
  href: string
  label: string
  isActive: boolean
}

function NavigationLink({ href, label, isActive }: NavigationLinkProps) {
  return (
    <Link href={href} className="relative group">
      <motion.span
        className={cn(
          "text-sm font-medium transition-colors duration-200",
          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  )
} 