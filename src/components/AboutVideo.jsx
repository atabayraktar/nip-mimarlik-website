import { useRef, useState } from 'react'
import TopoLines from './TopoLines'

export default function AboutVideo() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="hakkinda-video" data-theme="ink" className="about-video grain">
      <video
        ref={videoRef}
        className="about-video__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://placehold.co/1920x1080/171719/171719?text=+"
      >
        <source src="/videos/idil-placeholder.mp4" type="video/mp4" />
      </video>

      <div className="about-video__overlay" />
      <TopoLines tone="ink" className="about-video__topo" seed={10} />

      <button
        type="button"
        className="about-video__play"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Videoyu durdur' : 'Videoyu oynat'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className="about-video__caption">
        <p className="eyebrow">Röportaj · Süre 02:12</p>
        <h2>İdil&apos;in Hikayesi</h2>
      </div>
    </section>
  )
}
