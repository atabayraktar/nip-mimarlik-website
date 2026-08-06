import { useSection } from '../lib/sections'

export default function SectionToggle({ id, label, className = '' }) {
  const [isOpen, toggle] = useSection(id)

  return (
    <button
      type="button"
      className={`eyebrow eyebrow--toggle ${className}`.trim()}
      aria-expanded={isOpen}
      aria-controls={`${id}-panel`}
      onClick={toggle}
    >
      <span className="eyebrow__icon" aria-hidden="true" />
      {label}
    </button>
  )
}
