import { PROFILE } from '@/lib/data'

export const GITHUB_PATH =
  'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
const LINKEDIN =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.92-2.063-2.063 0-1.141.92-2.063 2.063-2.063 1.141 0 2.062.922 2.062 2.063 0 1.143-.921 2.063-2.062 2.063zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'

const quietClass =
  'inline-flex items-center justify-center rounded-xl p-2.5 text-[var(--mute)] border border-transparent transition-all duration-300 hover:text-[var(--ink)] hover:scale-110 hover:border-[var(--line)] hover:bg-[var(--card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]'

const circleClass =
  'inline-flex items-center justify-center rounded-full border-2 border-[var(--ink)] text-[var(--ink)] w-16 h-16 md:w-20 md:h-20 transition-all duration-300 hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]'

// Icon-only, monochrome links (colour follows the theme), opening in a new tab.
// `circle` = large outlined round buttons (hero); default = small quiet icons.
export function SocialLinks({
  className = '',
  size = 20,
  variant = 'quiet',
}: {
  className?: string
  size?: number
  variant?: 'quiet' | 'circle'
}) {
  const linkClass = variant === 'circle' ? circleClass : quietClass
  return (
    <div className={`flex items-center ${variant === 'circle' ? 'gap-5 md:gap-7' : 'gap-1'} ${className}`}>
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
        className={linkClass}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d={GITHUB_PATH} />
        </svg>
      </a>
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
        className={linkClass}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d={LINKEDIN} />
        </svg>
      </a>
      <a
        href={`mailto:${PROFILE.email}`}
        aria-label="Email"
        title="Email"
        className={linkClass}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>
    </div>
  )
}
