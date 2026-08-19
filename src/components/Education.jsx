const EDUCATION = [
  { year: '2012', degree: 'Mimarlık Lisansı', place: 'Lorem Üniversitesi' },
  { year: '2015', degree: 'Yüksek Lisans, Topografya & Peyzaj', place: 'İpsum Enstitüsü' },
  { year: '2018', degree: 'Restorasyon Sertifikası', place: 'Dolor Akademisi' },
]

export default function Education() {
  return (
    <section id="egitim" data-theme="paper" className="education">
      <div className="education__inner">
        <div className="education__col" data-reveal>
          <p className="eyebrow">Eğitim</p>
          <ul className="education__list">
            {EDUCATION.map((e) => (
              <li key={e.year}>
                <span className="education__year">{e.year}</span>
                <div>
                  <h3>{e.degree}</h3>
                  <p>{e.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
