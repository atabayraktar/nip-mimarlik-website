import { useState } from 'react'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import ContactFormModal from './ContactFormModal'
import { useSection } from '../lib/sections'

const ADDRESS = 'Yeni İzmir Yolu Cd. 20/20A, 17110 Çanakkale Merkez, Çanakkale'
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

// Static resting frame (phase 0) of the nav burger's key/"anahtar" mark —
// same mark, same viewBox, reused here as the bullet icon for every item.
const ANAHTAR_ICON = (
  <svg viewBox="0 0 810 270" aria-hidden="true">
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M0,0 L810,0 L810,270 L540,270 L540,90 L180,90 L180,180 L270,180 L270,270 L0,270 L0,180 L90,180 L90,90 L0,90 Z M630,90 L720,90 L720,180 L630,180 Z"
    />
  </svg>
)

const CONTACT_ITEMS = [
  { key: 'adres', label: 'Adres', value: ADDRESS, href: MAPS_LINK, external: true },
  { key: 'telefon', label: 'Telefon', value: '+90 531 656 29 09', href: 'tel:+905316562909' },
  { key: 'mail', label: 'Mail', value: 'info@nipmimarlik.com', href: 'mailto:info@nipmimarlik.com' },
  {
    key: 'instagram',
    label: 'Instagram',
    value: '@nipmimarlik',
    href: 'https://instagram.com/nipmimarlik',
    external: true,
  },
]

function ContactItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="contact__item">
      <button
        type="button"
        className="contact__item-toggle"
        aria-expanded={open}
        aria-controls={`contact-${item.key}-panel`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="contact__item-icon" aria-hidden="true">
          {ANAHTAR_ICON}
        </span>
        {item.label}
      </button>

      <Collapse id={`contact-${item.key}`} open={open}>
        <p className="contact__item-value">
          <a
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
          >
            {item.value}
          </a>
        </p>
      </Collapse>
    </div>
  )
}

export default function Contact() {
  const [isOpen] = useSection('iletisim')
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="iletisim" data-theme="paper" className="contact">
      <div className="contact__head">
        <SectionToggle id="iletisim" label="İletişim" />
      </div>

      <Collapse id="iletisim" open={isOpen}>
        <div className="contact__inner">
          {CONTACT_ITEMS.map((item) => (
            <ContactItem item={item} key={item.key} />
          ))}

          <div className="contact__item">
            <button type="button" className="contact__item-toggle" onClick={() => setFormOpen(true)}>
              <span className="contact__item-icon" aria-hidden="true">
                {ANAHTAR_ICON}
              </span>
              İletişim Formu
            </button>
          </div>
        </div>
      </Collapse>

      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
