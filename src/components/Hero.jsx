import { useEffect, useRef } from 'react'
import { useTopoVariant, useRotatedFillSize } from '../lib/useResponsiveTopo'

const SOURCES = {
  desktop: '/videos/topo-dark-desktop.mp4',
  mobile: '/videos/topo-dark-mobile.mp4',
}

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const { variant, rotated } = useTopoVariant()
  const rotatedSize = useRotatedFillSize(sectionRef, rotated)
  const src = SOURCES[variant]

  // Reloads and resumes playback whenever the source flips (e.g. rotating
  // the device between portrait/landscape swaps in the mobile/desktop clip).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // The `muted` JSX prop sets the HTML attribute, but browsers (Safari/iOS
    // in particular) require the `muted` IDL property itself to be true at
    // play() time for autoplay to be allowed — after hydration that property
    // doesn't reliably end up set from the attribute alone, so set it here.
    video.muted = true
    video.defaultMuted = true
    video.load()
    video.play().catch(() => {})
  }, [src])

  return (
    <section id="hero" data-theme="ink" className="hero grain" ref={sectionRef}>
      <video
        ref={videoRef}
        className={`hero__video ${rotated ? 'hero__video--rotated' : ''}`}
        style={
          rotated && rotatedSize
            ? { '--rotate-w': `${rotatedSize.height}px`, '--rotate-h': `${rotatedSize.width}px` }
            : undefined
        }
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero__overlay" />

      <div className="hero__content">
        <img
          className="hero__mark"
          src="/images/logos/nip-logos/nip-light.webp"
          alt="nip Mimarlık"
          width={151}
          height={110}
          fetchpriority="high"
          data-reveal
        />

        <h1 className="hero__kicker" data-reveal data-reveal-delay="150">
          Mimarlık ve Yapı Stüdyosu · Çanakkale
        </h1>
      </div>
    </section>
  )
}
