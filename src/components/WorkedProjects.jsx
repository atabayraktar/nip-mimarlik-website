import TopoLines from './TopoLines'

const ITEMS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Proje ${String(i + 1).padStart(2, '0')}`,
}))

export default function WorkedProjects() {
  return (
    <section id="calistigim-projeler" data-theme="paper" className="worked">
      <TopoLines tone="paper" seed={9} />
      <div className="container">
        <p className="eyebrow">Çalıştığım Projeler</p>

        <ul className="worked__grid">
          {ITEMS.map((item, i) => (
            <li key={item.id} className="worked__cell" data-reveal data-reveal-delay={String((i % 4) * 100)}>
              <img
                src={`https://placehold.co/300x180/EAE9E3/8A8A85?text=${encodeURIComponent(item.name)}`}
                alt={item.name}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
