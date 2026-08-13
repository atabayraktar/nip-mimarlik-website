import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const ICONS = {
  design: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V10.5L12 4l8 6.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11h16M12 4v16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  landscape: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M3 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  ),
  restoration: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 3v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16v11H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 9h9M7.5 12.5h5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  visualization: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 12v9M4 7.5 12 12l8-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
  const [isOpen] = useSection('hizmetler')

  return (
    <section id="hizmetler" data-theme="paper" className="services">
      <div className="container">
        <div className="services__head">
          <SectionToggle id="hizmetler" label="Hizmetlerimiz" />
        </div>

        <Collapse id="hizmetler" open={isOpen}>
          <ul className="services__grid">
            {SERVICES.map((s, i) => (
              <li
                className="services__row"
                key={s.name}
                data-reveal
                data-reveal-delay={String(Math.floor(i / 2) * 100)}
              >
                <span className="services__icon">{ICONS[s.icon]}</span>
                <span className="services__text">
                  <h3 className="services__name">{s.name}</h3>
                  <p className="services__copy">{s.copy}</p>
                </span>
              </li>
            ))}
          </ul>
        </Collapse>
      </div>
    </section>
  )
}
