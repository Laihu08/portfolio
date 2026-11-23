'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { asset } from '@/lib/asset'

// The 2D character that leans on the "R" of the splash name.
// Clip geometry (from ~/portfolio-character/meta.json): a 1024×1024 canvas in which
// the R's ink box sits at x=420, y=372, w=449, h=608. We measure the real R on the
// page, scale the canvas so both R boxes match, and pin it there.
const CANVAS = 1024
const R_BOX = { x: 420, y: 372, h: 608 }
const START_DELAY_MS = 500 // let the name's wipe reveal the R first

type Box = { left: number; top: number; size: number }

function measureR(h1: HTMLElement): Box | null {
  const text = h1.firstChild
  if (!text || text.nodeType !== Node.TEXT_NODE) return null
  const range = document.createRange()
  range.setStart(text, 0)
  range.setEnd(text, 1)
  const r = range.getBoundingClientRect()
  const host = h1.parentElement!.getBoundingClientRect()

  const cs = getComputedStyle(h1)
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
  const m = ctx.measureText('R')

  // The range box spans the font's ascent..descent, so its top + ascent is the baseline.
  const baseline = r.top + m.fontBoundingBoxAscent
  const inkTop = baseline - m.actualBoundingBoxAscent
  const inkLeft = r.left - m.actualBoundingBoxLeft
  const inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
  const scale = inkH / R_BOX.h
  return {
    left: inkLeft - host.left - R_BOX.x * scale,
    top: inkTop - host.top - R_BOX.y * scale,
    size: CANVAS * scale,
  }
}

// Safari can't draw VP9 alpha (it would show a black box), so it gets the animated WebP.
function isSafari() {
  const ua = navigator.userAgent
  return /safari/i.test(ua) && !/chrome|chromium|crios|android|edg/i.test(ua)
}

export function SplashCharacter({ nameRef }: { nameRef: RefObject<HTMLHeadingElement | null> }) {
  const [box, setBox] = useState<Box | null>(null)
  const [mode, setMode] = useState<'video' | 'webp' | 'still' | null>(null)
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(reduce ? 'still' : isSafari() ? 'webp' : 'video')

    const update = () => {
      if (nameRef.current) setBox(measureR(nameRef.current))
    }
    update()
    document.fonts?.ready.then(update)
    window.addEventListener('resize', update)
    const t = window.setTimeout(() => setStarted(true), reduce ? 0 : START_DELAY_MS)
    return () => {
      window.removeEventListener('resize', update)
      window.clearTimeout(t)
    }
  }, [nameRef])

  useEffect(() => {
    if (started && mode === 'video') videoRef.current?.play().catch(() => setMode('still'))
  }, [started, mode])

  if (!box || !mode) return null

  const style = {
    position: 'absolute' as const,
    left: box.left,
    top: box.top,
    width: box.size,
    height: box.size,
    pointerEvents: 'none' as const,
    zIndex: 1,
    // Fade in as the clip starts (the clip itself has no pop-in).
    opacity: started ? 1 : 0,
    transition: 'opacity 0.3s ease-out',
  }

  if (mode === 'video') {
    return (
      <video
        ref={videoRef}
        style={style}
        src={asset('/character/character.webm')}
        muted
        playsInline
        preload="auto"
        aria-hidden
        onError={() => setMode('still')}
      />
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={style}
      src={asset(mode === 'webp' && started ? '/character/character.webp' : '/character/last.png')}
      alt=""
      aria-hidden
    />
  )
}
