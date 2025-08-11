import { cn } from '@/lib/utils'

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-white border border-ink/10 rounded-md shadow-subtle overflow-hidden', className)}>
      {children}
    </div>
  )
}


