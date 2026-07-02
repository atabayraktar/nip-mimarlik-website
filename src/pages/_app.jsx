import { useEffect } from 'react'
import '../styles/globals.scss'
import '../styles/components/TopoLines.scss'
import '../styles/components/Nav.scss'
import '../styles/components/Hero.scss'
import '../styles/components/Manifesto.scss'
import '../styles/components/Services.scss'
import '../styles/components/Projects.scss'
import '../styles/components/Contact.scss'
import '../styles/components/ContactFormModal.scss'
import '../styles/components/Footer.scss'
import '../styles/components/AboutIntro.scss'
import '../styles/components/Education.scss'
import '../styles/components/WorkedProjects.scss'
import '../styles/components/AboutVideo.scss'
import '../styles/pages/index.scss'
import '../styles/pages/idil.scss'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: isMobile,
        touchMultiplier: isMobile ? 2.5 : 2,
      })
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    }

    observe()

    // re-observe on route change (SPA navigation)
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mo.disconnect()
    }
  }, [])

  return <Component {...pageProps} />
}
