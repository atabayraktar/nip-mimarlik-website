import { useEffect, useRef, useState } from 'react'

export default function AboutVideo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const autoHandledRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoHandledRef.current) {
          autoHandledRef.current = true
          video.play().catch(() => {})
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const pause = () => {
    autoHandledRef.current = true
    videoRef.current?.pause()
  }

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    autoHandledRef.current = true
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  return (
    <section id="hakkinda-video" data-theme="paper" className="about-video" ref={sectionRef}>
      <div className="about-video__frame">
        <video
          ref={videoRef}
          className="about-video__video"
          playsInline
          preload="metadata"
          onClick={pause}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/videos/idil_video.mp4" type="video/mp4" />
        </video>

        <div className="about-video__overlay" />

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
      </div>
    </section>
  )
}
