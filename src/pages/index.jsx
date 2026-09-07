import Head from 'next/head'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import Services from '../components/Services'
import Projects, { PROJECTS } from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import TopoLines from '../components/TopoLines'

const SITE_URL = 'https://nipmimarlik.com'
const TITLE = 'nip Mimarlık | Çanakkale Mimarlık ve Yapı Stüdyosu | Mimari & İç Mekan'
const DESCRIPTION =
  'nip Mimarlık, Nilüfer İdil Postacı’nın Çanakkale’de kurduğu bağımsız mimarlık ve yapı stüdyosu. Mimari proje, iç mekan ve konsept tasarımı, proje uygulama danışmanlığı, müteahhitlik ve taahhüt işlerinde uçtan uca çözümler sunar.'
const KEYWORDS =
  'nip Mimarlık, Çanakkale mimarlık, Çanakkale mimarlık ofisi, Çanakkale mimar, Çanakkale mimarlık stüdyosu, mimari proje Çanakkale, iç mekan tasarımı Çanakkale, konsept tasarım, proje uygulama danışmanlığı, müteahhitlik Çanakkale, taahhüt işleri, villa projesi Çanakkale, Nilüfer İdil Postacı, Kepez, Dardanos, Yukarıinova, Çınarlı'
const OG_IMAGE = `${SITE_URL}/images/og/og-home.jpg`

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Yeni İzmir Yolu Cd. 20/20A',
  addressLocality: 'Çanakkale',
  addressRegion: 'Çanakkale',
  postalCode: '17110',
  addressCountry: 'TR',
}

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 40.1553,
  longitude: 26.4142,
}

const AREA_SERVED = ['Çanakkale Merkez', 'Kepez', 'Dardanos', 'Yukarıinova', 'Çınarlı'].map(
  (name) => ({ '@type': 'Place', name })
)

const SERVICES = [
  {
    name: 'Mimari Proje',
    description:
      'Konsept tasarımdan ruhsatlandırma ve uygulama projelerine kadar mimari sürecin bütüncül yürütülmesi.',
  },
  {
    name: 'İç Mekân ve Konsept Tasarımı',
    description:
      'İşlev, malzeme, ışık ve doku bütünlüğü içinde mekânın kullanıcı ihtiyaçlarına göre yeniden tasarlanması.',
  },
  {
    name: 'Proje Uygulama Danışmanlığı',
    description: 'Mimari ruhsat ve uygulama projelerinin sahada doğru uygulanması için saha denetimi ve danışmanlık.',
  },
  { name: 'Müteahhitlik', description: 'Arsaların projelendirilmesi ve inşaat süreçlerinin uçtan uca yürütülmesi.' },
  {
    name: 'Taahhüt İşleri',
    description: 'Tasarlanan projelerin yapı inşası veya iç mekân uygulamalarının anahtar teslim tamamlanması.',
  },
]

const FOUNDER = {
  '@type': 'Person',
  '@id': `${SITE_URL}/idil/#person`,
  name: 'Nilüfer İdil Postacı',
  jobTitle: 'Kurucu · Mimar',
  image: `${SITE_URL}/images/about/idil-hakkinda.webp`,
  url: `${SITE_URL}/idil/`,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'nip Mimarlık',
      inLanguage: 'tr-TR',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'tr-TR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'nip Mimarlık',
      alternateName: 'nip Mimarlık ve Yapı',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logos/nip-logos/nip-dark.webp`,
      },
      image: OG_IMAGE,
      founder: FOUNDER,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90 531 656 29 09',
        email: 'info@nipmimarlik.com',
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: ['Turkish'],
      },
      sameAs: ['https://instagram.com/nipmimarlik'],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projeler`,
      name: 'nip Mimarlık Projeleri',
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: p.description,
          image: p.images[0],
          url: `${SITE_URL}/#projeler`,
          about: p.typology,
          creator: { '@id': `${SITE_URL}/#organization` },
          locationCreated: { '@type': 'Place', name: p.location },
        },
      })),
    },
    {
      '@type': ['LocalBusiness', 'Architect', 'GeneralContractor'],
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'nip Mimarlık',
      image: OG_IMAGE,
      url: SITE_URL,
      telephone: '+90 531 656 29 09',
      email: 'info@nipmimarlik.com',
      address: ADDRESS,
      geo: GEO,
      areaServed: AREA_SERVED,
      founder: FOUNDER,
      sameAs: ['https://instagram.com/nipmimarlik'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Hizmetler',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
            areaServed: 'Çanakkale',
          },
        })),
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="nip Mimarlık" />
        <link rel="canonical" href={SITE_URL} />
        <link
          rel="preload"
          as="image"
          href="/images/logos/nip-logos/nip-light.webp"
          fetchpriority="high"
        />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="nip Mimarlık" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="nip Mimarlık — Çanakkale mimarlık ve yapı stüdyosu" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <meta name="geo.region" content="TR-17" />
        <meta name="geo.placename" content="Çanakkale" />
        <meta name="geo.position" content="40.1553;26.4142" />
        <meta name="ICBM" content="40.1553, 26.4142" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="home-ambient" aria-hidden="true">
        <TopoLines tone="paper" parallax={false} seed={2} />
      </div>

      <main id="main-content">
        <Hero />
        <Manifesto />
        <Projects />
        <div className="container">
          <Services />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
