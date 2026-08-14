'use client';

import {useEffect,useRef,useState} from 'react';

const SCENES=[
  {kicker:'01 / ORIGEM',title:'TUDO COMEÇA NO FIO.',copy:'É aqui que a cadeia começa: matéria-prima, textura e possibilidade.',source:{type:'b64',parts:['/journey-exact/01-0.b64','/journey-exact/01-1.b64']},focus:'58% 50%'},
  {kicker:'02 / PRECISÃO',title:'A LINHA ENCONTRA A AGULHA.',copy:'Técnica e detalhe transformam intenção em construção.',source:{type:'b64',url:'/journey-hires/s2.b64'},focus:'50% 50%'},
  {kicker:'03 / COSTURA',title:'A PRODUÇÃO GANHA RITMO.',copy:'Máquinas, processos e conhecimento colocam a indústria em movimento.',source:{type:'b64',url:'/journey-exact/03.b64'},focus:'50% 50%'},
  {kicker:'04 / PRODUTO',title:'DO PROCESSO NASCE VALOR.',copy:'A peça pronta reúne design, produção, marca e identidade.',source:{type:'b64',url:'/journey-exact/04.b64'},focus:'50% 52%'},
  {kicker:'05 / EMBALAGEM',title:'DO FIO AO CLIQUE.',copy:'Toda a cadeia no mesmo movimento — do produto ao mercado.',source:{type:'b64',url:'/journey-exact/05.b64'},focus:'58% 50%'}
];

const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));

async function materialize(source){
  const urls=source.parts||[source.url];
  const parts=await Promise.all(urls.map(async url=>{
    const r=await fetch(url,{cache:'force-cache'});
    if(!r.ok)throw new Error(url);
    return r.text();
  }));
  const encoded=parts.join('').replace(/\s+/g,'');
  const binary=atob(encoded);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
}

export default function TextileJourneyVideo(){
  const sectionRef=useRef(null),rafRef=useRef(0),urlsRef=useRef([]);
  const [assets,setAssets]=useState(Array(SCENES.length).fill(''));
  const [progress,setProgress]=useState(0),[status,setStatus]=useState('loading');

  useEffect(()=>{
    let alive=true;
    Promise.all(SCENES.map(s=>materialize(s.source)))
      .then(urls=>{
        if(!alive)return;
        urlsRef.current=urls;
        setAssets(urls);
        setStatus('ready');
      })
      .catch(err=>{
        console.error('Journey exact scene failed',err);
        if(alive)setStatus('error');
      });
    return()=>{
      alive=false;
      urlsRef.current.forEach(u=>URL.revokeObjectURL(u));
    };
  },[]);

  useEffect(()=>{
    const section=sectionRef.current;
    if(!section)return;
    let queued=false;
    const update=()=>{
      queued=false;
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      const p=clamp(-rect.top/travel);
      setProgress(prev=>Math.abs(prev-p)>.002?p:prev);
      section.style.setProperty('--journey-progress',p.toFixed(4));
    };
    const onScroll=()=>{
      if(queued)return;
      queued=true;
      rafRef.current=requestAnimationFrame(update);
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    update();
    return()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  },[]);

  const stage=progress*(SCENES.length-1);
  const active=Math.min(SCENES.length-1,Math.floor(stage+.12));
  const c=SCENES[active];

  return <section ref={sectionRef} id="do-fio-ao-clique" className="cinematicJourney stillJourney"><div className="cinematicSticky">
    <div className="stillStack" aria-hidden="true">{SCENES.map((s,i)=>{
      if(!assets[i])return null;
      const d=Math.abs(stage-i);
      const opacity=clamp(1-d*1.55);
      const local=clamp(stage-i+1,0,1);
      const scale=1.015+(local*.075);
      return <img key={i} src={assets[i]} className="journeyStill" alt="" style={{opacity,transform:`scale(${scale})`,objectPosition:s.focus}}/>;
    })}</div>
    <div className="stillVignette" aria-hidden="true"/>
    <div className="cinematicCopy" key={active}><span>{c.kicker}</span><h2>{c.title}</h2><p>{c.copy}</p></div>
    <div className="cinematicProgress" aria-hidden="true"><b style={{transform:`scaleX(${progress})`}}/></div>
    <div className="cinematicDots" aria-hidden="true">{SCENES.map((_,i)=><i key={i} className={i===active?'active':i<active?'passed':''}/>)}</div>
    <div className="cinematicHint">ROLE DEVAGAR · ENTRE NA CADEIA</div>
    {status==='loading'&&<div className="cinematicStatus">CARREGANDO EXPERIÊNCIA</div>}
    {status==='error'&&<div className="cinematicStatus error">NÃO FOI POSSÍVEL CARREGAR A JORNADA</div>}
  </div></section>;
}
