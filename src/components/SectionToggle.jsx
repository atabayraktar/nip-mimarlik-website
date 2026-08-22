import Eyebrow from './Eyebrow'

export default function SectionToggle({ id, label, className = '' }) {
  return (
    <Eyebrow as="span" id={`${id}-heading`} className={className}>
      {label}
    </Eyebrow>
  )
}
