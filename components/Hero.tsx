import { HERO_STATS, PROFILE } from '@/lib/data'
import { SocialLinks } from './SocialLinks'
import { CountUp } from './CountUp'
import { PatentIcon } from './PatentIcon'

// Opening screen: name, tagline, social buttons, and two numbers. Nothing else.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-[var(--gutter)] py-24"
    >
      <h1
        className="font-semibold tracking-tight text-[var(--ink)] leading-[1.02]"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 8vw, 112px)' }}
      >
        {PROFILE.name}
      </h1>
      <p className="mt-6 text-xl md:text-3xl font-light text-[var(--mute)]">{PROFILE.role}</p>
      <SocialLinks variant="circle" size={30} className="mt-14" />

      <dl className="mt-16 flex items-stretch justify-center divide-x divide-[var(--line)] border-y border-[var(--line)]">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className={`relative flex flex-col justify-center px-3 py-5 text-center sm:px-12${'href' in stat ? ' group' : ''}`}>
            <dd
              className="flex items-center justify-center gap-2 text-3xl font-semibold tabular-nums sm:gap-3 sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
              {'icon' in stat && stat.icon === 'patent' && <PatentIcon className="h-7 w-7 sm:h-11 sm:w-11" />}
            </dd>
            <dt className="mt-1 text-xs text-[var(--mute)] sm:text-sm">
              {'href' in stat && stat.href ? (
                <a
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-4 group-hover:text-[var(--ink)] after:absolute after:inset-0"
                >
                  {stat.label} ↗
                </a>
              ) : (
                stat.label
              )}
            </dt>
            {'sub' in stat && stat.sub && (
              <div className="mt-3 flex items-start justify-center divide-x divide-[var(--line)] border-t border-[var(--line)] pt-3">
                {stat.sub.map((s) => (
                  <a
                    key={s.label}
                    href="#open-source"
                    className="relative z-10 px-2 text-center group/sub sm:px-4"
                  >
                    <span className="block text-xl font-semibold tabular-nums sm:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      {s.value}
                    </span>
                    <span className="block text-xs text-[var(--mute)] underline decoration-dotted underline-offset-4 group-hover/sub:text-[var(--ink)]">
                      {s.label} ↓
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}
