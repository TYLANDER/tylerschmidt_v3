/**
 * Precision Bold Interaction System
 * A comprehensive collection of award-winning micro-interactions
 */

import { Variants } from "framer-motion"

/**
 * Button Interactions
 * Magnetic effect inspired by Awwwards sites
 */
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: "easeOut" },
  },
}

/**
 * Card Interactions
 * Smooth lift with shadow enhancement
 */
export const cardVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1], // Custom ease for smooth lift
    },
  },
}

/**
 * Link Interactions
 * Underline slide-in effect
 */
export const linkVariants: Variants = {
  rest: {
    textDecoration: "none",
    position: "relative",
  },
  hover: {
    transition: { duration: 0.2 },
  },
}

/**
 * Image Interactions
 * Zoom with overflow hidden
 */
export const imageVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

/**
 * Reveal Animations
 * Staggered children with fade up
 */
export const revealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const revealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

/**
 * Page Transitions
 * Smooth fade with subtle scale
 */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

/**
 * Magnetic Cursor Effect
 * For premium interactive elements
 */
export const magneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const handleMouseMove = (e: MouseEvent) => {
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    if (distance < 150) {
      const translateX = deltaX * strength
      const translateY = deltaY * strength
      element.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
  }

  const handleMouseLeave = () => {
    element.style.transform = "translate(0, 0)"
  }

  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
  }
}

/**
 * Smooth Scroll
 * Enhanced smooth scrolling with easing
 */
export const smoothScrollTo = (
  target: string | HTMLElement,
  offset: number = 0,
  duration: number = 1000
) => {
  const element =
    typeof target === "string" ? document.querySelector(target) : target

  if (!element) return

  const start = window.pageYOffset
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset
  const distance = elementTop - start - offset
  const startTime = performance.now()

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  const scroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, start + distance * ease)

    if (progress < 1) {
      requestAnimationFrame(scroll)
    }
  }

  requestAnimationFrame(scroll)
}

/**
 * Intersection Observer Options
 * Consistent reveal timing
 */
export const observerOptions = {
  threshold: 0.1,
  rootMargin: "-50px 0px",
}

/**
 * Spring Configurations
 * Consistent physics across interactions
 */
export const springConfigs = {
  gentle: { stiffness: 100, damping: 20 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 10 },
  stiff: { stiffness: 500, damping: 50 },
}
