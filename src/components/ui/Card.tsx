import { cn } from "@/lib/utils"

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "shadow-subtle overflow-hidden rounded-md border border-border bg-card",
        className
      )}
    >
      {children}
    </div>
  )
}
