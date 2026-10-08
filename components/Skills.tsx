import { SKILL_GROUPS, type SkillFamily } from '@/lib/data'
import { TECH_ICONS, type TechIcon } from '@/lib/techIcons'
import { Reveal } from './Reveal'

// Category header glyphs (line style, drawn on a 24 grid).
const CATEGORY_ICONS: Record<SkillFamily, string[]> = {
  'AI & Agents': ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z', 'M19 3v4', 'M17 5h4'],
  Frameworks: ['m12 2 10 5-10 5L2 7z', 'm2 12 10 5 10-5', 'm2 17 10 5 10-5'],
  Programming: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'],
  'Cloud & Delivery': ['M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 1 0 5 14.5 4 4 0 0 0 6 19z'],
  Tools: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z'],
  'Engineering Practice': ['M22 11.1V12a10 10 0 1 1-5.9-9.1', 'm9 11 3 3L22 4'],
}

function LineSvg({ paths, className }: { paths: string[]; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

function SkillLogo({ icon }: { icon?: TechIcon }) {
  if (!icon) return null
  if (icon.kind === 'brand') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-current text-[var(--ink-2)] transition-colors duration-300 group-hover:text-[var(--glow)]"
        aria-hidden
      >
        <path d={icon.path} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-[var(--ink-2)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>Technologies</span>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.family} delay={i * 50}>
            <div className="h-full rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--paper)] text-[var(--ink)]">
                  <LineSvg paths={CATEGORY_ICONS[group.family]} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{group.family}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const icon = TECH_ICONS[skill.name]
                  return (
                    <li
                      key={skill.name}
                      className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--ink-2)] transition-colors duration-300 hover:border-[var(--ink)]"
                      style={
                        icon?.kind === 'brand'
                          ? ({ '--glow': `#${icon.hex}` } as React.CSSProperties)
                          : undefined
                      }
                    >
                      <SkillLogo icon={icon} />
                      {skill.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
