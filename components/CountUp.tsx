'use client'

import { useEffect, useRef } from 'react'

const SEEN_KEY = 'splash-seen'

// Counts from 0 to `value` once, starting when the splash is dismissed (or at
// once if it was already seen). The server-rendered text is the final value, so
// it is correct without JavaScript and for reduced-motion visitors.
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0
    let timer = 0
    const run = () => {
      const start = performance.now()
      const duration = 2000
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        el.textContent = `${Math.round(value * eased)}${suffix}`
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      el.textContent = `0${suffix}`
      raf = requestAnimationFrame(tick)
    }

    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* storage blocked */
    }

    if (seen) {
      timer = window.setTimeout(run, 300)
    } else {
      window.addEventListener('portfolio:enter', () => (timer = window.setTimeout(run, 650)), { once: true })
    }
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [value, suffix])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
