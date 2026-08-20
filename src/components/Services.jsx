import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const ICONS = {
  design: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19h14L7 4v15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="9.8" cy="14.2" r="1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12V7.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 12h16v4.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 17.5v2M19 17.5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 5h9a1 1 0 0 1 1 1v13.5H6.5V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.7 5V4a1 1 0 0 1 1-1h2.6a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 13l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'design',
    name: 'Mimari Proje',
    copy: 'Konsept aşamasından uygulama projesine, mekânın karakterini tanımlayan bütüncül tasarım süreci.',
  },
  {
    icon: 'interior',
    name: 'İç Mekan Tasarımı',
    copy: 'Malzeme, ışık ve dokunun kullanım ihtiyacına göre dengelendiği özgün iç mekân kurguları.',
  },
  {
    icon: 'consulting',
    name: 'Proje Uygulama Danışmanlığı',
    copy: 'Tasarımın şantiyede doğru uygulanmasını takip eden saha denetimi ve süreç danışmanlığı.',
  },
]

export default function Services() {
  const [isOpen] = useSection('hizmetler')

  return (
    <section id="hizmetler" data-theme="paper" className="services">
      <div className="services__head">
        <SectionToggle id="hizmetler" label="Hizmetler" />
      </div>

      <Collapse id="hizmetler" open={isOpen}>
        <ul className="services__grid">
          {SERVICES.map((s, i) => (
            <li
              className="services__row"
              key={s.name}
              data-reveal
              data-reveal-delay={String(i * 100)}
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
    </section>
  )
}
