import type { Metadata } from "next"
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"
import { SmoothScrollWrapper } from "@/components/layout/smooth-scroll-wrapper"
import { PageTransition } from "@/components/layout/page-transition"

export const metadata: Metadata = {
  title: {
    default: "Tyler Schmidt - UX/UI Designer & Engineer",
    template: "%s | Tyler Schmidt",
  },
  description: "Award-winning portfolio showcasing cutting-edge UX/UI design and engineering work. Specializing in modern web applications, mobile experiences, and interactive design.",
  keywords: [
    "UX Designer",
    "UI Designer",
    "Frontend Engineer",
    "Portfolio",
    "Web Design",
    "Mobile Design",
    "React",
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "Design Systems",
  ],
  authors: [{ name: "Tyler Schmidt" }],
  creator: "Tyler Schmidt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tylerschmidt.dev",
    title: "Tyler Schmidt - UX/UI Designer & Engineer",
    description: "Award-winning portfolio showcasing cutting-edge UX/UI design and engineering work.",
    siteName: "Tyler Schmidt Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Schmidt - UX/UI Designer & Engineer",
    description: "Award-winning portfolio showcasing cutting-edge UX/UI design and engineering work.",
    creator: "@tylerschmidt",
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
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <SmoothScrollWrapper>
          <div className="relative min-h-screen bg-background">
            <Navigation />
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </SmoothScrollWrapper>
      </body>
    </html>
  )
}
