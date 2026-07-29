let instance = null

export function setLenis(lenis) {
  instance = lenis
}

export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (instance) {
    instance.scrollTo(0, { immediate: reduce, duration: 1.2 })
    return
  }

  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

export function scrollToElement(el, opts = {}) {
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (instance) {
    instance.scrollTo(el, { immediate: reduce, duration: 1, offset: 0, ...opts })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0)
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}

export function stopScroll() {
  instance?.stop()
}

export function startScroll() {
  instance?.start()
}
