'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/lib/data'

const SEEN_KEY = 'splash-seen'

// Full-screen intro: signature, role, one button. Clicking slides the whole
// screen up like a curtain, revealing the page. Skipped on repeat visits in the
// same session.
export function Splash() {
  const [phase, setPhase] = useState<'open' | 'closing' | 'gone'>('open')

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* storage blocked — just show the splash */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (seen) setPhase('gone')
  }, [])

  useEffect(() => {
    document.body.style.overflow = phase === 'open' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  const enter = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event('portfolio:enter'))
    setPhase('closing')
    window.setTimeout(() => setPhase('gone'), 1000)
  }

  if (phase === 'gone') return null

  const [first, ...rest] = PROFILE.name.split(' ')

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--paper)] px-[var(--gutter)] text-center"
      style={{
        transform: phase === 'closing' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <h1
        className="splash-sign leading-[0.85] text-[var(--ink-2)]"
        style={{ fontFamily: 'var(--font-signature)', fontSize: 'clamp(84px, 16vw, 200px)' }}
      >
        <span className="block">{first}</span>
        <span className="block ml-[0.6em] -mt-[0.05em] text-[0.8em]">{rest.join(' ')}</span>
      </h1>
      <p className="mt-10 text-lg font-light tracking-wide splash-fade" style={{ animationDelay: '1s' }}>
        {PROFILE.role}
      </p>
      <button
        onClick={enter}
        className="pill pill-outline mt-8 splash-fade"
        style={{ animationDelay: '1.3s', borderColor: 'var(--ink)' }}
        autoFocus
      >
        See Portfolio
      </button>
    </div>
  )
}
