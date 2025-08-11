'use client'
import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.15 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transition: 'opacity .35s ease, transform .35s ease', opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(12px)' }}
    >
      {children}
    </div>
  )
}


