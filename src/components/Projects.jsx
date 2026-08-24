import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'
import { scrollToElement } from '../lib/lenis'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'mimari', label: 'Mimari Projeler' },
  { key: 'ic-mekan', label: 'İç Mekan Projeleri' },
  { key: 'mutahitlik', label: 'Mütahitlik Projeleri' },
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
    id: 3,
    name: 'Sade Projesi',
    category: 'mutahitlik',
    categoryLabel: 'Mütahitlik Projeleri',
    location: 'Çanakkale, Dardanos',
    client: 'Müteahhitliğini yaptığımız proje',
    typology: 'Villa Sitesi',
    size: '630 m²',
    status: 'Ruhsatlandırıldı · İnşa Edildi',
    icon: '/images/logos/project-logos/project-03.webp',
    images: projectImages('Sade'),
    description:
      'Sade, fazlalıklardan arınmış bir düşüncenin mekâna dönüşmüş hâli. Mimari yaklaşımımız hiçbir zaman dayatmak ya da sınırlandırmak olmadı; yalnızca bulunduğu yere ait, sade ama özenle düşünülmüş bir anlayışı temsil ediyoruz. Sade Projesi, Çanakkale’nin Dardanos mevkiinde abartıdan uzak, ferah ve sade yaşam alanlarını kullanıcılarına sunuyor.',
  },
  {
    id: 5,
    name: 'P Evi',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan Projeleri',
    location: 'Çanakkale, Kepez',
    client: 'Özel Müşteri',
    typology: 'Salon Tasarımı',
    size: '60 m²',
    status: 'Tasarlandı · İmalatı Yapıldı',
    icon: '/images/logos/project-logos/project-05.webp',
    images: projectImages('P+Evi'),
    description:
      'Nip Ofisi’nde tasarlanan P Evi salonu, zamansızlık ilkesini benimserken doğayı betimleyen renk paletiyle sakin ve olgunlaşmış bir yaşamı temsil ediyor. Yalın tasarım dili ve doğal tonların birlikteliği, kullanıcılarına konforlu ve sade bir yaşam alanı sunuyor.',
  },
  {
    id: 2,
    name: 'Sasa Evi',
    category: 'mimari',
    categoryLabel: 'Mimari Projeler',
    location: 'Çanakkale, Yukarıinova',
    client: 'Özel Müşteri',
    typology: 'Villa Projesi',
    size: '130 m²',
    status: 'Ruhsatlandırıldı',
    icon: '/images/logos/project-logos/project-02.webp',
    images: projectImages('Sasa+Evi'),
    description:
      'Çanakkale’nin Yukarıinova Köyü’nde, dere kenarında ve ormanla iç içe bir alanda yer alan Sasa Evi, ana tasarım kararı olarak avlulu bir yapıya sahip. Formu sayesinde kendi dünyasını kuran ve mahremiyetini oluşturan yapı, doğanın spontane akışına karşı tanımlı duruşuyla kullanıcısının yaşantısını yansıtıyor.',
  },
  {
    id: 7,
    name: 'Ç Evi',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan Projeleri',
    location: 'Çanakkale, Dardanos',
    client: 'Özel Müşteri',
    typology: 'Salon Tasarımı',
    size: '50 m²',
    status: 'Tasarlandı · İmalatı Yapıldı',
    icon: '/images/logos/project-logos/project-07.webp',
    images: projectImages('Ç+Evi'),
    description:
      'Nip Ofisi’nde yeniden yorumlanan Ç Evi salonu, kelimelerden çok deneyimle ifade kazanan bir tasarıma sahip. Farklı dokular, katmanlar arasındaki çeşitlilik ve kontrollü bir kaos içinde kurulan bütüncül uyum, mekânın tasarım dilini oluşturuyor.',
  },
  {
    id: 1,
    name: 'Sea Evi',
    category: 'mimari',
    categoryLabel: 'Mimari Projeler',
    location: 'Çanakkale, Yukarıinova',
    client: 'Özel Müşteri',
    typology: 'Villa Projesi',
    size: '130 m²',
    status: 'Ruhsatlandırıldı',
    icon: '/images/logos/project-logos/project-01.webp',
    images: projectImages('Sea+Evi'),
    description:
      'Çanakkale’nin Yukarıinova Köyü’nde özgürlüğünü ilan eden bir yapı. Sınırları içinde, sınırsızlığı çizmek isteyen bir proje Sea Evi. Mümkün olan her noktasında doğaya açılan hatta kucaklayan bir duruş sergilemekte.',
  },
  {
    id: 6,
    name: 'XE Projesi',
    category: 'mimari',
    categoryLabel: 'Mimari Projeler',
    location: 'Çanakkale, Kepez',
    client: 'Müteahhit Firma',
    typology: 'İkiz Villa Projesi',
    size: '220 m²',
    status: 'Ruhsatlandırıldı',
    icon: '/images/logos/project-logos/project-06.webp',
    images: projectImages('XE+Projesi'),
    description:
      'Çanakkale’nin Kepez bölgesinde yer alan XE projesi, müteahhit firma için projelendirildi. Kullanıcı ihtiyaçlarının ön planda tutulduğu projede, geniş ve işlevsel mekân kullanımlarıyla konforlu bir yaşam kurgusu oluşturuldu.',
  },
  {
    id: 4,
    name: 'Var Evi',
    category: 'mimari',
    categoryLabel: 'Mimari Projeler',
    location: 'Çanakkale, Çınarlı',
    client: 'Özel Müşteri',
    typology: 'Villa Projesi',
    size: '200 m²',
    status: 'Konsept Tasarımı Yapıldı',
    icon: '/images/logos/project-logos/project-04.webp',
    images: projectImages('Var+Evi'),
    description:
      'Çevre insana göre şekillendi; şimdi ise insanların yaşam alanları parsellerin sınırlarına göre şekillenmekte. Biz de ofisimizde tasarım yaparken bu sınırlara bağlı kalmak zorunda olsak da kullanıcının var olma biçimine özgü tasarımlar yapıyoruz. Var Evi, Çanakkale’nin Çınarlı mevkiinde yer alan bir parselin tanımsızlığı içinde kendini var eden; kütlesel hareketlerle mekânları tanımlamayı ve bunu olabildiğince esnek bir şekilde kullanıcıyla buluşturmayı amaçlayan bir proje.',
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
  const centerSettleRAF = useRef(null)

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  const openProject = (id) => {
    if (openId != null) return
    const node = mediaRefs.current[id]
    pendingFlip.current = {
      id,
      firstRect: node ? node.getBoundingClientRect() : null,
      firstScrollY: window.scrollY,
    }
    setActiveIndex(0)
    setOpenId(id)
  }

  const closeProject = (id) => {
    const node = mediaRefs.current[id]
    pendingFlip.current = {
      id,
      firstRect: node ? node.getBoundingClientRect() : null,
      firstScrollY: window.scrollY,
    }
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
      const isOpening = openId === flip.id

      const idealTopGap = () => {
        // Opening: centre the card in the full viewport — equal breathing
        // room from the very top edge to the very bottom edge — but never
        // let its top tuck under the fixed nav when the panel is taller
        // than the viewport allows for true centering.
        const centerGap = (window.innerHeight - cardNode.offsetHeight) / 2
        return Math.max(navH + 24, centerGap)
      }

      const centerScroll = () => scrollToElement(cardNode, { offset: -idealTopGap() })

      cancelAnimationFrame(centerSettleRAF.current)
      centerSettleRAF.current = null

      if (isOpening) {
        centerScroll()
        // A sibling section's own open/collapse transition (or a late
        // font/content reflow above the grid) can still nudge the card's
        // document position for a moment after this first measurement —
        // keep correcting the scroll for a short settle window so the gap
        // stays symmetric instead of freezing on a stale position.
        const settleUntil = performance.now() + 500
        const tick = () => {
          if (cardRefs.current[flip.id] !== cardNode || !document.body.contains(cardNode)) return
          if (Math.abs(cardNode.getBoundingClientRect().top - idealTopGap()) > 1) {
            centerScroll()
          }
          if (performance.now() < settleUntil) {
            centerSettleRAF.current = requestAnimationFrame(tick)
          }
        }
        centerSettleRAF.current = requestAnimationFrame(tick)
      } else {
        scrollToElement(cardNode, { offset: -(navH + 24) })
      }
    }

    if (!flip.firstRect) return

    const node = mediaRefs.current[flip.id]
    if (!node) return

    const lastRect = node.getBoundingClientRect()
    // Opening also scrolls the page (to centre the card under the nav), so
    // firstRect and lastRect were captured at two different scroll
    // positions — compare them in document-absolute space, not viewport-
    // relative, or the scroll delta bleeds into the FLIP transform as a
    // spurious vertical offset.
    const dx = flip.firstRect.left - lastRect.left
    const dy = flip.firstRect.top + flip.firstScrollY - (lastRect.top + window.scrollY)
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
        {openId == null && (
          <div className="projects__head">
            <SectionToggle id="projeler" label="Projeler" />
          </div>
        )}

        <Collapse id="projeler" open={sectionOpen}>
          {openId == null && (
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
          )}

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
