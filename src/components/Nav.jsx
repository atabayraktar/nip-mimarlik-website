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

// Hizmetler + İletişim sit side by side starting at this width (see
// .hizmet-iletisim in index.scss) — merge their nav entries into one item
// from that point on, independent of the nav's own 1024px mobile/desktop
// breakpoint. The height clause keeps this a tablet/desktop-only merge: a
// phone rotated to landscape can clear 900px of width too (e.g. ~926px on
// many phones) while staying short (~375–430px), and should still behave
// like normal portrait mobile — separate nav items — not the desktop merge.
const SECTIONS_SIDE_BY_SIDE_QUERY = '(min-width: 900px) and (min-height: 500px)'

export default function Nav() {
  const [theme, setTheme] = useState('ink')
  const [activeSection, setActiveSection] = useState(null)
  const [open, setOpen] = useState(false)
  const [sectionsSideBySide, setSectionsSideBySide] = useState(false)
  const [burgerHover, setBurgerHover] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const burgerRef = useRef(null)
  const pathRef = useRef(null)
  const phaseRef = useRef(0)
  const rafRef = useRef(null)
  const pendingScrollId = useRef(null)
  const router = useRouter()
  const { openMap, openSection } = useSectionsContext()

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  useEffect(() => {
    const mql = window.matchMedia(SECTIONS_SIDE_BY_SIDE_QUERY)
    const update = () => setSectionsSideBySide(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

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

  // Theme (ink/paper inversion) flips the instant a section's top edge
  // scrolls past the nav — the last one in document order that's crossed
  // that line — which is what makes the GAD-style colour inversion feel
  // snappy right at the boundary.
  //
  // The active nav link uses a different rule: whichever section's range
  // actually contains the reading line just below the nav. Plain "top has
  // crossed the line" would keep a short section (e.g. Hizmetler on
  // mobile) highlighted even once it's fully scrolled past and the next
  // section fills the screen instead. But comparing raw visible *area*
  // over-corrects the other way on tall viewports — right after landing
  // on a short section, whatever follows it can cover more pixels of the
  // remaining screen while the short section is still what's at the top.
  // Checking containment at one fixed point avoids both failure modes.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-theme]'))
    if (!sections.length) return

    let raf = null
    const update = () => {
      raf = null
      const navH = headerRef.current?.offsetHeight ?? 88
      const readingLine = navH + 1

      let current = sections[0]
      let atReadingLine = null

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= readingLine) {
          current = section
        }
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          atReadingLine = section
        }
      }

      const activeEl = atReadingLine ?? current

      setTheme(current.dataset.theme)
      setActiveSection((activeEl.id || current.id) ?? null)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [router.pathname])

  const navLinks = sectionsSideBySide
    ? LINKS.filter((link) => link.href !== '/#iletisim').map((link) =>
        link.href === '/#hizmetler'
          ? { ...link, label: 'Hizmetler ve İletişim', combinedWith: ['hizmetler', 'iletisim'] }
          : link
      )
    : LINKS

  const onDark = theme === 'ink' || theme === 'graphite'
  const logoSrc = onDark ? '/images/logos/nip-logos/nip-light.webp' : '/images/logos/nip-logos/nip-dark.webp'
  const overHero = activeSection === 'hero'

  const handleLogoClick = (e) => {
    if (router.pathname !== '/') return
    e.preventDefault()
    scrollToTop()
  }

  const goToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const wasClosed = openMap[id] === false
    openSection(id)
    if (wasClosed) {
      setTimeout(() => scrollToElement(el, { immediate: false }), SECTION_OPEN_DELAY)
    } else {
      scrollToElement(el, { immediate: false })
    }
  }

  // Section links never actually navigate to a "/#id" URL — same-page clicks
  // just scroll, and clicks from another page (e.g. /idil) push the plain
  // "/" route and scroll once it lands, so the address bar never picks up a
  // hash the active-link state would then have to track. Since a same-page
  // click no longer changes router.asPath, close the mobile menu explicitly
  // here instead of relying on the asPath-watcher effect above.
  const handleSectionLinkClick = (e, href) => {
    if (!href.startsWith('/#')) return
    e.preventDefault()
    const id = href.slice(2)
    setOpen(false)

    if (router.pathname === '/') {
      goToSection(id)
    } else {
      pendingScrollId.current = id
      router.push('/')
    }
  }

  useEffect(() => {
    if (router.pathname !== '/' || !pendingScrollId.current) return
    const id = pendingScrollId.current
    pendingScrollId.current = null
    // Give the freshly-mounted homepage a beat to lay out before measuring it.
    const timer = setTimeout(() => goToSection(id), 60)
    return () => clearTimeout(timer)
  }, [router.pathname])

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
          {navLinks.map((link) => {
            const isActive =
              link.href === '/idil'
                ? router.pathname === '/idil'
                : router.pathname === '/' &&
                  (link.combinedWith
                    ? link.combinedWith.includes(activeSection)
                    : activeSection === link.href.slice(2))

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav__bar-link ${isActive ? 'nav__bar-link--active' : ''}`}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => handleSectionLinkClick(e, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
