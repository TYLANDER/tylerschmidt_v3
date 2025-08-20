import Link from 'next/link'

export function SiteFooter() {
  const year = new Date().getFullYear()
  
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {year} Tyler Schmidt. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Crafted with precision and care. <Link href="/colophon" className="underline hover:text-foreground transition-colors">About this site</Link>
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {[
              { href: 'https://github.com/TYLANDER', label: 'GitHub' },
              { href: 'https://linkedin.com/in/tylerschmidt', label: 'LinkedIn' },
              { href: 'https://twitter.com/tylerschmidt', label: 'Twitter' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}