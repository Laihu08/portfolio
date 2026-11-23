'use client'

import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

// Small animated character that sits on a section title's baseline, right of the text.
// Clips come from ~/portfolio-character/sections/<slug>/ (512×512 canvas, character's
// lowest point on row 480). It plays once when the title comes into view, then stays
// on its last frame; it resets only after the whole section has left the screen, so
// coming back to the section plays it again.
const CANVAS = 512
const BASELINE_Y = 480
const CAP = 0.7 // Space Grotesk cap height, in em
// Character box (x, h) inside each clip's canvas, from its meta.json. Each clip is scaled
// so the character itself is 1.8 × the title's cap height, whatever props it carries.
const BBOX: Record<string, { x: number; h: number }> = {
  about: { x: 215, h: 451 },
  experience: { x: 117, h: 450 },
  achievements: { x: 196, h: 397 },
  'open-source': { x: 104, h: 449 },
  projects: { x: 111, h: 450 },
  technology: { x: 131, h: 419 },
  certifications: { x: 132, h: 450 },
  contact: { x: 201, h: 450 },
}

function isSafari() {
  const ua = navigator.userAgent
  return /safari/i.test(ua) && !/chrome|chromium|crios|android|edg/i.test(ua)
}

export function SectionMascot({ slug }: { slug: keyof typeof BBOX }) {
  const bbox = BBOX[slug]
  const heightEm = ((1.8 * CAP) / bbox.h) * CANVAS
  const boxRef = useRef<HTMLSpanElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mode, setMode] = useState<'video' | 'webp' | 'still' | null>(null)
  const [run, setRun] = useState(0) // bumps each time the clip should (re)play
  const base = `/character/sections/${slug}`

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(reduce ? 'still' : isSafari() ? 'webp' : 'video')
    if (reduce) return

    const el = boxRef.current
    const section = el?.closest('.oss, section')
    if (!el || !section) return
    let played = false

    // Play when the character itself is fully on screen.
    const onTitle = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) {
          played = true
          setRun((n) => n + 1)
        }
      },
      { threshold: 1 },
    )
    // Reset once the whole section is off screen.
    const onSection = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && played) {
        played = false
        const v = videoRef.current
        if (v) {
          v.pause()
          v.currentTime = 0
        }
        setRun(0)
      }
    })
    onTitle.observe(el)
    onSection.observe(section)
    return () => {
      onTitle.disconnect()
      onSection.disconnect()
    }
  }, [])

  useEffect(() => {
    if (run > 0 && mode === 'video') {
      const v = videoRef.current
      if (!v) return
      v.currentTime = 0
      v.play().catch(() => setMode('still'))
    }
  }, [run, mode])

  const size = `${heightEm}em`
  const style = {
    display: 'inline-block',
    width: size,
    height: size,
    // Put the character's lowest point on the text baseline, and trim the canvas's
    // empty left margin so it sits close to the last word.
    verticalAlign: `${-((CANVAS - BASELINE_Y) / CANVAS) * heightEm}em`,
    marginLeft: `${0.12 - (bbox.x / CANVAS) * heightEm}em`,
    pointerEvents: 'none' as const,
  }

  let media = null
  if (mode === 'video') {
    media = (
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%' }}
        src={asset(`${base}/play.webm`)}
        poster={asset(`${base}/first.png`)}
        muted
        playsInline
        preload="none"
        onError={() => setMode('still')}
      />
    )
  } else if (mode) {
    const src =
      mode === 'still'
        ? `${base}/last.png`
        : run > 0
          ? `${base}/play.webp?r=${run}` // new URL restarts the animation
          : `${base}/first.png`
    // eslint-disable-next-line @next/next/no-img-element
    media = <img style={{ width: '100%', height: '100%' }} src={asset(src)} alt="" />
  }

  return (
    <span ref={boxRef} style={style} aria-hidden>
      {media}
    </span>
  )
}
