'use client'

import { useEffect, useState } from 'react'
import { PROFILE } from '@/lib/data'
import { Reveal } from './Reveal'
import { SocialLinks } from './SocialLinks'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  }

  return (
    <section id="contact" className="section">
      <Reveal className="reveal-mask mb-10">
        <div className="section-heading">
          <span>Let&apos;s Talk</span>
          
        </div>
      </Reveal>

      <Reveal>
        <a
          href={`mailto:${PROFILE.email}`}
          onMouseEnter={copyEmail}
          className="group relative inline-block"
        >
          <span
            className="font-[var(--font-heading)] leading-none"
            style={{ fontSize: 'clamp(22px, 6.4vw, 96px)', textDecoration: 'underline', textUnderlineOffset: '0.1em' }}
          >
            {PROFILE.email}
          </span>
          <span
            className="absolute left-0 -bottom-7 font-mono text-sm transition-opacity duration-300"
            style={{ opacity: copied ? 1 : 0 }}
          >
            Copied ✓
          </span>
        </a>
      </Reveal>

      <Reveal delay={60} className="mt-6 text-lg text-[var(--mute)]">
        Open to new work. Say hello.
      </Reveal>

      <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-4">
        <SocialLinks size={24} />
        <span className="text-sm text-[var(--mute)]">{PROFILE.location}</span>
      </Reveal>
    </section>
  )
}

export function Footer() {
  const [visible, setVisible] = useState(false)
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    // Client-only: avoids baking a build-time date into the prerendered page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear())
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <footer className="relative flex flex-col items-center justify-center gap-3 border-t border-[var(--line)] px-[var(--gutter)] py-10 font-mono text-xs text-[var(--faint)] md:flex-row">
      <span>
        © {year ?? ''} {PROFILE.name}
      </span>
      <a
        href="#hero"
        className="transition-opacity duration-300 md:absolute md:right-[var(--gutter)]"
        style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      >
        Back to top ↑
      </a>
    </footer>
  )
}
