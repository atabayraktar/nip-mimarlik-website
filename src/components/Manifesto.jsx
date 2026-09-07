import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const LINES = [
  ['İnsan,', 'yaşam', 've'],
  ['çevre', 'arasındaki', 'ilişkileri'],
]

const BODY_PARAGRAPHS = [
  'Bize göre mimarlık, kapitalist üretim düzeni içerisinde yalnızca ekonomik değeri için meta üreten bir disiplin değil; insan, yaşam ve çevre arasındaki ilişkileri yeniden kuran çok katmanlı bir disiplindir.',
  'Nip Mimarlık ve Yapı, bu noktadan hareketle mekânları kullanıcısına özgü, değişen ihtiyaçlara uyum sağlayabilen ve dönüşebilen yapılar olarak ele alır. Tasarlamak, bir yaşam biçimini dikte etmek değil; olasılıkları öngörmek ve estetik bakış, işlev, deneyim ile teknik gerçekliği aynı bütünün parçaları olarak değerlendirmektir.',
  'Bağlam, malzemenin karakteri ve kullanıcının yaşam döngüsü, tasarımın doğal girdilerini oluşturur. Bu girdiler doğrultusunda tekrar eden bir tasarım dilinden uzaklaşarak her projenin kendi kimliğini bulmasını amaçlarız.',
  'Tasarım ve uygulamayı birbirinden bağımsız süreçler olarak görmeyiz. Ofiste doğan fikri henüz çizim aşamasındayken uygulama süreciyle birlikte ele alır, geliştirir ve projelendiririz. Böylece yaratıcılığın soyut dünyasında başlayan tasarım fikrini; çizgiden detaya, malzemeden uygulamaya uzanan bütüncül bir süreç içerisinde üçüncü boyutta inşa ederiz.',
]

const MARQUEE_ITEMS = [
  'LOREM',
  'IPSUM',
  'DOLOR',
  'SIT AMET',
  'CONSECTETUR',
  'ADIPISCING',
  'ELIT',
]

// Marquee band temporarily disabled — keep markup/logic in place to re-enable later.
const MARQUEE_ENABLED = false

export default function Manifesto() {
  let wordCount = 0
  const [isOpen] = useSection('manifesto')

  return (
    <section id="manifesto" data-theme="paper" className="manifesto">
      <div className="container">
        <SectionToggle id="manifesto" label="Manifesto" className="manifesto__eyebrow" />

        <Collapse id="manifesto" open={isOpen}>
          <div className="manifesto__inner">
            <div className="manifesto__col">
              <h2 className="manifesto__headline">
                {LINES.map((line, li) => (
                  <span className="manifesto__line" key={li}>
                    {line.map((word, wi) => {
                      const isLast = wi === line.length - 1
                      const delay = wordCount * 55
                      wordCount += 1
                      return (
                        <span className="manifesto__word" key={wi}>
                          <span
                            className="manifesto__word-inner"
                            data-reveal
                            style={{ transitionDelay: `${delay}ms` }}
                          >
                            {isLast ? <em>{word}</em> : word}
                          </span>
                        </span>
                      )
                    })}
                  </span>
                ))}
              </h2>
            </div>

            <div className="manifesto__media" data-reveal data-reveal-delay="150">
              <img
                src="/images/manifesto.webp"
                alt="Nip Mimarlık ve Yapı ekibinin bir proje sunumu yaptığı stüdyo toplantısı"
                width={1300}
                height={867}
                loading="lazy"
              />
            </div>
          </div>

          <div className="manifesto__body">
            {BODY_PARAGRAPHS.map((paragraph, pi) => (
              <p
                key={pi}
                data-reveal
                data-reveal-delay={pi === 0 ? undefined : String(Math.min(pi * 100, 300))}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Collapse>
      </div>

      {MARQUEE_ENABLED && (
        <div className="manifesto__marquee" aria-hidden="true">
          <div className="manifesto__marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
