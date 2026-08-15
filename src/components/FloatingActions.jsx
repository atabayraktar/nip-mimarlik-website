import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { scrollToTop } from '../lib/lenis'
import ContactFormModal from './ContactFormModal'

const WHATSAPP_NUMBER = '905316562909'

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.5a8.5 8.5 0 0 0-7.35 12.77L3.5 20.5l4.36-1.14A8.5 8.5 0 1 0 12 3.5Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 8.9c.2-.4.4-.4.6-.4h.4c.15 0 .3 0 .45.35.17.4.55 1.35.6 1.45.06.1.1.24 0 .38-.08.15-.12.24-.24.37-.12.14-.25.28-.36.38-.12.11-.24.23-.1.47.13.24.6 1 1.28 1.6.88.79 1.6 1.03 1.85 1.15.24.11.38.1.52-.06.16-.16.63-.72.8-.97.15-.24.31-.2.53-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14-.2.56-1.16 1.02-1.6 1.06-.43.05-.83.2-2.8-.6-2.38-.98-3.89-3.42-4.01-3.59-.12-.16-.96-1.28-.96-2.44 0-1.16.6-1.72.82-1.96Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CONTACT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="3.5" width="14" height="17" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7.3 8h7.4M7.3 11.4h7.4M7.3 14.8h4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path
      d="M15.6 17.6l3.8-3.8a1.15 1.15 0 0 1 1.6 1.6l-3.8 3.8-2.1.5.5-2.1Z"
      stroke="currentColor"
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </svg>
)

const ARROW_UP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 19V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path
      d="M6 11l6-6 6 6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [stackOffset, setStackOffset] = useState(null)
  const [scrollTopOffset, setScrollTopOffset] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [theme, setTheme] = useState('ink')
  const router = useRouter()

  useEffect(() => {
    let observer

    const setup = () => {
      if (observer) observer.disconnect()
      const sections = Array.from(document.querySelectorAll('[data-theme]'))
      if (!sections.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setTheme(entry.target.dataset.theme)
          })
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
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

  useEffect(() => {
    let footer = null
    let raf = null

    const compute = () => {
      raf = null
      if (!footer) return
      const rect = footer.getBoundingClientRect()
      const gap = window.innerWidth >= 1024 ? 48 : 24
      const overlap = window.innerHeight - rect.top
      const offset = overlap > 0 ? overlap + gap : null

      setStackOffset(offset)
      setScrollTopOffset(offset)
      setShowScrollTop(overlap > 0)
    }

    const onScroll = () => {
      if (raf != null) return
      raf = requestAnimationFrame(compute)
    }

    const mountRaf = requestAnimationFrame(() => {
      footer = document.getElementById('footer')
      if (!footer) return
      compute()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    })

    return () => {
      cancelAnimationFrame(mountRaf)
      if (raf != null) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [router.asPath])

  return (
    <>
      <div
        className="floating-stack"
        style={stackOffset != null ? { bottom: `${stackOffset}px` } : undefined}
      >
        <button
          type="button"
          className={`floating-icon-btn floating-icon-btn--contact ${onDark ? '' : 'floating-icon-btn--on-light'}`}
          onClick={() => setFormOpen(true)}
          aria-label="İletişim Formu"
        >
          {CONTACT_ICON}
        </button>

        <a
          className={`floating-icon-btn floating-icon-btn--whatsapp ${onDark ? '' : 'floating-icon-btn--on-light'}`}
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp ile yazın"
        >
          {WHATSAPP_ICON}
        </a>
      </div>

      <div
        className="floating-scroll-top-wrap"
        style={scrollTopOffset != null ? { bottom: `${scrollTopOffset}px` } : undefined}
      >
        <button
          type="button"
          className={`floating-icon-btn floating-scroll-top ${onDark ? '' : 'floating-icon-btn--on-light'} ${showScrollTop ? 'floating-scroll-top--visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Sayfa başına dön"
          tabIndex={showScrollTop ? 0 : -1}
        >
          {ARROW_UP_ICON}
        </button>
      </div>

      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  )
}
