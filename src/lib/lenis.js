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
  // Defaults to an immediate jump: most callers run inside a layout effect
  // right after a DOM mutation (e.g. a FLIP animation prep) where an
  // animated scroll would fight the transform animation about to run.
  // Pass `immediate: false` for user-triggered nav clicks, where an
  // animated scroll reads as an intentional slide instead of a snap.
  const { immediate = true, ...rest } = opts

  if (instance) {
    // This runs right after a layout change (siblings collapsing, the target
    // growing), so Lenis's cached scroll-height/limit can be stale — resize()
    // forces it to remeasure before we clamp/scroll against it.
    instance.resize()
    instance.scrollTo(el, { immediate: reduce || immediate, duration: 1, offset: 0, ...rest })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0)
  window.scrollTo({ top, behavior: reduce || immediate ? 'auto' : 'smooth' })
}

export function stopScroll() {
  instance?.stop()
}

export function startScroll() {
  instance?.start()
}
