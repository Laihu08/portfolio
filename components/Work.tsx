'use client'

/* eslint-disable @next/next/no-img-element -- remote GitHub repo artwork, shown as-is */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { CONTRIBUTIONS, PROJECTS, type ContributionEntry, type ProjectEntry } from '@/lib/data'
import { Reveal } from './Reveal'

const SORTED_CONTRIBUTIONS = [...CONTRIBUTIONS].sort((a, b) => b.stars - a.stars)

const formatStars = (stars: number) =>
  stars >= 1000 ? `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(stars)

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

/* ── Carousel ── */

function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ active: 0, visible: 1 })

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return null
    const cards = [...track.querySelectorAll<HTMLElement>(':scope > .oss-slide')]
    if (cards.length === 0) return null
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = cards[0].getBoundingClientRect().width + gap
    const visible = Math.max(1, Math.floor((track.clientWidth + gap) / step))
    const trackLeft = track.getBoundingClientRect().left
    const offsets = cards.map((card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft)
    return { track, cards, visible, offsets, maxStart: Math.max(0, cards.length - visible) }
  }, [])

  const update = useCallback(() => {
    const m = measure()
    if (!m) return
    const closest = m.offsets.reduce(
      (best, offset, i) =>
        Math.abs(offset - m.track.scrollLeft) < Math.abs(m.offsets[best] - m.track.scrollLeft) ? i : best,
      0,
    )
    setState({ active: Math.min(m.maxStart, closest), visible: m.visible })
  }, [measure])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const go = (delta: number) => {
    const m = measure()
    if (!m) return
    const index = Math.min(m.maxStart, Math.max(0, state.active + delta))
    m.track.scrollTo({
      left: m.offsets[index],
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const last = Math.min(state.active + state.visible, count)
  const label =
    state.visible > 1 ? `${state.active + 1}–${last} / ${count}` : `${state.active + 1} / ${count}`

  return {
    trackRef,
    label,
    prev: () => go(-1),
    next: () => go(1),
    atStart: state.active === 0,
    atEnd: state.active >= Math.max(0, count - state.visible),
  }
}

function Carousel({
  id,
  title,
  noun,
  count,
  children,
}: {
  id: string
  title: string
  noun: string
  count: number
  children: ReactNode
}) {
  const { trackRef, label, prev, next, atStart, atEnd } = useCarousel(count)
  return (
    <div id={id} className="oss">
      <Reveal className="reveal-mask">
        <div className="oss-head">
          <div className="section-heading">
            <span>{title}</span>
          </div>
          <div className="oss-controls" aria-label={`${title} carousel controls`}>
            <span className="oss-count" aria-live="polite">
              {label}
            </span>
            <button type="button" className="oss-nav" aria-label={`Previous ${noun}`} disabled={atStart} onClick={prev}>
              ‹
            </button>
            <button type="button" className="oss-nav" aria-label={`Next ${noun}`} disabled={atEnd} onClick={next}>
              ›
            </button>
          </div>
        </div>
      </Reveal>
      <div ref={trackRef} className="oss-track" aria-label={title}>
        {children}
      </div>
    </div>
  )
}

/* ── Card pieces ── */

function Flow({ steps }: { steps: [string, string, string] }) {
  return (
    <div className="oss-flow" aria-label={steps.map((s) => s.replace('\n', ' ')).join(', ')}>
      {steps.map((step, i) => (
        <FlowStep key={step} step={step} arrow={i > 0} />
      ))}
    </div>
  )
}

function FlowStep({ step, arrow }: { step: string; arrow: boolean }) {
  return (
    <>
      {arrow && (
        <span className="oss-flow-arrow" aria-hidden="true">
          →
        </span>
      )}
      <span className="oss-flow-node">{step}</span>
    </>
  )
}

function Stars({ c }: { c: ContributionEntry }) {
  return (
    <a
      className="oss-stars"
      href={c.repoUrl}
      {...external}
      aria-label={`${c.repo}, ${c.stars.toLocaleString('en-US')} GitHub stars`}
    >
      <span className="oss-stars-label">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 .9l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L.8 6.1l5-.7L8 .9z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </svg>
        Star
      </span>
      <span className="oss-stars-count">{formatStars(c.stars)}</span>
    </a>
  )
}

function Details({ summary, open, children }: { summary: string; open: boolean; children: ReactNode }) {
  return (
    <details className="oss-details" open={open}>
      <summary>{summary}</summary>
      <div className="oss-copy">{children}</div>
    </details>
  )
}

function Skills({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="oss-skills">
      <span className="oss-skills-label">{label}</span>
      <ul className="oss-meta-row">
        {items.map((item) => (
          <li key={item} className="oss-meta">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ContributionCard({
  c,
  detailsOpen,
  onExplore,
}: {
  c: ContributionEntry
  detailsOpen: boolean
  onExplore: () => void
}) {
  const prUrl = `${c.repoUrl}/pull/${c.pr}`
  return (
    <article className="oss-card">
      <div className="oss-art">
        <span className="oss-art-label">{c.label}</span>
        <div className="oss-diagram">
          <div className="oss-diagram-top">
            <div className="oss-repo">
              <a href={c.repoUrl} {...external}>
                {c.logo && (
                  <img
                    className={`oss-logo${c.logoWordmark ? ' oss-logo--wordmark' : ''}`}
                    src={c.logo}
                    alt=""
                    loading="lazy"
                  />
                )}
                <span>{c.repo}</span>
              </a>
            </div>
            <span className="oss-meta">
              <Stars c={c} />
              {c.status && (
                <a className={`oss-status oss-status-${c.status}`} href={prUrl} {...external}>
                  {c.status === 'merged' ? 'Merged' : 'Open'}
                </a>
              )}
            </span>
          </div>
          <img className="oss-banner" src={c.banner} alt={c.bannerAlt} loading="lazy" />
          <p className="oss-diagram-title">{c.diagramTitle}</p>
          <Flow steps={c.flow} />
          <div className="oss-diagram-foot">
            <span>{c.footNote}</span>
            <a href={prUrl} {...external} aria-label={`${c.repo} pull request ${c.pr}`}>
              PR #{c.pr} ↗
            </a>
          </div>
        </div>
      </div>
      <Details summary="View contribution details" open={detailsOpen}>
        <h3>{c.title}</h3>
        <p>{c.summary}</p>
        <Skills label="Skills used" items={c.skills} />
        <div className="oss-actions">
          <button type="button" className="oss-link" aria-haspopup="dialog" onClick={onExplore}>
            Explore the contribution <span aria-hidden="true">→</span>
          </button>
          <a className="oss-link" href={prUrl} {...external}>
            View PR #{c.pr} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Details>
    </article>
  )
}

function ProjectCard({ p, detailsOpen }: { p: ProjectEntry; detailsOpen: boolean }) {
  return (
    <article className="oss-card">
      <div className="oss-art">
        <span className="oss-art-label">{p.label}</span>
        <div className="oss-diagram">
          <div className="oss-diagram-top">
            <div className="oss-repo">
              <span>{p.kind}</span>
            </div>
            <span className="oss-mark">{p.mark}</span>
          </div>
          <p className="oss-diagram-title">{p.diagramTitle}</p>
          <Flow steps={p.flow} />
          <div className="oss-diagram-foot">
            <span>{p.footNote}</span>
            {p.url && (
              <a href={p.url} {...external} aria-label={`${p.title} on GitHub`}>
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
      <Details summary="View project details" open={detailsOpen}>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <Skills label="Technologies" items={p.tags} />
        {p.url && (
          <div className="oss-actions">
            <a className="oss-link" href={p.url} {...external}>
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </Details>
    </article>
  )
}

/* ── Story dialog ── */

function StoryDialog({ c, onClose }: { c: ContributionEntry | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (c && !dialog.open) dialog.showModal()
    if (!c && dialog.open) dialog.close()
  }, [c])

  return (
    <dialog
      ref={ref}
      className="oss-dialog"
      aria-labelledby="oss-dialog-title"
      aria-describedby="oss-dialog-lead"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {c && (
        <div className="oss-dialog-inner">
          <div className="oss-dialog-top">
            <span className="oss-kind">
              {c.repo} · PR #{c.pr}
            </span>
            <button type="button" className="oss-close" aria-label="Close contribution story" onClick={onClose}>
              ×
            </button>
          </div>
          <h2 id="oss-dialog-title">{c.story.title}</h2>
          <p className="oss-dialog-lead" id="oss-dialog-lead">
            {c.story.lead}
          </p>
          <ol className="oss-story">
            {c.story.steps.map((step) => (
              <li key={step.heading}>
                <h3>{step.heading}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="oss-dialog-links">
            {c.story.links.map((link) => (
              <a key={link.url} href={link.url} {...external}>
                {link.label} ↗
              </a>
            ))}
          </p>
        </div>
      )}
    </dialog>
  )
}

/* ── Section ── */

export function Work() {
  const [story, setStory] = useState<ContributionEntry | null>(null)
  // Card details are expanded on desktop and collapsed behind a toggle on phones.
  const [detailsOpen, setDetailsOpen] = useState(true)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)')
    const sync = () => setDetailsOpen(!mobile.matches)
    sync()
    mobile.addEventListener('change', sync)
    return () => mobile.removeEventListener('change', sync)
  }, [])

  return (
    <section className="section">
      <Carousel id="open-source" title="Open source contributions" noun="contribution" count={SORTED_CONTRIBUTIONS.length}>
        {SORTED_CONTRIBUTIONS.map((c, i) => (
          <div key={`${c.repo}-${c.pr}`} className="oss-slide">
            <Reveal delay={(i % 2) * 70}>
              <ContributionCard c={c} detailsOpen={detailsOpen} onExplore={() => setStory(c)} />
            </Reveal>
          </div>
        ))}
      </Carousel>

      <Carousel id="work" title="Projects" noun="project" count={PROJECTS.length}>
        {PROJECTS.map((p, i) => (
          <div key={p.title} className="oss-slide">
            <Reveal delay={(i % 2) * 70}>
              <ProjectCard p={p} detailsOpen={detailsOpen} />
            </Reveal>
          </div>
        ))}
      </Carousel>

      <StoryDialog c={story} onClose={() => setStory(null)} />
    </section>
  )
}
