import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const SITE_URL = 'https://nipmimarlik.com'
const TITLE = 'NİP Mimarlık — Bağımsız Mimarlık Stüdyosu · Çanakkale'
const DESCRIPTION =
  'NİP Mimarlık, Nilüfer İdil Postacı tarafından Çanakkale\'de yürütülen bağımsız mimarlık stüdyosudur. Mimari tasarım, iç mekan, peyzaj/topografya, restorasyon, danışmanlık ve 3B görselleştirme.'
const OG_IMAGE = `${SITE_URL}/logos/nip_ink_sq.png`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'NİP Mimarlık',
      url: SITE_URL,
      logo: `${SITE_URL}/logos/nip_ink.png`,
      sameAs: ['https://instagram.com/nipmimarlik'],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'NİP Mimarlık',
      image: `${SITE_URL}/logos/nip_ink.png`,
      url: SITE_URL,
      telephone: '+90 555 000 00 00',
      email: 'info@nipmimarlik.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lorem Mah. İpsum Sk. No:12',
        addressLocality: 'Çanakkale',
        addressCountry: 'TR',
      },
      areaServed: 'Çanakkale',
    },
  ],
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NİP Mimarlık" />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="NİP Mimarlık" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="NİP Mimarlık" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <meta name="geo.region" content="TR-17" />
        <meta name="geo.placename" content="Çanakkale" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Nav />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
