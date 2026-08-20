import { useEffect, useState } from 'react'

// Phones in landscape max out around ~500px of viewport height; tablets in
// landscape start at ~744px+. 600px sits cleanly in the gap between them.
const MOBILE_LANDSCAPE_MAX_HEIGHT = 600

// Picks which topo clip to play: the vertical "mobile" source in portrait
// (phone or tablet) and in tight phone-landscape viewports (rotated 90deg
// to fill the screen), the wide "desktop" source everywhere else
// (desktop and tablet landscape).
export function useTopoVariant() {
  const [state, setState] = useState({ variant: 'mobile', rotated: false })

  useEffect(() => {
    const mqLandscape = window.matchMedia('(orientation: landscape)')
    const mqShort = window.matchMedia(`(max-height: ${MOBILE_LANDSCAPE_MAX_HEIGHT}px)`)

    const update = () => {
      if (mqLandscape.matches && mqShort.matches) {
        setState({ variant: 'mobile', rotated: true })
      } else if (mqLandscape.matches) {
        setState({ variant: 'desktop', rotated: false })
      } else {
        setState({ variant: 'mobile', rotated: false })
      }
    }

    update()
    mqLandscape.addEventListener('change', update)
    mqShort.addEventListener('change', update)
    return () => {
      mqLandscape.removeEventListener('change', update)
      mqShort.removeEventListener('change', update)
    }
  }, [])

  return state
}

// Measures a container so a rotated video can be sized to exactly fill it:
// the video is laid out at the container's height x width (swapped) and
// then rotated 90deg, landing back on the container's own width x height.
export function useRotatedFillSize(ref, enabled) {
  const [size, setSize] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setSize(null)
      return
    }
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, enabled])

  return size
}
