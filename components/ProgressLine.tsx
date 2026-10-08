'use client'

import { useEffect, useRef } from 'react'

// Thin top line showing how far down the page you are — a quiet cue that the
// story has an end. Written to a ref to avoid re-rendering on every scroll tick.
export function ProgressLine() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${p})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <div ref={ref} className="progress-line" style={{ transform: 'scaleX(0)' }} aria-hidden />
}
