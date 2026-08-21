import { useEffect, useRef, useState } from 'react'
import { stopScroll, startScroll } from '../lib/lenis'
import ContactFormFields from './ContactFormFields'

const CLOSE_DURATION = 400

export default function ContactFormModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const [mounted, setMounted] = useState(open)
  const [closing, setClosing] = useState(false)

  // Keeps the modal mounted for the closing animation instead of vanishing
  // the instant `open` flips false — the timeout unmount matches the CSS
  // reverse-animation duration below.
  useEffect(() => {
    if (open) {
      setMounted(true)
      setClosing(false)
      return
    }
    if (!mounted) return

    setClosing(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => {
      setMounted(false)
      setClosing(false)
    }, reduce ? 0 : CLOSE_DURATION)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    // Locks scroll without letting the scrollbar track disappear (which
    // would shift the page width) — freezes the body in place at its
    // current scroll offset instead of hiding overflow.
    const scrollY = window.scrollY
    const { body, documentElement: html } = document
    const prevHtmlOverflowY = html.style.overflowY
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyLeft = body.style.left
    const prevBodyRight = body.style.right
    html.style.overflowY = 'scroll'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    stopScroll()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    dialogRef.current?.querySelector('input')?.focus()
    return () => {
      html.style.overflowY = prevHtmlOverflowY
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.left = prevBodyLeft
      body.style.right = prevBodyRight
      // Plain scrollTo(x, y) — and even `behavior: 'auto'` — defers to the
      // global `scroll-behavior: smooth` and would visibly animate from 0
      // back up to scrollY. Only 'instant' actually overrides it.
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
      startScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null

  return (
    <div
      className={`contact-modal ${closing ? 'contact-modal--closing' : ''}`}
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
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

        <ContactFormFields onSubmitted={onClose} />
      </div>
    </div>
  )
}
