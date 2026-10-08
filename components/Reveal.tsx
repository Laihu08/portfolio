'use client'

import { useInView } from '@/lib/hooks'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isIn } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${isIn ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: isIn ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
