import { useEffect, useRef } from 'react'

// Deterministic Catmull-Rom -> cubic bezier conversion for a closed, organic loop.
function closedSmoothPath(points) {
  const n = points.length
  const seg = (p0, p1, p2, p3) => {
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    return `C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)}, ${c2[0].toFixed(2)} ${c2[1].toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} `
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    d += seg(p0, p1, p2, p3) + ' '
  }
  return d + 'Z'
}

// Elevation-style contour ring: base radius perturbed by two harmonics so it
// reads as topography rather than a perfect circle.
function contourRing({ cx, cy, baseR, amp, freq, phase, points = 72 }) {
  const pts = []
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    const r =
      baseR +
      amp * Math.sin(freq * angle + phase) +
      amp * 0.4 * Math.sin(freq * 1.7 * angle + phase * 1.6)
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }
  return closedSmoothPath(pts)
}

const RINGS = [
  { baseR: 120, amp: 14, freq: 3, phase: 0.4 },
  { baseR: 205, amp: 22, freq: 4, phase: 1.1 },
  { baseR: 290, amp: 26, freq: 3, phase: 2.0 },
  { baseR: 375, amp: 32, freq: 5, phase: 0.7 },
  { baseR: 460, amp: 36, freq: 4, phase: 1.8 },
  { baseR: 545, amp: 42, freq: 3, phase: 2.6 },
]

// Deterministic pseudo-random hash (no Math.random — must stay SSR-stable).
function hash(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function TopoLines({ tone = 'ink', className = '', parallax = true, density = 1, seed = 0 }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!parallax) return
    const el = wrapRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight || 1
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh
        el.style.transform = `translate3d(0, ${(-progress * 40).toFixed(1)}px, 0)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [parallax])

  // Scatter the cluster center + phase per seed so each section reads as a
  // different slice of the same topographic field, not a repeated stamp.
  const cx = 300 + hash(seed * 3.1 + 1) * 600
  const cy = 300 + hash(seed * 5.7 + 2) * 600
  const phaseOffset = hash(seed * 2.3 + 3) * Math.PI * 2
  const scale = 0.85 + hash(seed * 4.1 + 4) * 0.4

  const rings = RINGS.slice(0, Math.round(RINGS.length * density))

  return (
    <div className={`topo topo--${tone} ${className}`} aria-hidden="true">
      <div ref={wrapRef} className="topo__inner">
        <svg viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid slice">
          {rings.map((r, i) => (
            <path
              key={i}
              d={contourRing({
                cx,
                cy,
                baseR: r.baseR * scale,
                amp: r.amp * scale,
                freq: r.freq,
                phase: r.phase + phaseOffset,
              })}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={1 - i * 0.11}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
