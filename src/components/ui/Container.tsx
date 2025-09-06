export function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`max-w-content mx-auto px-4 ${className ?? ""}`}>
      {children}
    </div>
  )
}
