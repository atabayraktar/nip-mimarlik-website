import TopoLines from './TopoLines'

const ICONS = {
  design: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M4 28 16 4l12 24" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9.5 17h13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="6" width="22" height="20" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 14h22M16 6v20" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  landscape: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M3 24 11 12l5 6 3-4 10 10" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 24h26" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  restoration: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M25 12a9 9 0 1 1-2.2-6.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M25 4v6h-6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M5 8h22v13H14l-5 5v-5H5z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  ),
  visualization: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4 27 10v12L16 28 5 22V10z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M16 4v24M5 10l11 6 11-6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'design',
    name: 'Mimari Tasarım',
    copy: 'Lorem ipsum dolor sit amet consectetur.',
  },
  {
    icon: 'interior',
    name: 'İç Mekan',
    copy: 'Sed do eiusmod tempor incididunt labore.',
  },
  {
    icon: 'landscape',
    name: 'Peyzaj / Topografya',
    copy: 'Ut enim ad minim veniam quis nostrud.',
  },
  {
    icon: 'restoration',
    name: 'Restorasyon',
    copy: 'Duis aute irure dolor in reprehenderit.',
  },
  {
    icon: 'consulting',
    name: 'Danışmanlık',
    copy: 'Excepteur sint occaecat cupidatat non.',
  },
  {
    icon: 'visualization',
    name: '3B Görselleştirme',
    copy: 'Proident sunt in culpa qui officia.',
  },
]

export default function Services() {
  return (
    <section id="hizmetler" data-theme="paper" className="services">
      <TopoLines tone="paper" seed={3} />
      <div className="container">
        <div className="services__head">
          <p className="eyebrow">Hizmetlerimiz</p>
        </div>

        <ul className="services__grid">
          {SERVICES.map((s, i) => (
            <li className="services__cell" key={s.name} data-reveal data-reveal-delay={String((i % 3) * 100)}>
              <span className="services__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="services__icon">{ICONS[s.icon]}</span>
              <h3 className="services__name">{s.name}</h3>
              <p className="services__copy">{s.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
