import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { injectAnalytics } from "@/lib/analytics"
import { aeonik, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { PiaConsoleInit } from "@/components/PiaConsoleInit"

export const metadata: Metadata = {
  metadataBase: new URL("https://tylerschmidt.dev"),
  title: {
    default: "Tyler Schmidt - Product Designer",
    template: "%s | Tyler Schmidt",
  },
  description:
    "Tyler Schmidt - Product Designer. Creative direction by Pia. Where mathematical precision meets raw emotion in digital experiences.",
  keywords: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "Frontend Engineer",
    "Design Systems",
    "User Experience",
    "React",
    "Next.js",
    "TypeScript",
    "Precision Bold",
    "Minimalist Design",
  ],
  authors: [{ name: "Tyler Schmidt", url: "https://tylerschmidt.dev" }],
  creator: "Tyler Schmidt",
  publisher: "Tyler Schmidt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tylerschmidt.dev",
    title: "Tyler Schmidt - Product Designer",
    description:
      "Product designer crafting bold, minimalist interfaces with a human edge.",
    siteName: "Tyler Schmidt",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tyler Schmidt Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Schmidt - Product Designer",
    description:
      "Product designer crafting bold, minimalist interfaces with a human edge.",
    creator: "@tylerschmidt",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Non-blocking analytics injection on client
  if (typeof window !== "undefined") {
    // small guard so it only runs once per load
    const w = window as unknown as { __analyticsInjected?: boolean }
    if (!w.__analyticsInjected) {
      w.__analyticsInjected = true
      injectAnalytics()
    }
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* 
          Critical: This script prevents flash of wrong theme on page load.
          It runs before React hydrates, immediately applying the correct theme
          based on cached preference or system settings. This ensures users
          never see a jarring theme switch when navigating pages.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Check for cached theme from sun calculations
                const theme = localStorage.getItem('theme');
                // Fallback to system preference if no cached theme
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && systemDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased transition-colors",
          aeonik.variable,
          inter.variable
        )}
      >
        <a
          href="#main"
          className="sr-only rounded-md focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <ServiceWorkerRegistration />
        <PiaConsoleInit />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </body>
    </html>
  )
}
