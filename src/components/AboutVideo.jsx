import { useState } from 'react'
import TopoLines from './TopoLines'

export default function AboutVideo() {
  const [playing, setPlaying] = useState(true)

  const toggle = () => setPlaying((v) => !v)

  return (
    <section id="hakkinda-video" data-theme="ink" className="about-video grain">
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
    </section>
  )
}
