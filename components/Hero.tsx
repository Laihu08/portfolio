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
          <div key={stat.label} className="px-8 py-5 text-center sm:px-14">
            <dd
              className="flex items-center justify-center gap-3 text-4xl font-semibold tabular-nums sm:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
              {'icon' in stat && stat.icon === 'patent' && <PatentIcon className="h-9 w-9 sm:h-11 sm:w-11" />}
            </dd>
            <dt className="mt-1 text-sm text-[var(--mute)]">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
