"use client"

import { useEffect, useState } from "react"

export function HeroDebug() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if dark mode
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDark()

    // Listen for changes
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>Loading...</h1>
      </div>
    )
  }

  const bgColor = isDark ? "#000000" : "#ffffff"
  const textColor = isDark ? "#ffffff" : "#000000"
  const accentColor = "#0066ff"

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2rem",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        <h1
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: "bold",
            lineHeight: "1",
            marginBottom: "2rem",
            letterSpacing: "-0.05em",
          }}
        >
          TYLER SCHMIDT
        </h1>

        <p
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            marginBottom: "1rem",
            opacity: 0.9,
          }}
        >
          I design{" "}
          <span style={{ color: accentColor, fontWeight: "bold" }}>
            systems that feel
          </span>
          .
        </p>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            marginBottom: "3rem",
            opacity: 0.7,
            maxWidth: "600px",
            margin: "0 auto 3rem",
          }}
        >
          Where mathematical precision meets raw emotion. Every pixel calculated
          to move the soul.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#work"
            style={{
              padding: "1rem 2rem",
              backgroundColor: accentColor,
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "0.25rem",
              transition: "transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            VIEW WORK
          </a>

          <a
            href="#contact"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "transparent",
              color: textColor,
              border: `2px solid ${textColor}`,
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "0.25rem",
              transition: "all 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accentColor
              e.currentTarget.style.color = accentColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = textColor
              e.currentTarget.style.color = textColor
            }}
          >
            GET IN TOUCH
          </a>
        </div>

        <div
          style={{
            marginTop: "4rem",
            padding: "1rem",
            backgroundColor: isDark ? "#111" : "#f5f5f5",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontFamily: "monospace",
          }}
        >
          <p>Debug Info:</p>
          <p>Theme: {isDark ? "dark" : "light"}</p>
          <p>Background: {bgColor}</p>
          <p>Text: {textColor}</p>
          <p>Time: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </section>
  )
}
