import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import TopoLines from './TopoLines'
import { scrollToElement, stopScroll, startScroll } from '../lib/lenis'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'ic-mekan', label: 'İç Mekan' },
  { key: 'dis-mekan', label: 'Dış Mekan' },
  { key: 'finanse', label: 'Finanse Edilenler' },
]

const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

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
    name: 'Proje 01',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Türkiye',
    year: '2024',
    client: 'Özel Müşteri',
    typology: 'Konut / Topografya',
    size: '240 m²',
    status: 'Tamamlandı',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=01',
    images: projectImages('Proje+01'),
  },
  {
    id: 2,
    name: 'Proje 02',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    location: 'Çanakkale, Türkiye',
    year: '2023',
    client: 'Özel Müşteri',
    typology: 'Atölye / İç Mekan',
    size: '180 m²',
    status: 'Tamamlandı',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=02',
    images: projectImages('Proje+02'),
  },
  {
    id: 3,
    name: 'Proje 03',
    category: 'finanse',
    categoryLabel: 'Finanse Edilenler',
    location: 'Çanakkale, Türkiye',
    year: '2025',
    client: 'Yatırımcı Grubu',
    typology: 'Karma Kullanım',
    size: '2.580 m²',
    status: 'Devam Ediyor',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=03',
    images: projectImages('Proje+03'),
  },
  {
    id: 4,
    name: 'Proje 04',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    location: 'Çanakkale, Türkiye',
    year: '2022',
    client: 'Kurumsal Müşteri',
    typology: 'Ofis / İç Mekan',
    size: '310 m²',
    status: 'Tamamlandı',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=04',
    images: projectImages('Proje+04'),
  },
  {
    id: 5,
    name: 'Proje 05',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    location: 'Çanakkale, Türkiye',
    year: '2025',
    client: 'Belediye',
    typology: 'Peyzaj / Topografya',
    size: '860 m²',
    status: 'Devam Ediyor',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=05',
    images: projectImages('Proje+05'),
  },
  {
    id: 6,
    name: 'Proje 06',
    category: 'finanse',
    categoryLabel: 'Finanse Edilenler',
    location: 'Çanakkale, Türkiye',
    year: '2026',
    client: 'Yatırımcı Grubu',
    typology: 'Konut Bloğu',
    size: '3.200 m²',
    status: 'Planlama',
    icon: 'https://placehold.co/64x64/0B0B0C/F3F2EE?text=06',
    images: projectImages('Proje+06'),
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

const ZOOM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.3 15.3 20 20M8 10.5h5M10.5 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function Swiper({ images, name, index, onIndexChange, zoomable, onZoom, className = '' }) {
  const trackRef = useRef(null)
  const programmatic = useRef(false)
  const programmaticTimer = useRef(null)

  // Keep the track's scroll position in sync with `index`, however it changed
  // (arrow click, dot, keyboard, or an external source like the lightbox).
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
            {zoomable ? (
              <button type="button" className="swiper__slide-btn" onClick={() => onZoom(i)} aria-label="Görseli büyüt">
                <img src={src} alt={`${name} — ${i + 1}`} loading="lazy" />
                <span className="swiper__zoom-hint">{ZOOM_ICON}</span>
              </button>
            ) : (
              <img src={src} alt={`${name} — ${i + 1}`} loading="lazy" />
            )}
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

function Lightbox({ project, index, onIndexChange, onClose }) {
  useEffect(() => {
    stopScroll()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndexChange(Math.min(project.images.length - 1, index + 1))
      if (e.key === 'ArrowLeft') onIndexChange(Math.max(0, index - 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      startScroll()
    }
  }, [onClose, index, onIndexChange, project.images.length])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} görselleri`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Kapat">
        {CLOSE_ICON}
      </button>
      <Swiper
        images={project.images}
        name={project.name}
        index={index}
        onIndexChange={onIndexChange}
        className="swiper--lightbox"
      />
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
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
    setLightboxOpen(false)
    setOpenId(null)
  }

  const selectFilter = (key) => {
    setLightboxOpen(false)
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

  const openProjectData = openId != null ? visible.find((p) => p.id === openId) : null

  return (
    <section id="projeler" data-theme="paper" className="projects">
      <TopoLines tone="paper" seed={4} />
      <div className="container">
        <div className="projects__head">
          <p className="eyebrow">Projeler</p>

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
                    zoomable
                    onZoom={(i) => {
                      setActiveIndex(i)
                      setLightboxOpen(true)
                    }}
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

                    <p className="projects__card-desc">{DESCRIPTION}</p>
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
      </div>

      {lightboxOpen && openProjectData && (
        <Lightbox
          project={openProjectData}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}
