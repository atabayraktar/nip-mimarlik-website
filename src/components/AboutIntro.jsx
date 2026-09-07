import Eyebrow from './Eyebrow'

export default function AboutIntro() {
  return (
    <section id="hakkinda" data-theme="paper" className="about-intro">
      <div className="container about-intro__inner">
        <div className="about-intro__portrait" data-reveal>
          <img
            src="/images/about/idil-hakkinda.webp"
            srcSet="/images/about/idil-hakkinda-840.webp 840w, /images/about/idil-hakkinda.webp 1600w"
            sizes="(min-width: 900px) 420px, 100vw"
            alt="Nilüfer İdil Postacı portresi"
            width={1600}
            height={2400}
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <div className="about-intro__text" data-reveal data-reveal-delay="150">
          <div className="about-intro__heading">
            <Eyebrow as="p">Kurucu · Mimar</Eyebrow>
            <h1 className="about-intro__name">
              Nilüfer <em>İdil Postacı</em>
            </h1>
          </div>

          <div className="about-intro__bio-group">
            <p className="about-intro__bio">
              Mimarlık benim için, tıpkı sanat gibi, kendimi ifade edebilme biçimlerimden biri.
              Hayatım boyunca tasarıma, sanata ve estetiğe duyduğum ilgi, zaman içerisinde
              dünyayı algılama ve yorumlama biçimimin önemli bir parçası hâline geldi. Bu sayede
              mimarlık pratiğim, hayata bakışımla birlikte şekillenen ve gelişen bir düşünce
              biçimine dönüştü.
            </p>
            <p className="about-intro__bio">
              Mimarlık eğitimimi 2021 yılında İstanbul Bilgi Üniversitesi Mimarlık Fakültesi’nde
              tamamladım ve ardından aynı üniversitede yüksek lisans eğitimime devam ettim.
              Akademik süreç boyunca farklı ölçek ve niteliklerde projeler geliştirdim, çeşitli
              tasarım yaklaşımları üzerine çalıştım ve mimari yarışmalarda yer aldım.
            </p>
            <p className="about-intro__bio">
              Eğitimimin ardından, ailemin uzun yıllardır inşaat sektöründe faaliyet göstermesi
              sayesinde doğrudan saha deneyimi edinme fırsatı buldum. Tasarım aşamasından
              uygulamaya uzanan süreçte aktif olarak yer alarak, projelerin yaratıcılığın soyut
              dünyasından çıkıp gerçekliğin somutluğuyla nasıl buluştuğunu deneyimledim. Bu
              süreç, tasarım kararlarını uygulama, malzeme, detay ve saha gerçekleriyle birlikte
              ele alan bütüncül yaklaşımımın temelini oluşturdu.
            </p>
            <p className="about-intro__bio">
              Nip Mimarlık ve Yapı’nın kuruluşu da bu deneyimlerin bir sonucu oldu. İnşaat
              sektörünü hem işveren olarak içeriden deneyimlemek hem de mimar olarak farklı
              işverenlerin yaklaşım ve beklentilerini gözlemlemek, aynı üretim sürecini iki
              farklı perspektiften okuyabilme ve her iki tarafın önceliklerini birlikte
              değerlendirebilmemi sağladı.
            </p>
            <p className="about-intro__bio">
              Bu iki perspektiften yola çıkarak, işverenin ihtiyaç ve beklentilerini doğru
              okuyabilen, çevresiyle ilişki kuran, estetik ve fonksiyonel tasarımı odağına alan
              bir mimarlık anlayışı benimsedim. Nip Mimarlık ve Yapı da bu anlayışla geliştirilen
              tasarımların, talep doğrultusunda sahada aynı mimari yaklaşımla hayata
              geçirilebildiği bütüncül bir yapı fikrinden doğdu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
