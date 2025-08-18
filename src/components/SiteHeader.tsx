"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MobileNav } from './MobileNav'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
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
            className="font-heading font-bold text-xl md:text-2xl text-foreground hover:text-accent transition-colors duration-300"
          >
            Tyler Schmidt
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '/work', label: 'Work' },
                { href: '/about', label: 'About' },
                { href: '/lab', label: 'Lab' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 group relative"
              aria-label="Toggle menu"
            >
              <motion.span 
                className="w-6 h-0.5 bg-foreground transition-all duration-300"
                animate={{
                  rotate: mobileNavOpen ? 45 : 0,
                  y: mobileNavOpen ? 6 : 0
                }}
              />
              <motion.span 
                className="w-4 h-0.5 bg-foreground transition-all duration-300"
                animate={{
                  opacity: mobileNavOpen ? 0 : 1,
                  x: mobileNavOpen ? 20 : 0
                }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-foreground transition-all duration-300"
                animate={{
                  rotate: mobileNavOpen ? -45 : 0,
                  y: mobileNavOpen ? -6 : 0
                }}
              />
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </motion.header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}