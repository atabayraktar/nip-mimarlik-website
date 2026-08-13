import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { scrollToTop, scrollToElement } from '../lib/lenis'
import { useSectionsContext } from '../lib/sections'
import { burgerDAtPhase, easeSpring } from '../lib/burgerMorph'

const SECTION_OPEN_DELAY = 420
const INITIAL_D = burgerDAtPhase(0)

const LINKS = [
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#projeler', label: 'Projeler' },
  { href: '/#hizmetler', label: 'Hizmetler' },
  { href: '/#iletisim', label: 'İletişim' },
  { href: '/idil', label: 'İdil Hakkımda' },
]

export default function Nav() {
  const [theme, setTheme] = useState('ink')
  const [activeSection, setActiveSection] = useState(null)
  const [open, setOpen] = useState(false)
  const [burgerHover, setBurgerHover] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const burgerRef = useRef(null)
  const pathRef = useRef(null)
  const phaseRef = useRef(0)
  const rafRef = useRef(null)
  const router = useRouter()
  const { openMap, openSection } = useSectionsContext()

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  useEffect(() => {
    const targetPhase = open ? 2 : burgerHover ? 1 : 0
    const fromPhase = phaseRef.current
    if (fromPhase === targetPhase) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const distance = Math.abs(targetPhase - fromPhase)
    const duration = reduceMotion ? 0 : distance * 280
    let startTime = null

    const tick = (now) => {
      if (startTime === null) startTime = now
      const t = duration === 0 ? 1 : Math.min(1, (now - startTime) / duration)
      const eased = easeSpring(t)
      const phase = fromPhase + (targetPhase - fromPhase) * eased
      phaseRef.current = phase
      const { d, fillRule } = burgerDAtPhase(phase)
      pathRef.current?.setAttribute('d', d)
      pathRef.current?.setAttribute('fill-rule', fillRule)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [open, burgerHover])

  useEffect(() => {
    if (!open) return
    const onClickAway = (e) => {
      if (barRef.current?.contains(e.target) || burgerRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickAway)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    let observer

    const setup = () => {
      if (observer) observer.disconnect()
      const navH = headerRef.current?.offsetHeight ?? 88
      const sections = Array.from(document.querySelectorAll('[data-theme]'))
      if (!sections.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTheme(entry.target.dataset.theme)
              setActiveSection(entry.target.id || null)
            }
          })
        },
        {
          rootMargin: `-${navH}px 0px -${Math.max(window.innerHeight - navH - 2, 0)}px 0px`,
          threshold: 0,
        }
      )
      sections.forEach((s) => observer.observe(s))
    }

    setup()
    window.addEventListener('resize', setup)
    return () => {
      window.removeEventListener('resize', setup)
      observer?.disconnect()
    }
  }, [router.asPath])

  const onDark = theme === 'ink' || theme === 'graphite'
  const logoSrc = onDark ? '/logos/nip-logos/nip-light.webp' : '/logos/nip-logos/nip-dark.webp'
  const overHero = activeSection === 'hero'

  const handleLogoClick = (e) => {
    if (router.pathname !== '/') return
    e.preventDefault()
    scrollToTop()
  }

  const handleSectionLinkClick = (e, href) => {
    if (router.pathname !== '/' || !href.startsWith('/#')) return
    const id = href.slice(2)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const wasClosed = openMap[id] === false
    openSection(id)
    if (wasClosed) {
      setTimeout(() => scrollToElement(el, { immediate: false }), SECTION_OPEN_DELAY)
    } else {
      scrollToElement(el, { immediate: false })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`nav nav--${onDark ? 'dark' : 'light'} ${open ? 'nav--open' : ''}`}
    >
      <Link
        href="/"
        onClick={handleLogoClick}
        className={`nav__logo ${overHero ? 'nav__logo--hidden' : ''}`}
        aria-label="NİP Mimarlık — Anasayfa"
      >
        <img src={logoSrc} alt="NİP Mimarlık" />
      </Link>

      <button
        ref={burgerRef}
        type="button"
        className="nav__burger"
        aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={open}
        aria-controls="nav-bar"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setBurgerHover(true)}
        onMouseLeave={() => setBurgerHover(false)}
        onFocus={() => setBurgerHover(true)}
        onBlur={() => setBurgerHover(false)}
      >
        <svg className="nav__burger-mark" viewBox="0 0 810 270" aria-hidden="true">
          <path ref={pathRef} d={INITIAL_D.d} fill="currentColor" fillRule={INITIAL_D.fillRule} />
        </svg>
      </button>

      <div
        id="nav-bar"
        ref={barRef}
        className="nav__bar"
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <ul className="nav__bar-list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav__bar-link ${router.asPath === link.href ? 'nav__bar-link--active' : ''}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => handleSectionLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
