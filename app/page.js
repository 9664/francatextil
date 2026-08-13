import { publicQuery } from '../lib/supabase';
import ScrollScenes from './ScrollScenes';
import './scene-assets.css';

const fallbackExhibitors=['GOL TÊXTIL','ECOMMERCE VERSO','PEDROSO TÊXTIL','BETINIS','ZANONE MALHAS','ZANONE CURSOS','ZANONE CONTÁBIL','STELLAR PRINT','MAGNA TECH','BM DO BRASIL','MAQ CENTER','MECOLOUR','HR TÊXTIL','YGUAÇU MÁQUINAS','METAL SETE','FINAL Z','FENIZ TÊXTIL','MARGIS','TW PRINT'];
const fallbackAgenda=[
 ['09h00','Abertura oficial','Boas-vindas e panorama do setor têxtil'],
 ['10h00','Do produto ao digital','Como criar, validar e lançar produtos de moda'],
 ['14h00','Marketplaces e varejo','Estratégias para escalar vendas online'],
 ['16h30','Cadeia produtiva e inovação','Tecnologia, maquinário e novos processos'],
 ['19h00','Conexões e negócios','Networking e oportunidades']
];

export default async function Home(){
  const [exRows,scheduleRows,articleRows,settingsRows]=await Promise.all([
    publicQuery('exhibitors?select=name,logo_url,website_url,stand&active=eq.true&order=sort_order.asc,name.asc'),
    publicQuery('schedule_items?select=event_day,starts_at,title,description,stage&active=eq.true&order=event_day.asc,sort_order.asc,starts_at.asc'),
    publicQuery('articles?select=title,slug,excerpt,cover_url,published_at&status=eq.published&order=featured.desc,published_at.desc&limit=6'),
    publicQuery('site_settings?select=key,value')
  ]);
  const settings=Object.fromEntries((settingsRows||[]).map(x=>[x.key,x.value]));
  const exhibitors=(exRows?.length?exRows.map(x=>x.name):fallbackExhibitors);
  const agenda=(scheduleRows?.length?scheduleRows.filter(x=>String(x.event_day).includes('2026-09-16')).map(x=>[(x.starts_at||'').slice(0,5).replace(':','h'),x.title,x.description||'']):fallbackAgenda);
  const ticketUrl=settings.ticket_url?.url||settings.ticket_url||'https://duoticket.com.br/evento/7887/Franca-T%C3%AAxtil';
  const whatsappUrl=settings.whatsapp_url?.url||settings.whatsapp_url||'https://wa.me/5516992679370';
  const instagramUrl=settings.instagram_url?.url||settings.instagram_url||'https://www.instagram.com/francatextil_/';
  const location=settings.location?.name||settings.location||'LOCAL EM BREVE';
  const articles=articleRows||[];
  return <main className="v2home">
    <ScrollScenes/>
    <div className="cinematicBackdrop" aria-hidden="true"><div className="scene scene1"/><div className="scene scene2"/><div className="scene scene3"/><div className="scene scene4"/><div className="scene scene5"/><div className="cinemaShade"/><div className="threadFlow"/></div>

    <header className="v2nav">
      <a href="#inicio" className="v2brand"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit"/></a>
      <nav><a href="#evento">O evento</a><a href="#expositores">Expositores</a><a href="#programacao">Programação</a><a href="#noticias">Notícias</a><a href={instagramUrl} target="_blank" rel="noopener">Instagram</a></nav>
      <a className="v2ticket" href={ticketUrl} target="_blank" rel="noopener">Garanta seu ingresso</a>
    </header>

    <section className="v2hero sceneTrigger" data-scene="1" id="inicio">
      <div className="heroInner">
        <div className="heroMark"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit 2026"/></div>
        <div className="heroCopy2">
          <span className="micro">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
          <h1>A nova indústria<br/>têxtil <em>acontece aqui.</em></h1>
          <p>Do fio ao clique. Da fábrica ao consumidor. Dois dias reunindo quem produz, transforma, vende e acelera a nova economia têxtil.</p>
          <div className="heroActions"><a className="yellowCta" href={ticketUrl} target="_blank" rel="noopener">Comprar ingresso ↗</a><a className="lineCta" href="#expositores">Conhecer expositores</a></div>
        </div>
        <div className="scrollCue"><span>ROLE PARA ENTRAR NA EXPERIÊNCIA</span><i>↓</i></div>
      </div>
    </section>

    <div className="v2ticker"><div>INDÚSTRIA · MODA · TECNOLOGIA · MAQUINÁRIO · E-COMMERCE · D2C · NEGÓCIOS · INOVAÇÃO · INDÚSTRIA · MODA · TECNOLOGIA · MAQUINÁRIO · E-COMMERCE · D2C · NEGÓCIOS · INOVAÇÃO ·</div></div>

    <section className="manifest sceneTrigger" data-scene="2" id="evento">
      <div className="v2wrap manifestGrid">
        <span className="sectionNo">01 / O MOVIMENTO</span>
        <h2>UMA NOVA ECONOMIA<br/><em>ESTÁ SENDO TECIDA.</em></h2>
        <div className="manifestCopy"><p>Franca construiu uma cultura industrial reconhecida pela capacidade de produzir. Agora, tecnologia, marca própria e venda direta criam uma segunda fronteira.</p><p><strong>O Summit é o ponto de encontro dessa transformação.</strong></p></div>
      </div>
    </section>

    <section className="chainV2 sceneTrigger" data-scene="3">
      <div className="v2wrap"><div className="v2Head"><span className="sectionNo">02 / CADEIA PRODUTIVA</span><h2>DO FIO <em>AO CLIQUE.</em></h2><p>O que antes parecia uma sequência de fornecedores agora funciona como um único ecossistema de produto, marca, tecnologia e mercado.</p></div>
      <div className="chainTrack">{['FIO','TECIDO','CORTE','CONFECÇÃO','ESTAMPARIA','MARCA','E-COMMERCE','CONSUMIDOR'].map((x,i)=><div className="chainNode" key={x}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b></div>)}</div></div>
    </section>

    <section className="numbersV2"><div className="v2wrap numbersGrid"><div><strong>+2.000</strong><span>indústrias e empresas D2C*</span></div><div><strong>2º</strong><span>polo nacional de e-commerce D2C*</span></div><div><strong>100+</strong><span>anos de tradição produtiva*</span></div><div><strong>{exhibitors.length}</strong><span>expositores confirmados</span></div></div></section>

    <section className="industryCinema sceneTrigger" data-scene="4">
      <div className="cinemaStatement"><span className="sectionNo">03 / INDÚSTRIA EM MOVIMENTO</span><h2>NÃO É PARA<br/>SÓ OLHAR.<br/><em>É PARA VER FUNCIONAR.</em></h2><p>Máquinas, processos, matéria-prima, impressão, confecção e tecnologia em uma experiência que aproxima quem faz de quem quer crescer.</p></div>
    </section>

    <section id="expositores" className="exhibitorsV2 sceneTrigger" data-scene="5"><div className="v2wrap">
      <div className="v2Head"><span className="sectionNo">04 / ÁREA DE NEGÓCIOS</span><h2>QUEM JÁ ESTÁ <em>DENTRO.</em></h2><p>Empresas que ajudam a construir a cadeia têxtil, industrial e digital. A grade cresce conforme novos expositores são confirmados.</p></div>
      <div className="exhibitorBoard" role="img" aria-label="Logos dos expositores confirmados"/>
      <div className="exNameStrip">{exhibitors.map(x=><span key={x}>{x}</span>)}</div>
    </div></section>

    <section id="programacao" className="programV2"><div className="v2wrap programGrid">
      <div><span className="sectionNo">05 / PROGRAMAÇÃO</span><h2>DOIS DIAS.<br/><em>MUITO CONTEÚDO.</em></h2><p className="programLead">Uma agenda para reduzir tentativa e erro e aproximar indústria, mercado e conhecimento aplicado.</p></div>
      <div className="agendaV2"><div className="dayTabs"><b>16 SET</b><span>17 SET</span></div>{agenda.map(([t,h,p],i)=><article key={`${t}-${i}`}><time>{t}</time><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
    </div></section>

    <section className="audienceV2"><div className="v2wrap"><span className="sectionNo">06 / PARA QUEM É</span><h2>SE VOCÊ FAZ A CADEIA GIRAR,<br/><em>O SUMMIT É SEU.</em></h2><div className="audienceLine">{['INDÚSTRIAS & CONFECÇÕES','MARCAS & EMPREENDEDORES','E-COMMERCES & MARKETPLACES','FORNECEDORES & PRESTADORES','ESTUDANTES & PROFISSIONAIS'].map(x=><div key={x}>{x}</div>)}</div></div></section>

    <section id="noticias" className="newsV2"><div className="v2wrap"><div className="v2Head"><span className="sectionNo">07 / CONTEÚDO</span><h2>O SETOR JÁ COMEÇOU<br/>A <em>SE MOVIMENTAR.</em></h2></div>{articles.length?<div className="newsCards">{articles.map(a=><article key={a.slug}><span>NOTÍCIA</span><h3>{a.title}</h3><p>{a.excerpt}</p><a href={`/noticias/${a.slug}`}>Ler matéria →</a></article>)}</div>:<article className="anchorNews"><span>MATÉRIA DESTAQUE</span><h3>Franca Têxtil Summit 2026 quer transformar a cidade em vitrine da nova economia têxtil</h3><p>O evento nasce no encontro entre tradição produtiva, empreendedorismo, tecnologia e venda direta ao consumidor.</p><a href="https://amofranca.com/materia/franca-textil-summit-2026-quer-transformar-a-cidade-em-vitrine-da-nova-economia-textil" target="_blank" rel="noopener">Ler no Amo Franca →</a></article>}</div></section>

    <section className="finalCta"><div className="v2wrap finalGrid"><div><span className="sectionNo">16 E 17 DE SETEMBRO · FRANCA/SP</span><h2>FAÇA PARTE<br/>DO <em>FUTURO TÊXTIL.</em></h2></div><div><p>Conexões que transformam. Conteúdo que gera resultado. Negócios que movimentam uma nova economia.</p><a className="finalTicket" href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a></div></div></section>

    <footer className="v2footer"><div className="v2wrap footerGrid"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit"/><div><b>CONTATO</b><a href={whatsappUrl} target="_blank" rel="noopener">WhatsApp · (16) 99267-9370</a><a href={instagramUrl} target="_blank" rel="noopener">Instagram · @francatextil_</a></div><div><b>EVENTO</b><span>16 e 17 de setembro de 2026</span><span>Franca · São Paulo</span></div></div><div className="footerFine">© 2026 Expo Franca Têxtil Summit. *Dados do material-base sujeitos a validação da organização.</div></footer>

    <a className="whatsFloat" href={whatsappUrl} target="_blank" rel="noopener" aria-label="Falar com a Franca Têxtil pelo WhatsApp"><span>WHATSAPP</span><b>↗</b></a>
  </main>
}
