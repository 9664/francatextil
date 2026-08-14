import { publicQuery } from '../lib/supabase';
import HeroVideo from './HeroVideo';
import TextileJourneyVideo from './TextileJourneyVideo';
import LogoCarousel from './LogoCarousel';
import ProgramSchedule from './ProgramSchedule';

const fallbackExhibitors=['GOL TÊXTIL','DISTRIBUIDOR DE CAMISETAS','ECOMMERCE VERSO','PEDROSO TÊXTIL',"BETINI'S",'FÊNIX TÊXTIL','TW PRINT','MARGIS TRANSPORTES','MOURA MALHAS','FINAL Z','YGUAÇU MÁQUINAS','HR TÊXTIL','MECOLOUR','MAQCENTER COSTURA','BM DO BRASIL','MAGNA TECH','STELLAR PRINT','CONTÁBIL ZANONE','ZANONE CURSOS','ZANONE MALHAS'];
const fallbackAgenda16=[['09h00','Abertura oficial','Boas-vindas e panorama do setor têxtil'],['10h00','Do produto ao digital','Como criar, validar e lançar produtos de moda'],['14h00','Marketplaces e varejo','Estratégias para escalar vendas online'],['16h30','Cadeia produtiva e inovação','Tecnologia, maquinário e novos processos'],['19h00','Conexões e negócios','Networking e oportunidades']];
const audiences=[
 {n:'01',icon:'⌁',title:'INDÚSTRIAS & CONFECÇÕES',copy:'Quem produz, transforma e busca eficiência, escala e novos fornecedores.',accent:'cyan'},
 {n:'02',icon:'✦',title:'MARCAS & EMPREENDEDORES',copy:'Quem cria produto, posiciona marca e quer transformar produção em negócio.',accent:'yellow'},
 {n:'03',icon:'↗',title:'E-COMMERCES & MARKETPLACES',copy:'Quem conecta produto ao consumidor e acelera a venda direta no digital.',accent:'pink'},
 {n:'04',icon:'⚙',title:'FORNECEDORES & PRESTADORES',copy:'Máquinas, insumos, tecnologia e serviços que fazem toda a cadeia avançar.',accent:'cyan'},
 {n:'05',icon:'＋',title:'ESTUDANTES & PROFISSIONAIS',copy:'Quem quer entrar, se atualizar e construir carreira na nova economia têxtil.',accent:'yellow'}
];
function normalizeSchedule(rows,day){return (rows||[]).filter(x=>String(x.event_day).includes(`2026-09-${day}`)).map(x=>({time:(x.starts_at||'').slice(0,5).replace(':','h'),title:x.title,description:x.description||''}));}

export default async function Home(){
 const [exRows,scheduleRows,articleRows,settingsRows]=await Promise.all([
  publicQuery('exhibitors?select=name,logo_url,website_url,stand&active=eq.true&order=sort_order.asc,name.asc'),
  publicQuery('schedule_items?select=event_day,starts_at,title,description,stage&active=eq.true&order=event_day.asc,sort_order.asc,starts_at.asc'),
  publicQuery('articles?select=title,slug,excerpt,cover_url,published_at&status=eq.published&order=featured.desc,published_at.desc&limit=6'),
  publicQuery('site_settings?select=key,value')
 ]);
 const settings=Object.fromEntries((settingsRows||[]).map(x=>[x.key,x.value]));
 const exhibitors=(exRows?.length?exRows.map(x=>x.name):fallbackExhibitors);
 const agenda16=normalizeSchedule(scheduleRows,'16'); const agenda17=normalizeSchedule(scheduleRows,'17');
 const items16=agenda16.length?agenda16:fallbackAgenda16.map(([time,title,description])=>({time,title,description}));
 const ticketUrl=settings.ticket_url?.url||settings.ticket_url||'https://duoticket.com.br/evento/7887/Franca-T%C3%AAxtil';
 const whatsappUrl=settings.whatsapp_url?.url||settings.whatsapp_url||'https://wa.me/5516992679370';
 const instagramUrl=settings.instagram_url?.url||settings.instagram_url||'https://www.instagram.com/francatextil_/';
 const location=settings.location?.name||settings.location||'LOCAL EM BREVE'; const articles=articleRows||[];
 return <main className="v3site">
   <header className="v3nav"><a href="#inicio" className="v3brand"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit"/></a><nav><a href="#expositores">Expositores</a><a href="#programacao">Programação</a><a href="#noticias">Notícias</a><a href={instagramUrl} target="_blank" rel="noopener">Instagram</a></nav><a className="v3navTicket" href={ticketUrl} target="_blank" rel="noopener">Ingresso ↗</a></header>
   <HeroVideo ticketUrl={ticketUrl} whatsappUrl={whatsappUrl} location={location}/>
   <TextileJourneyVideo/>
   <section id="expositores" className="v3section logoSection"><div className="v3wrap"><div className="v3sectionHead"><span>02 / ÁREA DE NEGÓCIOS</span><h2>MARCAS QUE JÁ<br/><em>ESTÃO NA TRAMA.</em></h2><p>20 empresas confirmadas. Uma amostra real da cadeia que vai se encontrar em Franca.</p></div><LogoCarousel/></div></section>
   <section id="programacao" className="v3section programSection"><div className="v3wrap programV3Grid"><div className="programIntro"><span>03 / PROGRAMAÇÃO</span><h2>DOIS DIAS.<br/><em>MUITO CONTEÚDO.</em></h2><p>Conteúdo aplicado para quem quer produzir, operar, vender e crescer. A agenda continua alimentada pelo CMS.</p></div><ProgramSchedule items16={items16} items17={agenda17}/></div></section>
   <section className="v3section audienceSection"><div className="audienceGlow"/><div className="v3wrap"><div className="audienceHeader"><div className="audienceTitle"><span>04 / PARA QUEM É</span><h2>TODA A CADEIA<br/><em>NO MESMO LUGAR.</em></h2></div><p>Do chão de fábrica à venda digital. O Summit foi desenhado para aproximar quem produz, quem fornece, quem cria e quem coloca o produto no mercado.</p></div><div className="audienceGrid">{audiences.map(a=><article key={a.n} className={`audienceCard ${a.accent}`}><div className="audienceTop"><small>{a.n}</small><i>{a.icon}</i></div><div><b>{a.title}</b><p>{a.copy}</p></div><span className="audienceLine"/></article>)}</div></div></section>
   <section id="noticias" className="v3section newsSection"><div className="v3wrap"><div className="newsTitle"><span>05 / CONTEÚDO</span><h2>O SETOR JÁ<br/><em>SE MOVIMENTA.</em></h2></div>{articles.length?<div className="v3NewsGrid">{articles.map(a=><article key={a.slug}><small>NOTÍCIA</small><h3>{a.title}</h3><p>{a.excerpt}</p><a href={`/noticias/${a.slug}`}>Ler matéria →</a></article>)}</div>:<article className="v3AnchorNews"><small>MATÉRIA ÂNCORA</small><h3>Franca Têxtil Summit 2026 quer transformar a cidade em vitrine da nova economia têxtil</h3><p>Um polo jovem, tecnologia, empreendedorismo e venda direta ao consumidor se encontram em setembro.</p><a href="https://amofranca.com/materia/franca-textil-summit-2026-quer-transformar-a-cidade-em-vitrine-da-nova-economia-textil" target="_blank" rel="noopener">Ler no Amo Franca →</a></article>}</div></section>
   <section className="v3Final"><div className="v3wrap finalV3Grid"><div><span>16 — 17 SETEMBRO · FRANCA/SP</span><h2>ENTRE NESSA<br/><em>NOVA TRAMA.</em></h2></div><div><p>Mais de 1.500 empresas, uma cadeia ainda em expansão e dois dias para conectar quem produz, vende, fornece e transforma.</p><a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a><a className="finalWhats" href={whatsappUrl} target="_blank" rel="noopener">FALAR NO WHATSAPP</a></div></div></section>
   <footer className="v3footer"><div className="v3wrap footerV3Grid"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit"/><div><b>CONTATO</b><a href={whatsappUrl} target="_blank" rel="noopener">(16) 99267-9370</a><a href={instagramUrl} target="_blank" rel="noopener">@francatextil_</a></div><div><b>EVENTO</b><span>16 e 17 de setembro de 2026</span><span>Franca · São Paulo</span></div></div><div className="v3fine">© 2026 Expo Franca Têxtil Summit.</div></footer><a className="v3WhatsFloat" href={whatsappUrl} target="_blank" rel="noopener" aria-label="Falar no WhatsApp">WHATSAPP ↗</a>
 </main>;
}
