export default function AboutIntro() {
  return (
    <section id="hakkinda" data-theme="paper" className="about-intro">
      <div className="container about-intro__inner">
        <div className="about-intro__portrait" data-reveal>
          <img
            src="https://placehold.co/900x1100/EAE9E3/8A8A85?text=İdil+Postacı"
            alt="Nilüfer İdil Postacı portresi"
            loading="lazy"
          />
        </div>

        <div className="about-intro__text" data-reveal data-reveal-delay="150">
          <p className="eyebrow">Kurucu · Mimar</p>
          <h1 className="about-intro__name">
            Nilüfer <em>İdil Postacı</em>
          </h1>
          <p className="about-intro__bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="about-intro__bio">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  )
}
