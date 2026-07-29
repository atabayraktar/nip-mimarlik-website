import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { scrollToTop } from '../lib/lenis'
import TopoLines from './TopoLines'

const LINKS = [
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/#hizmetler', label: 'Hizmetler' },
  { href: '/#projeler', label: 'Projeler' },
  { href: '/#iletisim', label: 'İletişim' },
  { href: '/idil', label: 'İdil Hakkımda' },
]

export default function Nav() {
  const [theme, setTheme] = useState('ink')
  const [activeSection, setActiveSection] = useState(null)
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const barRef = useRef(null)
  const burgerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

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
  const logoSrc = onDark || open ? '/logos/nip_paper.png' : '/logos/nip_ink.png'
  const overHero = activeSection === 'hero'

  const handleLogoClick = (e) => {
    if (router.pathname !== '/') return
    e.preventDefault()
    scrollToTop()
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
      >
        <span />
        <span />
      </button>

      <div
        id="nav-bar"
        ref={barRef}
        className="nav__bar"
        aria-hidden={!open}
        {...(!open ? { inert: '' } : {})}
      >
        <div className="nav__bar-fill" aria-hidden="true">
          <TopoLines tone="ink" className="nav__bar-topo" parallax={false} seed={11} />
        </div>
        <ul className="nav__bar-list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav__bar-link ${router.asPath === link.href ? 'nav__bar-link--active' : ''}`}
                tabIndex={open ? 0 : -1}
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
