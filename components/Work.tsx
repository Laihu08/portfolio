import { PROJECTS, type ProjectEntry } from '@/lib/data'
import { Reveal } from './Reveal'

// Cover panel: the project's real pipeline as a small diagram (taken from its
// README / résumé), in place of a screenshot.
function Cover({ flow }: { flow: string[] }) {
  return (
    <div
      className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-[var(--line)] bg-[var(--paper)] px-5"
      style={{
        backgroundImage:
          'radial-gradient(color-mix(in srgb, var(--ink) 14%, transparent) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
      aria-hidden
    >
      <ol className="flex flex-wrap items-center justify-center gap-y-3 transition-transform duration-700 group-hover:scale-[1.03]">
        {flow.map((step, i) => {
          const last = i === flow.length - 1
          return (
            <li key={step} className="flex items-center">
              {i > 0 && <span className="px-1.5 font-mono text-xs text-[var(--faint)]">→</span>}
              <span
                className={`rounded-lg border px-2.5 py-1.5 text-center text-xs leading-snug md:text-[13px] ${
                  last
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                    : 'border-[var(--line)] bg-[var(--card)] text-[var(--ink-2)]'
                }`}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Card({ project }: { project: ProjectEntry }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] transition-colors duration-300 hover:border-[var(--ink)]">
      <Cover flow={project.flow} />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="mb-4 w-fit rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
          {project.tag}
        </span>
        <h3 className="text-xl font-normal leading-snug">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-[var(--ink-2)]">
          {project.bullets.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full bg-[var(--paper)] px-3 py-1 text-xs">
              {t}
            </li>
          ))}
        </ul>
        {project.url && (
          <p className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
            View on GitHub <span aria-hidden>→</span>
          </p>
        )}
      </div>
    </article>
  )
}

export function Work() {
  return (
    <section id="work" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>Projects</span>
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 70} className="h-full">
            <Card project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
