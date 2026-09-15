import { useState } from 'react'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import ContactFormModal from './ContactFormModal'
import { useSection } from '../lib/sections'

const ADDRESS = 'Yeni İzmir Yolu Cd. 20/20A, 17110 Çanakkale Merkez, Çanakkale'
const MAPS_LINK = 'https://share.google/M7v9Fe0bI3dN86dxn'

// Floor-plan / measurement mark, used as the bullet icon for every
// contact item (replaces the old nav-burger "anahtar" mark here only).
const CONTACT_ICON = (
  <svg
    viewBox="0 0 400 400"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M126,66 L308,70 C320,71 328,80 328,92 L325,320 C325,334 317,343 304,343
             L119,340 C107,340 99,331 99,319 L102,90 C102,77 112,66 126,66 Z"
      strokeWidth="15"
    />
    <path d="M229,71 L231,106" strokeWidth="12" />
    <path d="M288,75 L290,110" strokeWidth="12" />
    <path d="M100,209 L189,202 L193,334" strokeWidth="13" />
    <path d="M328,240 A102,102 0 0 0 226,342" strokeWidth="13" />
    <path d="M26,43 L62,43" strokeWidth="12" />
    <path d="M45,45 L44,146" strokeWidth="12" />
    <path d="M31,176 L58,175" strokeWidth="12" />
    <path d="M31,197 L58,196" strokeWidth="12" />
    <path d="M44,226 L45,339" strokeWidth="12" />
    <path d="M26,344 L62,344" strokeWidth="12" />
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
          {CONTACT_ICON}
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
                {CONTACT_ICON}
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
