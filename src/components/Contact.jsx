import { useState } from 'react'
import TopoLines from './TopoLines'
import ContactFormModal from './ContactFormModal'

const ADDRESS = 'Yeni İzmir Yolu Cd. 20/20A, 17110 Çanakkale Merkez, Çanakkale'
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const ICONS = {
  pin: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h3.4l1.6 4.5-2.2 1.8a12 12 0 0 0 5.9 5.9l1.8-2.2 4.5 1.6V19a2 2 0 0 1-2 2C10.6 21 3 13.4 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  ),
}

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="iletisim" data-theme="paper" className="contact">
      <TopoLines tone="paper" seed={5} />
      <div className="container">
        <div className="contact__inner">
          <div className="contact__info" data-reveal>
            <dl className="contact__list">
              <div>
                <dt aria-label="Adres">{ICONS.pin}</dt>
                <dd>
                  <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                    {ADDRESS}
                  </a>
                </dd>
              </div>
              <div>
                <dt aria-label="Telefon">{ICONS.phone}</dt>
                <dd>
                  <a href="tel:+905550000000" target="_blank" rel="noreferrer">
                    +90 555 000 00 00
                  </a>
                </dd>
              </div>
              <div>
                <dt aria-label="E-posta">{ICONS.mail}</dt>
                <dd>
                  <a href="mailto:info@nipmimarlik.com" target="_blank" rel="noreferrer">
                    info@nipmimarlik.com
                  </a>
                </dd>
              </div>
              <div>
                <dt aria-label="Instagram">{ICONS.instagram}</dt>
                <dd>
                  <a href="https://instagram.com/nipmimarlik" target="_blank" rel="noreferrer">
                    @nipmimarlik
                  </a>
                </dd>
              </div>
            </dl>

            <button type="button" className="contact__form-cta" onClick={() => setFormOpen(true)}>
              İletişim Formu
            </button>
          </div>
        </div>
      </div>

      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
