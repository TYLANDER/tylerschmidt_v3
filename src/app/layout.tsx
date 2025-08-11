import type { Metadata, Viewport } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { injectAnalytics } from "@/lib/analytics"
import { aeonik, inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration"
import { SunThemeProvider } from "@/components/sun-theme-provider"
import { SunIndicator } from "@/components/ui/sun-indicator"

export const metadata: Metadata = {
  metadataBase: new URL('https://tylerschmidt.dev'),
  title: {
    default: "Tyler Schmidt - Product Designer & Engineer",
    template: "%s | Tyler Schmidt",
  },
  description:
    "Product designer and engineer crafting bold, minimalist interfaces with a human edge. Specializing in design systems, user experience, and front-end development.",
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
    title: "Tyler Schmidt - Product Designer & Engineer",
    description:
      "Product designer and engineer crafting bold, minimalist interfaces with a human edge.",
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
    title: "Tyler Schmidt - Product Designer & Engineer",
    description:
      "Product designer and engineer crafting bold, minimalist interfaces with a human edge.",
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
}

export const viewport: Viewport = {
  themeColor: '#0066FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Non-blocking analytics injection on client
  if (typeof window !== 'undefined') {
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
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
      <body className={cn(
        "font-sans antialiased bg-white dark:bg-ink text-ink dark:text-white min-h-screen transition-colors",
        aeonik.variable,
        inter.variable
      )}>
        <SunThemeProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:text-white focus:px-3 focus:py-2 rounded-md">Skip to content</a>
          <ServiceWorkerRegistration />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <SunIndicator />
        </SunThemeProvider>
      </body>
    </html>
  )
}
