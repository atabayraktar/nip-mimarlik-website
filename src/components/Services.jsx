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
  contracting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V9l6-3v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20V4l6 2.5V20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 9h2M13 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  commitment: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h8l3 3v13H7V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 4v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 13.2l1.8 1.8 3.2-3.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  {
    icon: 'contracting',
    name: 'Müteahhitlik',
    copy: 'Kaba inşaattan teslim anahtarına, sahada uçtan uca yürütülen müteahhitlik ve inşaat yönetimi hizmeti.',
  },
  {
    icon: 'commitment',
    name: 'Taahhüt İşleri',
    copy: 'Sözleşme kapsamındaki imalat ve teslim süreçlerinin zamanında, eksiksiz tamamlanmasını güvence altına alan taahhüt yönetimi.',
  },
]

const LEFT = SERVICES.slice(0, 3)
const RIGHT = SERVICES.slice(3)

function ServiceRow({ s, delay }) {
  return (
    <li className="services__row" data-reveal data-reveal-delay={String(delay)}>
      <span className="services__icon">{ICONS[s.icon]}</span>
      <span className="services__text">
        <h3 className="services__name">{s.name}</h3>
        <p className="services__copy">{s.copy}</p>
      </span>
    </li>
  )
}

export default function Services() {
  const [isOpen] = useSection('hizmetler')

  return (
    <section id="hizmetler" data-theme="paper" className="services">
      <div className="services__head">
        <SectionToggle id="hizmetler" label="Hizmetler" />
      </div>

      <Collapse id="hizmetler" open={isOpen}>
        <div className="services__grid">
          <ul className="services__col services__col--left">
            {LEFT.map((s, i) => (
              <ServiceRow s={s} delay={i * 100} key={s.name} />
            ))}
          </ul>
          <ul className="services__col services__col--right">
            {RIGHT.map((s, i) => (
              <ServiceRow s={s} delay={(i + 3) * 100} key={s.name} />
            ))}
          </ul>
        </div>
      </Collapse>
    </section>
  )
}
