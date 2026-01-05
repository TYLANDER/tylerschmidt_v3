import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function GitDigestRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* Theme toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </>
  )
}
