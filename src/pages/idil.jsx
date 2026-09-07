import Head from 'next/head'
import TopoLines from '../components/TopoLines'
import AboutIntro from '../components/AboutIntro'
import Education from '../components/Education'
import AboutVideo from '../components/AboutVideo'
import Footer from '../components/Footer'

const SITE_URL = 'https://nipmimarlik.com'
const TITLE = 'Nilüfer İdil Postacı | nip Mimarlık Kurucusu — Çanakkale Mimar'
const DESCRIPTION =
  'nip Mimarlık kurucusu mimar Nilüfer İdil Postacı hakkında: İstanbul Bilgi Üniversitesi mimarlık eğitimi, Çanakkale’deki saha deneyimi, tasarım yaklaşımı ve birlikte çalıştığı mimari projeler.'
const KEYWORDS =
  'Nilüfer İdil Postacı, İdil Postacı, nip Mimarlık kurucusu, Çanakkale mimar, mimar Çanakkale, İstanbul Bilgi Üniversitesi mimarlık'
const OG_IMAGE = `${SITE_URL}/images/og/og-idil.jpg`
const PAGE_URL = `${SITE_URL}/idil/`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'tr-TR',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'nip Mimarlık', url: SITE_URL },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'İdil Hakkında', item: PAGE_URL },
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${PAGE_URL}#profilepage`,
      dateCreated: '2026-01-01',
      mainEntity: { '@id': `${PAGE_URL}#person` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    {
      '@type': 'Person',
      '@id': `${PAGE_URL}#person`,
      name: 'Nilüfer İdil Postacı',
      jobTitle: 'Kurucu · Mimar',
      description: DESCRIPTION,
      image: `${SITE_URL}/images/about/idil-hakkinda.webp`,
      url: PAGE_URL,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'İstanbul Bilgi Üniversitesi',
      },
      knowsAbout: ['Mimari Proje', 'İç Mekân Tasarımı', 'Müteahhitlik', 'Proje Uygulama Danışmanlığı'],
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'nip Mimarlık',
        url: SITE_URL,
      },
    },
  ],
}

export default function Idil() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Nilüfer İdil" />
        <meta property="profile:last_name" content="Postacı" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="nip Mimarlık" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Nilüfer İdil Postacı — nip Mimarlık kurucusu" />

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
