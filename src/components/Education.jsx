import Eyebrow from './Eyebrow'

const EDUCATION = [
  { year: '2016–2021', degree: 'Mimarlık Lisansı', place: 'İstanbul Bilgi Üniversitesi' },
  { year: '2021–2022', degree: 'Yüksek Lisans, Mimari Tasarım Programı', place: 'İstanbul Bilgi Üniversitesi' },
]

export default function Education() {
  return (
    <section id="egitim" data-theme="paper" className="education">
      <div className="education__inner">
        <div className="education__col" data-reveal>
          <Eyebrow as="p">Eğitim</Eyebrow>
          <ul className="education__list">
            {EDUCATION.map((e) => (
              <li key={e.year}>
                <span className="education__year">{e.year}</span>
                <div>
                  <h2>{e.degree}</h2>
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
