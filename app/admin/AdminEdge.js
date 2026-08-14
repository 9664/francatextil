'use client';
import {useEffect,useMemo,useState} from 'react';

const ENDPOINT='https://psqxnscthiyhossgqyzn.supabase.co/functions/v1/cms-admin';
const KEY='sb_publishable_mrO_3ecMtuNLAWs7CRnJuA_RE-zynvb';
const TABS=['Dashboard','Notícias','Expositores','Programação','Configurações'];

const statusLabel=(v)=>String(v||'').toLowerCase()==='published'?'PUBLICADO':'RASCUNHO';

export default function AdminEdge(){
 const [secret,setSecret]=useState(''),[ok,setOk]=useState(false),[msg,setMsg]=useState(''),[tab,setTab]=useState('Dashboard'),[busy,setBusy]=useState(false);
 const [data,setData]=useState({articles:[],exhibitors:[],schedule:[],settings:[]});
 const [article,setArticle]=useState({title:'',excerpt:'',body:'',status:'draft',featured:false});
 const [exhibitor,setExhibitor]=useState({name:'',category:''});
 const [item,setItem]=useState({day:'2026-09-16',time:'09:00',title:'',description:''});

 async function call(action,payload={}){
  const r=await fetch(ENDPOINT,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({action,secret,payload})});
  const j=await r.json(); if(!r.ok)throw new Error(j.error||'Falha no CMS'); return j;
 }
 async function load(s=secret){
  setBusy(true);
  try{
   const r=await fetch(ENDPOINT,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify({action:'dashboard',secret:s,payload:{}})});
   const j=await r.json(); if(!r.ok)throw new Error(); setData(j); setOk(true); localStorage.setItem('ft_cms_key',s); setMsg('');
  }catch{setOk(false);setMsg('Chave administrativa inválida.')}finally{setBusy(false)}
 }
 useEffect(()=>{const s=localStorage.getItem('ft_cms_key');if(s){setSecret(s);load(s)}},[]);
 async function run(fn,success){setBusy(true);try{await fn();await load();if(success)setMsg(success)}catch(e){setMsg(e.message||'Não foi possível concluir a operação.')}finally{setBusy(false)}}
 async function addArticle(e){e.preventDefault();run(async()=>{await call('add_article',article);setArticle({title:'',excerpt:'',body:'',status:'draft',featured:false})},'Matéria salva e sincronizada com a home.')}
 async function addExhibitor(e){e.preventDefault();run(async()=>{await call('add_exhibitor',exhibitor);setExhibitor({name:'',category:''})},'Expositor adicionado.')}
 async function addSchedule(e){e.preventDefault();run(async()=>{await call('add_schedule',item);setItem({day:'2026-09-16',time:'09:00',title:'',description:''})},'Item incluído na programação.')}
 async function saveEvent(e){e.preventDefault();const f=new FormData(e.currentTarget);run(()=>call('update_event',{venue:f.get('venue')||'',ticket_url:f.get('ticket')||''}),'Configurações do evento atualizadas.')}

 if(!ok)return <div className="loginWrap"><form className="loginCard" onSubmit={e=>{e.preventDefault();load()}}><img src="/brand-lockup.webp" alt="Franca Têxtil"/><span className="loginKicker">CENTRAL DE OPERAÇÃO · 2026</span><h1>Controle do evento</h1><p>Conteúdo, expositores e programação que alimentam a home em tempo real.</p><input type="password" required value={secret} onChange={e=>setSecret(e.target.value)} placeholder="Chave administrativa"/><button className="btn">Entrar no painel</button>{msg&&<small>{msg}</small>}<a href="/">← Voltar ao site</a></form></div>;

 const event=data.settings?.find(x=>x.key==='event')?.value||{};
 const published=data.articles?.filter(x=>x.status==='published').length||0;
 const drafts=(data.articles?.length||0)-published;
 const activeExhibitors=data.exhibitors?.filter(x=>x.active).length||0;
 const day16=data.schedule?.filter(x=>String(x.event_day||'').includes('2026-09-16')).length||0;
 const day17=data.schedule?.filter(x=>String(x.event_day||'').includes('2026-09-17')).length||0;
 const pageTitle={Dashboard:'Visão geral',Notícias:'Conteúdo editorial',Expositores:'Área de negócios',Programação:'Agenda do Summit',Configurações:'Evento e conversão'}[tab];

 return <main className="adminShell">
  <aside className="adminSide">
   <div className="sideBrand"><img src="/brand-lockup.webp" alt="Franca Têxtil"/><span>CENTRAL DE OPERAÇÃO</span></div>
   <nav>{TABS.map((x,i)=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}><small>0{i+1}</small><span>{x}</span></button>)}</nav>
   <div className="sideFoot"><a className="viewSite" href="/" target="_blank">Abrir home ↗</a><button className="textBtn" onClick={()=>{localStorage.removeItem('ft_cms_key');setOk(false)}}>Sair</button></div>
  </aside>

  <section className="adminMain">
   <header className="adminTop">
    <div><span className="eyebrow">EXPO FRANCA TÊXTIL · CMS</span><h1>{pageTitle}</h1><p>Alterações publicadas aqui alimentam diretamente a experiência do site.</p></div>
    <div className="topActions"><button className="refreshBtn" disabled={busy} onClick={()=>load()}>{busy?'SINCRONIZANDO…':'↻ ATUALIZAR'}</button><div className="status live"><i/> HOME SINCRONIZADA</div></div>
   </header>
   {msg&&<div className="notice">{msg}<button onClick={()=>setMsg('')}>×</button></div>}

   {tab==='Dashboard'&&<Dashboard data={data} published={published} drafts={drafts} activeExhibitors={activeExhibitors} day16={day16} day17={day17} setTab={setTab}/>} 

   {tab==='Notícias'&&<div className="adminTwo"><form className="adminForm" onSubmit={addArticle}><div className="formHead"><span>NOVO CONTEÚDO</span><h2>Criar matéria</h2><p>A publicação aparece automaticamente na área de notícias da home.</p></div><label>Título<input required value={article.title} onChange={e=>setArticle({...article,title:e.target.value})} placeholder="Título da matéria"/></label><label>Resumo<textarea value={article.excerpt} onChange={e=>setArticle({...article,excerpt:e.target.value})} placeholder="Resumo para o card"/></label><label>Texto<textarea className="bodyField" value={article.body} onChange={e=>setArticle({...article,body:e.target.value})} placeholder="Conteúdo completo"/></label><div className="formRow"><label>Status<select value={article.status} onChange={e=>setArticle({...article,status:e.target.value})}><option value="draft">Rascunho</option><option value="published">Publicar agora</option></select></label><label className="check"><input type="checkbox" checked={article.featured} onChange={e=>setArticle({...article,featured:e.target.checked})}/> Destaque na home</label></div><button className="btn" disabled={busy}>Salvar matéria</button></form><div className="adminList"><div className="listHead"><div><span>CONTEÚDO DO SITE</span><h2>Matérias</h2></div><b>{published} publicadas · {drafts} rascunhos</b></div>{data.articles?.map(a=><article key={a.id}><div><b>{a.title}</b><small><em className={a.status==='published'?'tag green':'tag'}>{statusLabel(a.status)}</em>{a.featured?' · DESTAQUE':''}</small></div><button onClick={()=>run(()=>call('toggle_article',{id:a.id}))}>{a.status==='published'?'Mover para rascunho':'Publicar'}</button></article>)}</div></div>}

   {tab==='Expositores'&&<div className="adminTwo"><form className="adminForm" onSubmit={addExhibitor}><div className="formHead"><span>ÁREA DE NEGÓCIOS</span><h2>Novo expositor</h2><p>Empresas ativas entram na listagem pública do Summit.</p></div><label>Empresa<input required value={exhibitor.name} onChange={e=>setExhibitor({...exhibitor,name:e.target.value})} placeholder="Nome da empresa"/></label><label>Categoria<input value={exhibitor.category} onChange={e=>setExhibitor({...exhibitor,category:e.target.value})} placeholder="Máquinas, malhas, tecnologia…"/></label><button className="btn" disabled={busy}>Adicionar expositor</button></form><div className="adminList"><div className="listHead"><div><span>CARROSSEL DA HOME</span><h2>Expositores</h2></div><b>{activeExhibitors} ativos</b></div>{data.exhibitors?.map(x=><article key={x.id}><div><b>{x.name}</b><small><em className={x.active?'tag green':'tag'}>{x.active?'ATIVO':'OCULTO'}</em>{x.category?` · ${x.category}`:''}</small></div><button onClick={()=>run(()=>call('toggle_exhibitor',{id:x.id}))}>{x.active?'Ocultar':'Ativar'}</button></article>)}</div></div>}

   {tab==='Programação'&&<div className="adminTwo"><form className="adminForm" onSubmit={addSchedule}><div className="formHead"><span>AGENDA OFICIAL</span><h2>Novo item</h2><p>O conteúdo é distribuído automaticamente entre as abas 16 SET e 17 SET.</p></div><div className="formRow"><label>Dia<input type="date" value={item.day} onChange={e=>setItem({...item,day:e.target.value})}/></label><label>Horário<input type="time" value={item.time} onChange={e=>setItem({...item,time:e.target.value})}/></label></div><label>Título<input required value={item.title} onChange={e=>setItem({...item,title:e.target.value})} placeholder="Nome da atividade"/></label><label>Descrição<textarea value={item.description} onChange={e=>setItem({...item,description:e.target.value})} placeholder="Descrição breve"/></label><button className="btn" disabled={busy}>Adicionar à programação</button></form><div className="adminList"><div className="listHead"><div><span>PROGRAMAÇÃO DA HOME</span><h2>Agenda</h2></div><b>{day16} no dia 16 · {day17} no dia 17</b></div>{data.schedule?.map(x=><article key={x.id}><div><b>{x.title}</b><small><em className="tag cyan">{String(x.event_day||'').slice(8,10)} SET</em> · {(x.starts_at||'').slice(0,5)}</small></div></article>)}</div></div>}

   {tab==='Configurações'&&<div className="settingsGrid"><form className="adminForm wide" onSubmit={saveEvent}><div className="formHead"><span>CONVERSÃO</span><h2>Evento e ingressos</h2><p>Estes dados controlam os principais CTAs e informações institucionais da home.</p></div><label>Local do evento<input name="venue" defaultValue={event.venue||''} placeholder="Local do evento"/></label><label>Link oficial de ingressos<input name="ticket" defaultValue={event.ticket_url||''} placeholder="https://…"/></label><button className="btn" disabled={busy}>Salvar configurações</button></form><div className="connectionCard"><span>ARQUITETURA</span><h2>Publicação conectada</h2><div className="flow"><b>CMS</b><i>→</i><b>SUPABASE EDGE</b><i>→</i><b>HOME</b></div><p>O painel grava as informações no backend e a home consome os dados públicos automaticamente.</p><a href="/" target="_blank">Ver resultado na home ↗</a></div></div>}
  </section>
 </main>
}

function Dashboard({data,published,drafts,activeExhibitors,day16,day17,setTab}){
 const modules=[
  {tab:'Expositores',k:'EXPOSITORES',value:activeExhibitors,copy:'marcas ativas na área de negócios',accent:'pink'},
  {tab:'Notícias',k:'CONTEÚDO',value:published,copy:`publicadas · ${drafts} rascunhos`,accent:'cyan'},
  {tab:'Programação',k:'PROGRAMAÇÃO',value:day16+day17,copy:`${day16} dia 16 · ${day17} dia 17`,accent:'yellow'},
  {tab:'Configurações',k:'CONVERSÃO',value:'ON',copy:'ingressos e dados do evento',accent:'green'}
 ];
 const recent=[...(data.articles||[])].slice(0,4);
 return <div className="dash">
  <section className="dashHero"><div><span>CONTROLE DA EXPERIÊNCIA</span><h2>A home começa<br/>aqui dentro.</h2><p>Gerencie conteúdo, marcas, programação e conversão sem editar código. O que estiver ativo no CMS é refletido no site público.</p><div className="dashHeroActions"><button onClick={()=>setTab('Notícias')}>+ Nova notícia</button><button onClick={()=>setTab('Expositores')}>+ Expositor</button><a href="/" target="_blank">Abrir home ↗</a></div></div><div className="syncGraphic"><small>FLUXO DE PUBLICAÇÃO</small><div><b>PAINEL</b><i>→</i><b>EDGE</b><i>→</i><b>HOME</b></div><p><em/> conexão ativa</p></div></section>
  <div className="moduleGrid">{modules.map(m=><button key={m.tab} className={`moduleCard ${m.accent}`} onClick={()=>setTab(m.tab)}><span>{m.k}</span><strong>{m.value}</strong><p>{m.copy}</p><i>Gerenciar →</i></button>)}</div>
  <div className="dashLower"><section className="homeMap"><div className="listHead"><div><span>MAPA DA HOME</span><h2>Módulos conectados</h2></div><b>ONLINE</b></div>{['Hero e conversão','Expositores','Programação','Notícias'].map((x,i)=><div className="homeRow" key={x}><small>0{i+1}</small><b>{x}</b><span><i/> sincronizado</span></div>)}</section><section className="recent"><div className="listHead"><div><span>ATIVIDADE</span><h2>Conteúdo recente</h2></div><button onClick={()=>setTab('Notícias')}>Ver todos</button></div>{recent.length?recent.map(x=><div className="recentRow" key={x.id}><em className={x.status==='published'?'tag green':'tag'}>{statusLabel(x.status)}</em><b>{x.title}</b></div>):<p className="empty">Nenhuma matéria cadastrada ainda.</p>}</section></div>
 </div>
}
