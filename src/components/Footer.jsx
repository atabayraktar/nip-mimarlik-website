import TopoLines from './TopoLines'

const INSTAGRAM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
  </svg>
)

export default function Footer() {
  return (
    <footer id="footer" data-theme="ink" className="footer grain">
      <TopoLines tone="ink" className="footer__topo" seed={6} />

      <div className="container footer__inner">
        <img className="footer__logo" src="/logos/nip_paper.png" alt="NİP Mimarlık" />

        <p className="footer__copy">© 2026 nip Mimarlık · Çanakkale · Tüm hakları saklıdır.</p>

        <a
          className="footer__social"
          href="https://instagram.com/nipmimarlik"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          {INSTAGRAM_ICON}
        </a>
      </div>
    </footer>
  )
}
