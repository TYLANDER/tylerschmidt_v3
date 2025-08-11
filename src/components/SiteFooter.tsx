export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-content px-4 py-6 text-sm text-foreground/60">
        © {year} Tyler Schmidt
      </div>
    </footer>
  )
}


