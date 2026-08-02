import Link from 'next/link'
import { useRouter } from 'next/router'
import { scrollToTop } from '../lib/lenis'
import TopoLines from './TopoLines'

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
)

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.5a8.5 8.5 0 0 0-7.35 12.77L3.5 20.5l4.36-1.14A8.5 8.5 0 1 0 12 3.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
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

const WHATSAPP_NUMBER = '905316562909'

export default function Footer() {
  const router = useRouter()

  const handleLogoClick = (e) => {
    if (router.pathname !== '/') return
    e.preventDefault()
    scrollToTop()
  }

  return (
    <footer id="footer" data-theme="ink" className="footer grain">
      <TopoLines tone="ink" className="footer__topo" seed={6} />

      <div className="container footer__inner">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="footer__logo-link"
          aria-label="NİP Mimarlık — Anasayfa"
        >
          <img className="footer__logo" src="/logos/nip_paper.png" alt="NİP Mimarlık" />
        </Link>

        <p className="footer__copy">© 2026 nip Mimarlık · Çanakkale · Tüm hakları saklıdır.</p>

        <div className="footer__socials">
          <a
            className="footer__social"
            href="https://instagram.com/nipmimarlik"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            {INSTAGRAM_ICON}
          </a>

          <a
            className="footer__social"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            {WHATSAPP_ICON}
          </a>
        </div>
      </div>
    </footer>
  )
}
