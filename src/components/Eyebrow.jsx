// Static resting frame of the nav burger's key/"anahtar" mark, reused here
// as the icon in front of every eyebrow / structural label across the site.
export const ANAHTAR_ICON = (
  <svg viewBox="0 0 810 270" aria-hidden="true">
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M0,0 L810,0 L810,270 L540,270 L540,90 L180,90 L180,180 L270,180 L270,270 L0,270 L0,180 L90,180 L90,90 L0,90 Z M630,90 L720,90 L720,180 L630,180 Z"
    />
  </svg>
)

export default function Eyebrow({ as: Tag = 'span', id, className = '', children }) {
  return (
    <Tag id={id} className={`eyebrow eyebrow--mark ${className}`.trim()}>
      <span className="eyebrow__mark" aria-hidden="true">
        {ANAHTAR_ICON}
      </span>
      {children}
    </Tag>
  )
}
