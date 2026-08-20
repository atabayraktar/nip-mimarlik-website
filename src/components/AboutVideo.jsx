import { useEffect, useRef, useState } from 'react'

export default function AboutVideo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  // Tracks a pause the user chose themselves (button/video click), as
  // opposed to the observer auto-pausing it on scroll-out — only a user
  // pause should stop the auto-play-on-scroll-back-into-view behavior.
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const pause = () => {
    userPausedRef.current = true
    videoRef.current?.pause()
  }

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().catch(() => {})
    } else {
      userPausedRef.current = true
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
