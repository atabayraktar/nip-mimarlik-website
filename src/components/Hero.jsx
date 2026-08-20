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
          alt="NİP Mimarlık"
          data-reveal
        />

        <p className="hero__kicker" data-reveal data-reveal-delay="150">
          Mimarlık ve Yapı Stüdyosu · Çanakkale
        </p>
      </div>
    </section>
  )
}
