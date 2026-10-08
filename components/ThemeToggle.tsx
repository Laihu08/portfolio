'use client'

import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
const getServerSnapshot = (): Theme => 'light'

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  // Quiet cross-fade: colours ease to the new theme in place. No wipe, no frozen
  // frame, so it never feels like the page reloaded.
  const toggle = () => {
    const root = document.documentElement
    root.classList.add('theme-fade')
    root.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage blocked — theme still applies for this visit */
    }
    window.setTimeout(() => root.classList.remove('theme-fade'), 500)
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--card)]/70 flex items-center justify-center text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
