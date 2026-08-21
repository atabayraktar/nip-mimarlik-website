import Head from 'next/head'
import TopoLines from '../components/TopoLines'
import AboutIntro from '../components/AboutIntro'
import Education from '../components/Education'
import AboutVideo from '../components/AboutVideo'
import Footer from '../components/Footer'

const SITE_URL = 'https://nipmimarlik.com'
const TITLE = 'nip | Nilüfer İdil Postacı'
const DESCRIPTION =
  'NİP Mimarlık kurucusu, mimar Nilüfer İdil Postacı hakkında: eğitim geçmişi, yaklaşımı ve birlikte çalıştığı projeler.'
const OG_IMAGE = `${SITE_URL}/images/logos/nip-logos/nip-dark.webp`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2026-01-01',
  about: {
    '@type': 'Person',
    name: 'Nilüfer İdil Postacı',
    jobTitle: 'Kurucu · Mimar',
    worksFor: {
      '@type': 'Organization',
      name: 'NİP Mimarlık',
      url: SITE_URL,
    },
  },
}

export default function Idil() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/idil`} />

        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="NİP Mimarlık" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/idil`} />
        <meta property="og:image" content={OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="idil-ambient" aria-hidden="true">
        <TopoLines tone="paper" parallax={false} seed={7} />
      </div>

      <main id="main-content">
        <AboutIntro />
        <div className="container egitim-video">
          <AboutVideo />
          <Education />
        </div>
      </main>

      <Footer />
    </>
  )
}
