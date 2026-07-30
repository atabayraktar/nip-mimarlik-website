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

  if (instance) {
    // This runs right after a layout change (siblings collapsing, the target
    // growing), so Lenis's cached scroll-height/limit can be stale — resize()
    // forces it to remeasure before we clamp/scroll against it. Jumping
    // immediately (no animated lerp) avoids that animation losing the race
    // against touch momentum on mobile and landing short of the target.
    instance.resize()
    instance.scrollTo(el, { immediate: true, offset: 0, ...opts })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0)
  window.scrollTo({ top, behavior: 'auto' })
}

export function stopScroll() {
  instance?.stop()
}

export function startScroll() {
  instance?.start()
}
