import Image from 'next/image'
import { asset } from '@/lib/asset'
import { siGooglecloud } from 'simple-icons'
import { CERTIFICATIONS, type CertificationEntry } from '@/lib/data'
import { Reveal } from './Reveal'

function Logo({ logo, issuer }: Pick<CertificationEntry, 'logo' | 'issuer'>) {
  if (logo === 'microsoft') {
    return (
      <svg viewBox="0 0 23 23" className="h-14 w-14" role="img" aria-label="Microsoft">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#7FBA00" d="M12 1h10v10H12z" />
        <path fill="#00A4EF" d="M1 12h10v10H1z" />
        <path fill="#FFB900" d="M12 12h10v10H12z" />
      </svg>
    )
  }
  if (logo === 'googlecloud') {
    return (
      <svg viewBox="0 0 24 24" className="h-14 w-14" role="img" aria-label="Google Cloud">
        <path fill={`#${siGooglecloud.hex}`} d={siGooglecloud.path} />
      </svg>
    )
  }
  return (
    <Image
      src={asset(logo)}
      alt={issuer}
      width={56}
      height={56}
      unoptimized
      className="h-14 w-14 rounded-xl object-contain"
    />
  )
}

// Logo-first tiles: the issuer's mark carries the card, with a short caption.
export function Certifications() {
  return (
    <section id="certifications" className="section">
      <Reveal className="reveal-mask mb-14">
        <div className="section-heading">
          <span>Certifications</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 50}>
            <article className="flex h-full flex-col items-center rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-[var(--ink)]">
              <Logo logo={cert.logo} issuer={cert.issuer} />
              <p className="mt-5 text-[15px] font-normal leading-snug">{cert.title}</p>
              <p className="mt-auto pt-4 text-xs text-[var(--mute)]">
                {cert.issuer} · {cert.date}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
