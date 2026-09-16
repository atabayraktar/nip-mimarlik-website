import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const ICONS = {
  design: (
    <svg viewBox="73.8 15.3 1126.2 1126.2" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M689.8 167.2 l-0.3,39.3 l-228.2,0.3 l-228.3,0.2 l0,305 c0,167.8,0,352.6,0,410.7 l0,105.8 l404,0.3 l404,0.2 l0,-411 l0,-411 l-86,0 l-86,0 l-0.2,-39.3 l-0.3,-39.2 l-7.2,-0.3 l-7.3,-0.3 l-0.2,39.3 l-0.3,39.3 l-74.2,0.3 l-74.3,0.2 l-0.2,-39.2 l-0.3,-39.3 l-7.2,-0.3 l-7.3,-0.3 l-0.2,39.3 Z m0.2 99.3 l0,45.6 l7.3,-0.3 l7.2,-0.3 l0.3,-45.3 l0.2,-45.2 l74.5,0 l74.5,0 l0,45.5 l0,45.5 l6.9,0 l6.8,0 l0.7,-7.5 c0.4,-4.1,0.6,-21.1,0.6,-37.7 c0,-16.7,-0.1,-33.8,0,-38.1 l0,-7.7 l78.5,0 l78.5,0 l0,281.5 l0,281.5 l-144.5,0 l-144.5,0 l0,115 l0,115 l-70,0 l-70,0 l0,-186 l0,-186 l-174.5,0 l-174.5,0 l0,-210.5 l0,-210.5 l221,0 l221,0 l0,45.5 Z m-107.3 568.7 l0.3,178.8 l-120.8,0.2 c-66.4,0.2,-141.7,0.2,-167.4,0 l-46.8,-0.2 l0,-179 l0,-179 l167.3,0.2 l167.2,0.3 l0.2,178.7 Z m443.1 71 l0.2,107.8 l-136.5,0 c-75.1,0,-136.8,0,-137.2,0 c-0.9,0,-1.6,-212.7,-0.8,-214.8 c0.3,-1,28.3,-1.2,137.2,-1 l136.8,0.3 l0.3,107.7 Z"
      />
    </svg>
  ),
  interior: (
    <svg viewBox="216.8 88.9 911.1 911.1" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M617.5 269.1 c-24.7,6.4,-54.3,14.2,-65.7,17.1 l-20.8,5.3 l0,12.7 l0,12.8 l-45.7,0.2 c-25.2,0,-46.5,0.1,-47.3,0.2 c-1.3,0.1,-1.5,3.6,-1.8,23.9 l-0.2,23.7 l-63.4,0 l-63.3,0 l-0.7,3.1 c-0.7,3.9,-0.8,27.2,0,29.2 c0.4,1.2,9.2,1.4,61.7,1.1 c33.7,-0.1,62.2,0,63.5,0.3 l2.2,0.5 l0,22.9 l0,22.9 l47.5,0 l47.4,0 l0.3,12.7 l0.3,12.7 l3,0.8 c1.7,0.4,31.8,7.6,67,15.9 l64,15 l74.5,-0.2 l74.5,-0.2 l-0.3,3.4 c-0.4,4.8,-4.3,32.4,-10.1,72.4 c-2.8,18.7,-6.8,46.6,-9.1,61.9 c-2.2,15.3,-4.3,28.3,-4.6,28.7 c-0.3,0.5,-13.1,0.9,-28.4,0.9 l-27.9,0 l-0.3,14.2 l-0.3,14.3 l-19.2,0.3 l-19.3,0.2 l0,67 l0,67 l156,0 l156,0 l-0.2,-81.8 l-0.3,-81.7 l-23.2,-0.3 l-23.3,-0.2 l0,-83.5 l0,-83.5 l38.5,0 l38.5,0 l0,-122 l0,-122 l-187.2,0.1 l-187.3,0.1 l-45,11.9 Z m389.5 110.2 l-0.1,90.4 l-155.1,0.7 c-85.3,0.4,-155.2,0.5,-155.4,0.3 c-0.2,-0.2,-0.6,-160.5,-0.4,-179 l0,-2.7 l155.5,0 l155.5,0 l0,90.3 Z m-343 0.7 c0,49.5,-0.3,90,-0.6,90 c-0.3,0,-8.9,-2,-19.2,-4.4 c-10.3,-2.5,-33.3,-7.9,-51.2,-12.1 c-17.9,-4.2,-33.3,-7.8,-34.3,-8.1 c-1.6,-0.5,-1.7,-4.2,-1.5,-64.7 l0.3,-64.1 l46.5,-11.8 c58.9,-15,57.3,-14.6,58.8,-14.7 c0.9,-0.1,1.2,18.5,1.2,89.9 Z m-133 1 l0,35 l-33,0 l-33,0 l0,-34.4 c0,-26.6,0.3,-34.5,1.3,-34.9 c0.6,-0.3,15.5,-0.6,33,-0.6 l31.7,-0.1 l0,35 Z m398.1 203.3 c0.1,45.6,-0.1,83.1,-0.4,83.3 c-0.8,0.8,-107.7,1,-107.7,0.2 c0,-0.4,1.6,-11,3.5,-23.5 c5.4,-34.8,8.9,-58.2,15,-99.8 c3,-20.9,5.8,-39.2,6.1,-40.8 l0.6,-2.7 l41.4,0.2 l41.5,0.3 l0,82.8 Z m47.9 165.7 l0,53 l-126,0 l-126,0 l0,-39 l0,-39 l17.5,0 l17.5,0 l0,-13.3 c0,-7.4,0.3,-13.7,0.7,-14 c0.3,-0.4,49.2,-0.7,108.5,-0.7 l107.8,0 l0,53 Z"
      />
    </svg>
  ),
  consulting: (
    <svg viewBox="322.5 110.8 831.2 831.2" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M612 234.5 l0,40.5 l-70.5,0 l-70.5,0 l0,292 l0,292 l267.3,-0.2 l267.2,-0.3 l0,-291.5 l0,-291.5 l-70.2,-0.3 l-70.3,-0.2 l-0.2,-40.3 l-0.3,-40.2 l-126.2,-0.3 l-126.3,-0.2 l0,40.5 Z m213 20 l0,20.5 l-86.5,0 l-86.5,0 l0,-20.5 l0,-20.5 l86.5,0 l86.5,0 l0,20.5 Z m135.8 59.5 l4.2,0 l0,253.5 l0,253.5 l-227,0 l-227,0 l0,-253.3 c0,-139.4,0.2,-253.6,0.4,-253.8 c0.3,-0.3,219.7,-0.3,449.4,0.1 Z M776 520.5 c-42.6,42.6,-77.9,77.5,-78.3,77.5 c-0.5,0,-17.2,-16.5,-37.2,-36.8 l-36.3,-36.7 l-13.4,13 c-7.3,7.1,-13.4,13.3,-13.6,13.7 c-0.2,0.4,12.4,13.7,28.1,29.5 c15.6,15.9,38.1,38.7,50,50.8 l21.6,22 l92,-92 l92.1,-92 l-13.2,-13.2 c-7.3,-7.3,-13.5,-13.3,-13.8,-13.3 c-0.3,0,-35.4,34.9,-78,77.5 Z"
      />
    </svg>
  ),
  contracting: (
    <svg viewBox="249.9 434.8 569.9 569.9" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M394.3 502.8 l-87.3,0.2 l0,14.5 l0,14.5 l54.5,0 l54.5,0 l0,188 l0,188 l-46,0 l-46,0 l0,14.5 l0,14.5 l147.5,0 l147.5,0 l0,-14.5 l0,-14.5 l-87,0 l-87,0 l0,-188 l0,-188 l103.5,0 l103.5,0 l0,54.5 l0,54.5 l14.5,0 l14.5,0 l0,-54.5 l0,-54.5 l41,0 l41.1,0 l-0.3,-14.5 l-0.3,-14.5 l-140.5,-0.3 c-77.3,-0.1,-179.8,-0.1,-227.7,0.1 Z"
      />
    </svg>
  ),
  commitment: (
    <svg viewBox="-7.7 149.8 1021.8 1021.8" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M494 253.6 c-37.6,5.4,-74.3,26.6,-98.6,56.8 c-31.9,39.7,-43.3,89,-31.5,135.8 c11.5,45.5,40.1,81.2,81.6,101.7 c11.3,5.6,26.3,11,34.8,12.6 l3.7,0.7 l0,122.9 l0,122.9 l-74,0 l-74,0 l0,27.5 l0,27.5 l74,0 l74,0 l0,36 l0,36 l-74,0 l-74,0 l0,27.5 l0,27.5 l74,0 l74,0 l0.2,40.3 l0.3,40.2 l28.5,-0.2 l28.5,-0.3 l0.3,-253.9 l0.2,-253.9 l4.3,-0.7 c7.5,-1.3,27.3,-8.2,36.9,-13 c31.3,-15.7,55.4,-39.8,70.7,-70.8 c17.3,-35,21.2,-68.7,12,-105.1 c-7.4,-29.4,-21.6,-55.3,-41.4,-75.1 c-15.2,-15.2,-30.5,-25.6,-49.4,-33.6 c-9.1,-3.8,-27.3,-8.5,-38.1,-9.9 c-11.3,-1.4,-31.3,-1.1,-43,0.6 Z m33.5 51.5 c35.6,4.4,64.1,25.2,79.5,58.3 c8.2,17.3,11.6,39.2,9.1,57.1 c-1.5,10.5,-7.6,28.4,-13,37.7 c-14.3,24.9,-41,44.6,-68.2,50.2 c-51.6,10.5,-98.7,-15.8,-116.1,-64.9 c-4.1,-11.4,-5.3,-19.8,-5.2,-35.5 c0.1,-12.5,0.5,-15.9,2.8,-24.5 c11.6,-42.8,46,-73.5,87.7,-78.4 c10.7,-1.2,13.4,-1.2,23.4,0 Z"
      />
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
