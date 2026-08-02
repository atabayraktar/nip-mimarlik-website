import { useEffect, useRef, useState } from 'react'

const WHATSAPP_NUMBER = '905316562909'

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

export default function ContactFormModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState({ name: false, phone: false, message: false })

  useEffect(() => {
    if (!open) {
      setErrors({ name: false, phone: false, message: false })
      return
    }
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

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => (er[key] ? { ...er, [key]: false } : er))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {
      name: !form.name.trim(),
      phone: !form.phone.trim(),
      message: !form.message.trim(),
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.phone || nextErrors.message) return

    const lines = [`Ad Soyad: ${form.name}`, `Telefon: ${form.phone}`, `Mesaj: ${form.message}`]
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
        data-lenis-prevent
      >
        <button type="button" className="contact-modal__close" onClick={onClose} aria-label="Formu kapat">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>

        <p className="eyebrow contact-modal__eyebrow">İletişim Formu</p>
        <h3 id="contact-modal-title" className="contact-modal__title">
          Bilgilerinizi bırakın, <em>WhatsApp'tan yazalım.</em>
        </h3>

        <form className="contact-modal__form" onSubmit={handleSubmit} noValidate>
          <label className={`contact-modal__field ${errors.name ? 'contact-modal__field--error' : ''}`}>
            <div className="contact-modal__field-head">
              <span>Adınız Soyadınız</span>
              {errors.name && <em className="contact-modal__field-error">Bu alanı doldurmanız gerekiyor</em>}
            </div>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={update('name')}
              autoComplete="name"
              aria-invalid={errors.name}
            />
          </label>

          <label className={`contact-modal__field ${errors.phone ? 'contact-modal__field--error' : ''}`}>
            <div className="contact-modal__field-head">
              <span>Telefon Numaranız</span>
              {errors.phone && <em className="contact-modal__field-error">Bu alanı doldurmanız gerekiyor</em>}
            </div>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={update('phone')}
              autoComplete="tel"
              aria-invalid={errors.phone}
            />
          </label>

          <label className={`contact-modal__field ${errors.message ? 'contact-modal__field--error' : ''}`}>
            <div className="contact-modal__field-head">
              <span>Mesajınız</span>
              {errors.message && <em className="contact-modal__field-error">Bu alanı doldurmanız gerekiyor</em>}
            </div>
            <textarea
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={update('message')}
              aria-invalid={errors.message}
            />
          </label>

          <button type="submit" className="contact-modal__submit">
            {WHATSAPP_ICON}
            <span>İle Ulaş</span>
          </button>
        </form>
      </div>
    </div>
  )
}
