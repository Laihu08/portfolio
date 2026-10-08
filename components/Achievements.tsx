import Image from 'next/image'
import { asset } from '@/lib/asset'
import { ACHIEVEMENTS, type AchievementEntry } from '@/lib/data'
import { Reveal } from './Reveal'
import { PatentIcon } from './PatentIcon'

function Logo({ logo, title }: Pick<AchievementEntry, 'logo' | 'title'>) {
  if (logo === 'patent') return <PatentIcon />
  return (
    <Image src={asset(logo)} alt={title} width={56} height={56} unoptimized className="h-14 w-14 object-contain" />
  )
}

// Same logo-first tile as Certifications.
export function Achievements() {
  return (
    <section id="achievements" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>Achievements</span>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {ACHIEVEMENTS.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <article className="flex h-full flex-col items-center rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-[var(--ink)]">
              <Logo logo={item.logo} title={item.title} />
              <p className="mt-5 text-[15px] font-normal leading-snug">{item.title}</p>
              <p className="mt-auto pt-4 text-xs text-[var(--mute)]">{item.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
