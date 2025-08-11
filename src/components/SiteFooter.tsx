export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="mx-auto max-w-content px-4 py-6 text-sm text-ink/60">
        © {year} Tyler Schmidt
      </div>
    </footer>
  )
}


