"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { asset } from '@/lib/asset';
import { TIMELINE } from "@/lib/data";
import { Reveal } from "./Reveal";

// Scroll-linked timeline: a hairline fills as you read, a glowing head leads it,
// each stop lights up when the head reaches it and its title brightens.
// The fill eases toward its target in a rAF loop and is written straight to the
// DOM (no React re-render per frame); React state only changes when a new stop
// is reached.
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let current = 0;
    let target = 0;
    let raf = 0;
    let lastReached = -1;

    const measureTarget = () => {
      const rect = container.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      target = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
    };

    const paint = () => {
      const rect = container.getBoundingClientRect();
      if (fillRef.current)
        fillRef.current.style.transform = `scaleY(${current})`;
      if (headRef.current) {
        headRef.current.style.top = `${current * 100}%`;
        headRef.current.style.opacity =
          current > 0.002 && current < 0.998 ? "1" : "0";
      }
      const headY = current * rect.height;
      let count = 0;
      nodeRefs.current.forEach((n) => {
        if (!n) return;
        const nr = n.getBoundingClientRect();
        if (nr.top - rect.top + nr.height / 2 <= headY + 1) count += 1;
      });
      if (count !== lastReached) {
        lastReached = count;
        setReached(count);
      }
    };

    const tick = () => {
      const diff = target - current;
      current =
        reduce || Math.abs(diff) < 0.0006 ? target : current + diff * 0.14;
      paint();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measureTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>Experience &amp; Education</span>
        </div>
      </Reveal>

      <div ref={containerRef} className="relative pl-10 md:pl-16">
        <div
          className="absolute left-4 md:left-7 top-1 bottom-1 w-px bg-[var(--line)]"
          aria-hidden
        >
          <div
            ref={fillRef}
            className="h-full w-full origin-top bg-[var(--ink)]"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <span
          ref={headRef}
          aria-hidden
          className="absolute left-4 md:left-7 z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)] transition-opacity duration-300"
          style={{
            top: "0%",
            opacity: 0,
            boxShadow:
              "0 0 0 6px color-mix(in srgb, var(--ink) 14%, transparent)",
          }}
        />

        <div className="space-y-24 md:space-y-28">
          {TIMELINE.map((entry, i) => {
            const isReached = i < reached;
            const isCurrent = i === reached - 1;
            const workIndex = TIMELINE.slice(0, i + 1).filter(
              (e) => !e.education && !e.bonus,
            ).length;
            const label = entry.education
              ? "ED"
              : entry.bonus
                ? "+"
                : String(workIndex).padStart(2, "0");
            return (
              <Reveal key={entry.title + entry.company} delay={i * 60}>
                <div className="relative">
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className="absolute -left-6 md:-left-9 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-500"
                    style={{
                      borderColor: isReached ? "var(--ink)" : "var(--faint)",
                      background: isReached ? "var(--ink)" : "var(--paper)",
                      color: isReached ? "var(--paper)" : "var(--faint)",
                    }}
                  >
                    {isCurrent && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-[var(--ink)] opacity-20" />
                    )}
                    <span className="relative">{label}</span>
                  </span>
                  <div className="mb-4 flex items-baseline justify-between gap-4 font-mono text-sm text-[var(--faint)]">
                    <span>
                      {entry.bonus ? "Bonus" : `${entry.start} — ${entry.end}`}
                    </span>
                    <span className="text-right">{entry.location}</span>
                  </div>
                  <h3
                    className="font-[var(--font-heading)] text-3xl md:text-4xl leading-tight mb-3 transition-colors duration-500"
                    style={{ color: isReached ? "var(--ink)" : "var(--mute)" }}
                  >
                    {entry.title}
                  </h3>
                  {entry.company !== entry.location && (
                    <p className="text-base text-[var(--mute)] mb-8 flex flex-wrap items-center gap-x-1.5">
                      {entry.url ? (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${entry.company} website`}
                          className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors duration-300 hover:text-[var(--ink)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
                        >
                          {entry.logo && (
                            <Image
                              src={asset(entry.logo)}
                              alt=""
                              width={20}
                              height={20}
                              unoptimized
                              className="h-5 w-5 rounded-[3px] object-contain"
                            />
                          )}
                          {entry.company}
                        </a>
                      ) : (
                        entry.company
                      )}
                    </p>
                  )}
                  {entry.bullets.length > 0 && (
                    <ul className="text-lg text-[var(--ink-2)] leading-[1.75] space-y-5 lg:block lg:space-y-0 lg:columns-2 lg:gap-x-20">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-4 lg:mb-6 lg:break-inside-avoid">
                          <span className="text-[var(--faint)]">—</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
