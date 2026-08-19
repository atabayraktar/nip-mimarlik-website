import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'
import { scrollToElement } from '../lib/lenis'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'ic-mekan', label: 'İç Mekan' },
  { key: 'dis-mekan', label: 'Dış Mekan' },
  { key: 'finanse', label: 'Finanse Edilenler' },
]

function projectImages(label) {
  return [
    `https://placehold.co/1200x900/EAE9E3/8A8A85?text=${label}+—+1`,
    `https://placehold.co/1200x900/EAE9E3/8A8A85?text=${label}+—+2`,
    `https://placehold.co/1200x900/EAE9E3/8A8A85?text=${label}+—+3`,
  ]
}

const PROJECTS = [
  {
    id: 1,
    name: 'Sea Evi',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Yukarıinova Köyü',
    client: 'Özel Müşteri',
    typology: 'Villa',
    size: '130 m²',
    status: 'Ruhsatlandı',
    icon: '/images/logos/project-logos/proje-01.webp',
    images: projectImages('Sea+Evi'),
    description:
      'Çanakkale’nin Yukarıinova Köyü’nde özgürlüğünü ilan eden bir yapı. Sınırları içinde, sınırsızlığı çizmek isteyen bir proje Sea Evi. Mümkün olan her noktasında doğaya açılan hatta kucaklayan bir duruş sergilemekte.',
  },
  {
    id: 2,
    name: 'Sasa Evi',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Yukarıinova Köyü',
    client: 'Özel Müşteri',
    typology: 'Villa',
    size: '130 m²',
    status: 'Ruhsatlandı',
    icon: '/images/logos/project-logos/proje-02.webp',
    images: projectImages('Sasa+Evi'),
    description:
      'Çanakkale’nin Yukarıinova Köyü’nde, dere kenarında ve ormanla iç içe bir alanda yer alan Sasa Evi, ana tasarım kararı olarak avlulu bir yapıya sahip. Formu sayesinde kendi dünyasını kuran ve mahremiyetini oluşturan yapı, doğanın spontane akışına karşı tanımlı duruşuyla kullanıcısının yaşantısını yansıtıyor.',
  },
  {
    id: 3,
    name: 'Sade',
    category: 'finanse',
    categoryLabel: 'Finanse Edilenler',
    location: 'Çanakkale, Dardanos',
    client: 'Müteahhitliğini yaptığımız proje',
    typology: 'Villa Sitesi',
    size: '630 m²',
    status: 'Ruhsatlandı · İnşa Edildi',
    icon: '/images/logos/project-logos/proje-03.webp',
    images: projectImages('Sade'),
    description:
      'Sade, fazlalıklardan arınmış bir düşüncenin mekâna dönüşmüş hâli. Mimari yaklaşımımız hiçbir zaman dayatmak ya da sınırlandırmak olmadı; yalnızca bulunduğu yere ait, sade ama özenle düşünülmüş bir anlayışı temsil ediyoruz. Sade Projesi, Çanakkale’nin Dardanos mevkiinde abartıdan uzak, ferah ve sade yaşam alanlarını kullanıcılarına sunuyor.',
  },
  {
    id: 4,
    name: 'Var Evi',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Çınarlı',
    client: 'Özel Müşteri',
    typology: 'Villa',
    size: '200 m²',
    status: 'Konsept Tasarımı Yapıldı',
    icon: '/images/logos/project-logos/proje-04.webp',
    images: projectImages('Var+Evi'),
    description:
      'Çevre insana göre şekillendi; şimdi ise insanların yaşam alanları parsellerin sınırlarına göre şekillenmekte. Biz de ofisimizde tasarım yaparken bu sınırlara bağlı kalmak zorunda olsak da kullanıcının var olma biçimine özgü tasarımlar yapıyoruz. Var Evi, Çanakkale’nin Çınarlı mevkiinde yer alan bir parselin tanımsızlığı içinde kendini var eden; kütlesel hareketlerle mekânları tanımlamayı ve bunu olabildiğince esnek bir şekilde kullanıcıyla buluşturmayı amaçlayan bir proje.',
  },
  {
    id: 5,
    name: 'P Evi',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    location: 'Çanakkale, Çınarlı',
    client: 'Özel Müşteri',
    typology: 'Salon Tasarımı',
    size: '60 m²',
    status: 'Tamamlandı',
    icon: '/images/logos/project-logos/proje-05.webp',
    images: projectImages('P+Evi'),
    description:
      'Çevre insana göre şekillendi; şimdi ise insanların yaşam alanları parsellerin sınırlarına göre şekillenmekte. Biz de ofisimizde tasarım yaparken bu sınırlara bağlı kalmak zorunda olsak da kullanıcının var olma biçimine özgü tasarımlar yapıyoruz. P Evi, kütlesel hareketlerle mekânları tanımlamayı ve bunu olabildiğince esnek bir şekilde kullanıcıyla buluşturmayı amaçlayan bir salon tasarımı.',
  },
  {
    id: 6,
    name: 'Ky Evi',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Kepez',
    client: 'Özel Müşteri',
    typology: 'İkiz Villa',
    size: '—',
    status: 'Ruhsatlandı',
    icon: '/images/logos/project-logos/proje-06.webp',
    images: projectImages('Ky+Evi'),
    description:
      'Ky Evleri, Çanakkale’nin Kepez mevkiinde yer almakta; müteahhitleri için projelendirildi. Kullanıcısı için en fonksiyonel hâlde geniş oda kullanımları amaçlamış olan bir proje.',
  },
  {
    id: 7,
    name: 'St Evi',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    location: 'Çanakkale, Türkiye',
    client: 'Özel Müşteri',
    typology: 'Salon Tasarımı',
    size: '50 m²',
    status: 'Tasarlandı · İmalatı Yapıldı',
    icon: '/images/logos/project-logos/proje-07.webp',
    images: projectImages('St+Evi'),
    description:
      'Günün son dakikalarına şahitlik eden ve yoğun iş temposundan sonra bir dinlenme alanı, birlikte anlar yaratmayı sağlayan yaşam alanı olarak kullanılan salonda tasarım yeniliğine gidildi. Mermerin derin renkleri, ateşin sıcaklığı, yeşil ve kahve tonların birlikteliği; bütünde çeşitlilik, sonuçta ise uyum hedeflendi.',
  },
]

const CLOSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Swiper({ images, name, index, onIndexChange, className = '' }) {
  const trackRef = useRef(null)
  const programmatic = useRef(false)
  const programmaticTimer = useRef(null)

  // Keep the track's scroll position in sync with `index`, however it changed
  // (arrow click, dot, or keyboard).
  useEffect(() => {
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    const target = index * track.clientWidth
    if (Math.abs(track.scrollLeft - target) < 2) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    programmatic.current = true
    clearTimeout(programmaticTimer.current)
    track.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })
    programmaticTimer.current = setTimeout(() => {
      programmatic.current = false
    }, reduce ? 0 : 500)

    return () => clearTimeout(programmaticTimer.current)
  }, [index])

  const goTo = (next) => {
    onIndexChange(Math.min(images.length - 1, Math.max(0, next)))
  }

  const handleScroll = () => {
    if (programmatic.current) return
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    const next = Math.round(track.scrollLeft / track.clientWidth)
    if (next !== index) onIndexChange(next)
  }

  return (
    <div className={`swiper ${className}`}>
      <div className="swiper__track" ref={trackRef} onScroll={handleScroll}>
        {images.map((src, i) => (
          <div className="swiper__slide" key={src}>
            <img src={src} alt={`${name} — ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="swiper__arrow swiper__arrow--prev"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Önceki görsel"
          >
            {ARROW_ICON}
          </button>
          <button
            type="button"
            className="swiper__arrow swiper__arrow--next"
            onClick={() => goTo(index + 1)}
            disabled={index === images.length - 1}
            aria-label="Sonraki görsel"
          >
            {ARROW_ICON}
          </button>

          <div className="swiper__dots">
            {images.map((src, i) => (
              <span key={src} className={`swiper__dot ${i === index ? 'swiper__dot--active' : ''}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  const [sectionOpen] = useSection('projeler')
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mediaRefs = useRef({})
  const cardRefs = useRef({})
  const pendingFlip = useRef(null)

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  const openProject = (id) => {
    if (openId != null) return
    const node = mediaRefs.current[id]
    pendingFlip.current = { id, firstRect: node ? node.getBoundingClientRect() : null }
    setActiveIndex(0)
    setOpenId(id)
  }

  const closeProject = (id) => {
    const node = mediaRefs.current[id]
    pendingFlip.current = { id, firstRect: node ? node.getBoundingClientRect() : null }
    setOpenId(null)
  }

  const selectFilter = (key) => {
    setOpenId(null)
    setFilter(key)
  }

  useIsomorphicLayoutEffect(() => {
    const flip = pendingFlip.current
    pendingFlip.current = null
    if (!flip) return

    const cardNode = cardRefs.current[flip.id]
    if (cardNode) {
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 0
      scrollToElement(cardNode, { offset: -(navH + 24) })
    }

    if (!flip.firstRect) return

    const node = mediaRefs.current[flip.id]
    if (!node) return

    const lastRect = node.getBoundingClientRect()
    const dx = flip.firstRect.left - lastRect.left
    const dy = flip.firstRect.top - lastRect.top
    const sx = flip.firstRect.width / lastRect.width
    const sy = flip.firstRect.height / lastRect.height

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01)) {
      return
    }

    node.style.transition = 'none'
    node.style.transformOrigin = 'top left'
    node.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`

    requestAnimationFrame(() => {
      node.style.transition = 'transform 650ms cubic-bezier(0.76, 0, 0.24, 1)'
      node.style.transform = ''
    })

    const clear = (e) => {
      if (e.target !== node || e.propertyName !== 'transform') return
      node.style.transition = ''
      node.style.transformOrigin = ''
      node.removeEventListener('transitionend', clear)
    }
    node.addEventListener('transitionend', clear)
  }, [openId])

  return (
    <section id="projeler" data-theme="paper" className="projects">
      <div className="container">
        <div className="projects__head">
          <SectionToggle id="projeler" label="Projeler" />
        </div>

        <Collapse id="projeler" open={sectionOpen}>
          <div className="projects__filters" role="group" aria-label="Proje kategorisi filtrele">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`projects__filter ${filter === f.key ? 'projects__filter--active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => selectFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="projects__rows">
          {visible.map((p, i) => {
            const isOpen = openId === p.id
            const isHidden = openId != null && !isOpen
            const media = (
              <div
                className="projects__card-media"
                ref={(node) => {
                  mediaRefs.current[p.id] = node
                }}
              >
                {isOpen ? (
                  <Swiper
                    images={p.images}
                    name={p.name}
                    index={activeIndex}
                    onIndexChange={setActiveIndex}
                  />
                ) : (
                  <img src={p.images[0]} alt={`${p.name} — ${p.categoryLabel}`} loading="lazy" />
                )}
              </div>
            )

            return (
              <li
                className={`projects__card ${isOpen ? 'projects__card--open' : ''} ${isHidden ? 'projects__card--hidden' : ''}`}
                key={p.id}
                ref={(node) => {
                  cardRefs.current[p.id] = node
                }}
                data-reveal
                data-reveal-delay={String((i % 2) * 100)}
              >
                {isOpen ? (
                  <div className="projects__card-hero">
                    <button
                      type="button"
                      className="projects__card-close"
                      onClick={() => closeProject(p.id)}
                      aria-label="Kapat"
                    >
                      {CLOSE_ICON}
                    </button>

                    <div className="projects__card-meta">
                      <img className="projects__card-icon" src={p.icon} alt="" aria-hidden="true" />
                      <h3 className="projects__card-title">{p.name}</h3>
                      <span className="projects__card-loc">{p.location}</span>

                      <dl className="projects__card-facts">
                        <div>
                          <dt>Müşteri</dt>
                          <dd>{p.client}</dd>
                        </div>
                        <div>
                          <dt>Tipoloji</dt>
                          <dd>{p.typology}</dd>
                        </div>
                        <div>
                          <dt>Alan</dt>
                          <dd>{p.size}</dd>
                        </div>
                        <div>
                          <dt>Durum</dt>
                          <dd>{p.status}</dd>
                        </div>
                      </dl>
                    </div>

                    {media}

                    <p className="projects__card-desc">{p.description}</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="projects__card-hit"
                    aria-expanded={false}
                    tabIndex={isHidden ? -1 : 0}
                    onClick={() => openProject(p.id)}
                  >
                    <span className="projects__card-top">
                      <img className="projects__card-icon" src={p.icon} alt="" aria-hidden="true" />
                      <span className="projects__card-title">{p.name}</span>
                      <span className="projects__card-loc">{p.location}</span>
                    </span>

                    {media}
                  </button>
                )}
              </li>
            )
          })}
          </ul>
        </Collapse>
      </div>
    </section>
  )
}
