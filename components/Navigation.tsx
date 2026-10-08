'use client'

import { useEffect, useState } from 'react'
import { NAV } from '@/lib/data'
import { useActiveSection } from '@/lib/hooks'
import { ThemeToggle } from './ThemeToggle'
import { SocialLinks } from './SocialLinks'

const ids = NAV.map((n) => n.id)

// On the opening screen only the theme toggle shows. Once you scroll past it,
// the tabs and quiet social icons fade in.
export function Navigation() {
  const active = useActiveSection(ids)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const reveal = `transition-[opacity,transform,visibility] duration-500 ${
    pastHero ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
  }`

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-center px-[var(--gutter)] h-[72px]">
        <div
          aria-hidden
          className={`absolute inset-0 backdrop-blur-md bg-[var(--paper)]/70 transition-opacity duration-500 ${
            pastHero ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <nav className={`relative hidden md:flex items-center gap-9 ${reveal}`} aria-hidden={!pastHero}>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              tabIndex={pastHero ? 0 : -1}
              className={`relative pb-1 text-[15px] font-light transition-colors duration-300 ${
                active === item.id ? 'text-[var(--ink)]' : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              {item.label}
              <span
                className="absolute left-0 bottom-0 h-px w-full bg-[var(--ink)] origin-left transition-transform duration-500"
                style={{ transform: active === item.id ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </a>
          ))}
        </nav>

        <div className="absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 flex items-center gap-2">
          <SocialLinks className={`hidden lg:flex ${reveal}`} size={18} />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden rounded-full border border-[var(--line)] bg-[var(--card)]/70 px-5 py-2.5 text-sm font-medium ${reveal}`}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--paper)] flex flex-col items-center justify-center gap-6 md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-[var(--gutter)] rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium"
            aria-label="Close menu"
          >
            Close
          </button>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-light tracking-tight"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
