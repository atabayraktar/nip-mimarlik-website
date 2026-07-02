import { useMemo, useState } from 'react'
import TopoLines from './TopoLines'

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'ic-mekan', label: 'İç Mekan' },
  { key: 'dis-mekan', label: 'Dış Mekan' },
  { key: 'finanse', label: 'Finanse Edilenler' },
]

const PROJECTS = [
  {
    id: 1,
    name: 'Proje 01',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    typology: 'Konut / Topografya',
    area: '240 m²',
    status: 'Tamamlandı',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+01',
  },
  {
    id: 2,
    name: 'Proje 02',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    typology: 'Atölye / İç Mekan',
    area: '180 m²',
    status: 'Tamamlandı',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+02',
  },
  {
    id: 3,
    name: 'Proje 03',
    category: 'finanse',
    categoryLabel: 'Finanse Edilenler',
    typology: 'Karma Kullanım',
    area: '2.580 m²',
    status: 'Devam Ediyor',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+03',
  },
  {
    id: 4,
    name: 'Proje 04',
    category: 'ic-mekan',
    categoryLabel: 'İç Mekan',
    typology: 'Ofis / İç Mekan',
    area: '310 m²',
    status: 'Tamamlandı',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+04',
  },
  {
    id: 5,
    name: 'Proje 05',
    category: 'dis-mekan',
    categoryLabel: 'Dış Mekan',
    typology: 'Peyzaj / Topografya',
    area: '860 m²',
    status: 'Devam Ediyor',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+05',
  },
  {
    id: 6,
    name: 'Proje 06',
    category: 'finanse',
    categoryLabel: 'Finanse Edilenler',
    typology: 'Konut Bloğu',
    area: '3.200 m²',
    status: 'Planlama',
    image: 'https://placehold.co/1200x900/EAE9E3/8A8A85?text=Proje+06',
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section id="projeler" data-theme="paper" className="projects">
      <TopoLines tone="paper" seed={4} />
      <div className="container">
        <div className="projects__head">
          <p className="eyebrow">Projeler</p>

          <div className="projects__filters" role="group" aria-label="Proje kategorisi filtrele">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`projects__filter ${filter === f.key ? 'projects__filter--active' : ''}`}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="projects__list">
          {visible.map((p, i) => (
            <li className="projects__card" key={p.id} data-reveal>
              <span className="projects__card-index">{String(i + 1).padStart(2, '0')}</span>

              <div className="projects__card-media">
                <img src={p.image} alt={`${p.name} — ${p.categoryLabel}`} loading="lazy" />

                <div className="projects__card-overlay">
                  <dl>
                    <div>
                      <dt>Konum / Tipoloji</dt>
                      <dd>{p.typology}</dd>
                    </div>
                    <div>
                      <dt>Alan</dt>
                      <dd>{p.area}</dd>
                    </div>
                    <div>
                      <dt>Durum</dt>
                      <dd>{p.status}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="projects__card-meta">
                <h3>{p.name}</h3>
                <span className="projects__card-tag">{p.categoryLabel}</span>
              </div>
              <p className="projects__card-loc">Çanakkale · 2025</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
