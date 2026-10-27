import { ABOUT_LINES, ABOUT_TAGS } from '@/lib/data'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>About Me</span>
        </div>
      </Reveal>

      <div className="space-y-4 md:space-y-5">
        {ABOUT_LINES.map((line, i) => (
          <Reveal key={line} delay={i * 120}>
            <p className="text-pretty text-2xl leading-snug md:text-4xl md:leading-tight">{line}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={ABOUT_LINES.length * 120 + 80}>
        <ul className="mt-12 flex flex-wrap gap-2.5">
          {ABOUT_TAGS.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink-2)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
