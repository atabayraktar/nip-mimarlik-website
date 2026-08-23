import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const ICONS = {
  design: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="4.4" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 5.9 7 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 5.9l4.3 11.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.3 17.2l2.7 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 20.4h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  interior: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7a2 2 0 0 1 2-2h3v16H6a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9.5 5h4v13.5h-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14.5 5h3.5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  consulting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 4.5v-.7A1.3 1.3 0 0 1 10.3 2.5h3.4A1.3 1.3 0 0 1 15 3.8v.7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.7 12.9l2.3 2.3 4.3-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  contracting: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 21V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 21h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 4h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 4v2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16 8.8V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  commitment: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7.2" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="7.2" r="1.1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 11.2V20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 15.4h2.6M12 18.1h2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'design',
    name: 'Mimari Proje',
    copy: 'Konsept tasarımdan ruhsatlandırma ve uygulama projelerine kadar, yapının tüm mimari süreçlerinin bütüncül bir yaklaşımla ele alınmasını kapsar.',
  },
  {
    icon: 'interior',
    name: 'İç Mekân ve Konsept Tasarımı',
    copy: 'Mevcut mekânın; işlev, malzeme, ışık ve doku bütünlüğü içinde, kullanıcı ihtiyaçları ve hedeflenen fonksiyon doğrultusunda yeniden tanımlanmasını kapsar.',
  },
  {
    icon: 'consulting',
    name: 'Proje Uygulama Danışmanlığı',
    copy: 'Mimari ruhsat ve uygulama projelerinin sahada doğru biçimde hayata geçirilmesi için yürütülen saha denetimi, uygulama takibi ve imalat süreci danışmanlığını kapsar.',
  },
  {
    icon: 'contracting',
    name: 'Müteahhitlik',
    copy: 'Arsaların kat karşılığı veya satın alma yoluyla değerlendirilerek projelendirilmesini ve tüm inşaat süreçlerinin tarafımızca yürütülmesini kapsar.',
  },
  {
    icon: 'commitment',
    name: 'Taahhüt İşleri',
    copy: 'Ofisimiz bünyesinde tasarlanan projelerin; müşteri talebi doğrultusunda yapı inşası veya iç mekân uygulamalarına ilişkin tüm süreçlerinin yürütülerek anahtar teslim tamamlanmasını kapsar.',
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
