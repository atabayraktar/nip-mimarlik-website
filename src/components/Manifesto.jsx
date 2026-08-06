import TopoLines from './TopoLines'
import SectionToggle from './SectionToggle'
import Collapse from './Collapse'
import { useSection } from '../lib/sections'

const LINES = [
  ['Lorem', 'ipsum', 'dolor.'],
  ['Sit', 'amet', 'consectetur.'],
  ['Elit', 'sed', 'do.'],
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
      <TopoLines tone="paper" className="manifesto__topo" parallax seed={2} />

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

              <p className="manifesto__body" data-reveal>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat — duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </p>
            </div>

            <div className="manifesto__media" data-reveal data-reveal-delay="150">
              <img
                src="https://placehold.co/720x960/EAE9E3/8A8A85?text=+"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>
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
