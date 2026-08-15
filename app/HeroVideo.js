'use client';

export default function HeroVideo({ticketUrl,whatsappUrl,location='LOCAL EM BREVE'}){
  return <section id="inicio" className="heroStaticSection">
    <img
      className="heroStaticBg"
      src="/media/hero/Entrada%20Franca%20Textil.png"
      alt="Expo Franca Têxtil Summit em Franca"
      fetchPriority="high"
      decoding="async"
    />
    <div className="heroStaticShade" aria-hidden="true"/>
    <div className="heroStaticThreads" aria-hidden="true"><i/><i/><i/></div>
    <div className="heroStaticContent">
      <span className="heroStaticEyebrow">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
      <h1>UMA NOVA INDÚSTRIA<br/><em>ESTÁ GANHANDO ESCALA.</em></h1>
      <p>Um polo jovem, com menos de duas décadas, mais de 1.500 empresas em Franca e uma cadeia que continua em expansão.</p>
      <div className="heroStaticActions">
        <a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a>
        <a className="outline" href={whatsappUrl} target="_blank" rel="noopener">WHATSAPP</a>
      </div>
    </div>
    <div className="heroStaticLocation">{location}</div>
    <a className="heroStaticNext" href="#do-fio-ao-clique">ENTRE NA JORNADA <span>↓</span></a>
  </section>;
}
