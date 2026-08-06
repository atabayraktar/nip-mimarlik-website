import { useState } from 'react'
import TopoLines from './TopoLines'
import ContactFormModal from './ContactFormModal'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const ADDRESS = 'Yeni İzmir Yolu Cd. 20/20A, 17110 Çanakkale Merkez, Çanakkale'
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

const BULLET_ICON = (
  <svg viewBox="0 0 810 270" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M0 0H810V270H540V90H180V180H270V270H0V180H90V90H0ZM720 90H630V180H720Z"
    />
  </svg>
)

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false)
  const [isOpen] = useSection('iletisim')

  return (
    <section id="iletisim" data-theme="paper" className="contact">
      <TopoLines tone="paper" seed={5} />
      <div className="container">
        <div className="contact__head">
          <SectionToggle id="iletisim" label="İletişim" />
        </div>

        <Collapse id="iletisim" open={isOpen}>
          <div className="contact__inner">
            <div className="contact__info" data-reveal>
              <dl className="contact__list">
                <div>
                  <dt aria-hidden="true">{BULLET_ICON}</dt>
                  <dd>
                    <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                      {ADDRESS}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt aria-hidden="true">{BULLET_ICON}</dt>
                  <dd>
                    <a href="tel:+905316562909">+90 531 656 29 09</a>
                  </dd>
                </div>
                <div>
                  <dt aria-hidden="true">{BULLET_ICON}</dt>
                  <dd>
                    <a href="mailto:info@nipmimarlik.com">info@nipmimarlik.com</a>
                  </dd>
                </div>
                <div>
                  <dt aria-hidden="true">{BULLET_ICON}</dt>
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
        </Collapse>
      </div>

      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
