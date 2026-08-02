import TopoLines from './TopoLines'

export default function Hero() {
  return (
    <section id="hero" data-theme="ink" className="hero grain">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://placehold.co/1920x1080/0b0b0c/171719?text=+"
      >
        <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />
      <TopoLines tone="ink" className="hero__topo" seed={1} />

      <div className="hero__content">
        <img className="hero__mark" src="/logos/nip_paper.png" alt="NİP Mimarlık" />

        <p className="hero__kicker">Mimarlık ve Yapı Stüdyosu · Çanakkale</p>
      </div>
    </section>
  )
}
