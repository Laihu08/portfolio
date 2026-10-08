// Patent-document icon (line style, follows the theme text colour).
export function PatentIcon({ className = 'h-14 w-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`text-[var(--ink)] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Patent"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4" />
      <path d="M14 2v6h6" />
      <path d="M14 2l6 6v3" />
      <path d="M8 13h4" />
      <path d="M8 17h2" />
      <circle cx="17" cy="16" r="3" />
      <path d="m15.5 18.7-.7 3.3 2.2-1.2 2.2 1.2-.7-3.3" />
    </svg>
  )
}
