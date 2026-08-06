export default function Collapse({ id, open, className = '', children }) {
  return (
    <div className={`collapse ${className}`.trim()} data-open={open}>
      <div className="collapse__inner" id={`${id}-panel`} role="region" aria-hidden={!open}>
        {children}
      </div>
    </div>
  )
}
