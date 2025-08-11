"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300 ${scrolled ? 'py-2 shadow-subtle' : 'py-4'}`}>
      <div className="mx-auto max-w-content px-4 flex items-center justify-between">
        <Link href="/" className={`font-heading font-semibold text-ink ${scrolled ? 'text-lg' : 'text-xl'}`}>Tyler Schmidt</Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink/80">
          <Link href="/work" className="hover:text-ink transition-colors">Work</Link>
          <Link href="/about" className="hover:text-ink transition-colors">About</Link>
          <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}


