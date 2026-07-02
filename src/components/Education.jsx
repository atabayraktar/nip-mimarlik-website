import TopoLines from './TopoLines'

const EDUCATION = [
  { year: '2012', degree: 'Mimarlık Lisansı', place: 'Lorem Üniversitesi' },
  { year: '2015', degree: 'Yüksek Lisans, Topografya & Peyzaj', place: 'İpsum Enstitüsü' },
  { year: '2018', degree: 'Restorasyon Sertifikası', place: 'Dolor Akademisi' },
]

const APPROACH = [
  'Lorem ipsum dolor sit amet consectetur adipiscing.',
  'Sed do eiusmod tempor incididunt ut labore.',
  'Ut enim ad minim veniam quis nostrud exercitation.',
]

export default function Education() {
  return (
    <section id="egitim" data-theme="paper" className="education">
      <TopoLines tone="paper" seed={8} />
      <div className="container education__inner">
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

        <div className="education__col" data-reveal data-reveal-delay="150">
          <p className="eyebrow">Yaklaşım</p>
          <ul className="education__approach">
            {APPROACH.map((line, i) => (
              <li key={i}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <p>{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
