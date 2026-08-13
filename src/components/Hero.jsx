export default function Hero() {
  return (
    <section id="hero" data-theme="ink" className="hero grain">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/topo/topo-ink.webp"
      >
        <source src="/videos/topo-ink.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />

      <div className="hero__content">
        <img
          className="hero__mark"
          src="/logos/nip-logos/nip-light.webp"
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
