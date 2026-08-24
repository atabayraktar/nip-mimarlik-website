import { Html, Head, Main, NextScript } from 'next/document'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Archivo:ital,wght@0,400;0,500;0,600;1,400&family=Archivo+Expanded:wght@400;500;600;700&display=swap'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Non-render-blocking font CSS load via document.write, deliberately
            NOT as a JSX <link> — next/document's Head strips/dedupes the
            href off any <link> (even a lone one inside <noscript>) that
            shares a URL with another font link on the page, which silently
            turned every JSX-based version of this preload/swap trick back
            into a no-op. Handing the tag to the browser directly sidesteps
            Head's processing entirely. No <noscript> fallback: a no-JS
            visitor just sees the existing CSS fallback font stack, which is
            an acceptable, non-broken degradation for this edge case. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.write('<link rel="stylesheet" href="${FONT_HREF}" media="print" onload="this.media=\\'all\\'">');`,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0B0B0C" />
        <meta name="application-name" content="nip Mimarlık" />
        <meta name="apple-mobile-web-app-title" content="nip Mimarlık" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
