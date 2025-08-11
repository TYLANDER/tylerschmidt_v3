import { cn } from '@/lib/utils'

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-white dark:bg-card border border-ink/10 dark:border-white/10 rounded-md shadow-subtle overflow-hidden', className)}>
      {children}
    </div>
  )
}


