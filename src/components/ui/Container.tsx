export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-content px-4 ${className ?? ''}`}>{children}</div>
}


