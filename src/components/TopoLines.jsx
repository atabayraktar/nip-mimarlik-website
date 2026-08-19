import { useEffect, useRef, useState } from 'react'

// Deterministic pseudo-random hash (no Math.random — must stay SSR-stable).
function hash(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// The actual nip-topografya reference footage — contours build in from the
// left/right edges and thicken over ~15s, then loop. Playing the real clip
// (instead of an approximated frame sequence) is what makes the motion read
// as identical to the source video.
const SOURCES = {
  ink: '/videos/topo-ink.mp4',
  paper: '/videos/topo-paper.mp4',
}
const POSTERS = {
  ink: '/images/topography-backgrounds/topo-dark.webp',
  paper: '/images/topography-backgrounds/topo-light.webp',
}

export default function TopoLines({ tone = 'ink', className = '', parallax = true, seed = 0 }) {
  const rootRef = useRef(null)
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)

  // Plays the clip only while the field is on screen; pauses it off-screen.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStarted(entry.isIntersecting)
        if (!entry.isIntersecting) videoRef.current?.pause()
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const video = videoRef.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const settle = () => {
      if (reduce) {
        // Hold on a fully built-in frame instead of animating.
        if (video.duration) video.currentTime = video.duration * 0.6
        return
      }
      // Stagger the loop phase per section so instances don't all draw in sync.
      if (video.duration) video.currentTime = (seed * 2.7) % video.duration
      video.muted = true
      video.play().catch(() => {})
    }

    if (video.readyState >= 1) settle()
    else video.addEventListener('loadedmetadata', settle, { once: true })
    return () => video.removeEventListener('loadedmetadata', settle)
  }, [started, seed])

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

  // Shift the horizontal framing per seed, so sections don't all crop the
  // same slice of the (portrait) source footage.
  const posX = (20 + hash(seed * 3.1 + 1) * 60).toFixed(1)

  return (
    <div
      ref={rootRef}
      className={`topo topo--${tone} ${started ? 'topo--visible' : ''} ${className}`}
      aria-hidden="true"
    >
      <div ref={wrapRef} className="topo__inner">
        <video
          ref={videoRef}
          className="topo__video"
          style={{ objectPosition: `${posX}% 50%` }}
          src={SOURCES[tone]}
          poster={POSTERS[tone]}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  )
}
