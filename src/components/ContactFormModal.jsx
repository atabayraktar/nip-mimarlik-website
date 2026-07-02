import { useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '905550000000'

export default function ContactFormModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    dialogRef.current?.querySelector('input')?.focus()
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Ad Soyad: ${form.name}`,
      `Telefon: ${form.phone}`,
      form.message ? `Mesaj: ${form.message}` : null,
    ].filter(Boolean)
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="contact-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        ref={dialogRef}
      >
        <button type="button" className="contact-modal__close" onClick={onClose} aria-label="Formu kapat">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>

        <p className="eyebrow contact-modal__eyebrow">İletişim Formu</p>
        <h3 id="contact-modal-title" className="contact-modal__title">
          Bilgilerinizi bırakın, <em>sizi arayalım.</em>
        </h3>

        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <label className="contact-modal__field">
            <span>Adınız Soyadınız</span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={update('name')}
              autoComplete="name"
            />
          </label>

          <label className="contact-modal__field">
            <span>Telefon Numaranız</span>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={update('phone')}
              autoComplete="tel"
            />
          </label>

          <label className="contact-modal__field">
            <span>Mesajınız</span>
            <textarea name="message" rows={4} value={form.message} onChange={update('message')} />
          </label>

          <button type="submit" className="contact-modal__submit">
            WhatsApp ile Gönder
          </button>
        </form>
      </div>
    </div>
  )
}
