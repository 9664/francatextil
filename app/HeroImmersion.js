'use client';

import { useEffect, useRef, useState } from 'react';

const CHAIN=['FIO','TECIDO','CORTE','CONFECÇÃO','ESTAMPARIA','MARCA','E-COMMERCE','CONSUMIDOR'];
const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));

export default function HeroImmersion({ticketUrl,whatsappUrl,location='LOCAL EM BREVE',exhibitorsCount=19}){
  const sectionRef=useRef(null);
  const videoRef=useRef(null);
  const rafRef=useRef(0);
  const durationRef=useRef(10);
  const scrubRef=useRef(false);
  const [stage,setStage]=useState(0);
  const [chainIndex,setChainIndex]=useState(0);
  const [videoSrc,setVideoSrc]=useState('');

  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    fetch('/hero-video.b64')
      .then(r=>{if(!r.ok)throw new Error('video');return r.text();})
      .then(encoded=>{
        if(!alive)return;
        const clean=encoded.replace(/\s+/g,'');
        const binary=atob(clean);
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
        objectUrl=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
        setVideoSrc(objectUrl);
      }).catch(()=>{});
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  useEffect(()=>{
    const section=sectionRef.current;
    const video=videoRef.current;
    if(!section)return;
    let lastStage=-1,lastChain=-1;

    const tick=()=>{
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      const p=clamp((-rect.top)/travel);
      section.style.setProperty('--journey',p.toFixed(4));

      const nextStage=p<.22?0:p<.46?1:p<.74?2:3;
      if(nextStage!==lastStage){lastStage=nextStage;setStage(nextStage);}
      if(nextStage===2){
        const local=clamp((p-.46)/.28);
        const idx=Math.min(CHAIN.length-1,Math.floor(local*CHAIN.length));
        if(idx!==lastChain){lastChain=idx;setChainIndex(idx);}
      }

      if(video&&video.readyState>=2){
        const duration=Number.isFinite(video.duration)&&video.duration>0?video.duration:durationRef.current;
        durationRef.current=duration;
        if(p>.025&&!scrubRef.current){
          scrubRef.current=true;
          video.pause();
        }
        if(scrubRef.current){
          const target=clamp((p-.025)/.95)*Math.max(.1,duration-.06);
          const diff=target-video.currentTime;
          if(Math.abs(diff)>.018){
            try{video.currentTime+=diff*.24;}catch{}
          }
        }
      }
      rafRef.current=requestAnimationFrame(tick);
    };
    rafRef.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(rafRef.current);
  },[videoSrc]);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video||!videoSrc)return;
    scrubRef.current=false;
    const start=()=>video.play().catch(()=>{});
    if(video.readyState>=2)start(); else video.addEventListener('canplay',start,{once:true});
    return()=>video.removeEventListener('canplay',start);
  },[videoSrc]);

  const stats=[
    ['+1.500','empresas em Franca e um ecossistema em expansão'],
    ['<20','anos de formação e aceleração do polo têxtil'],
    [String(exhibitorsCount),'expositores confirmados nesta edição'],
    ['2','dias para conectar indústria, tecnologia e mercado']
  ];

  return <section ref={sectionRef} className="immersionJourney" id="inicio">
    <div className="immersionSticky">
      <video ref={videoRef} className="immersionVideo" src={videoSrc||undefined} poster="/scene1.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="immersionWash" aria-hidden="true" />
      <div className="threadSignature" aria-hidden="true"><i/><i/><i/></div>

      <div className={'journeyPanel arrival '+(stage===0?'isActive':'')}>
        <div className="arrivalCopy">
          <span className="journeyKicker">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
          <h1>UMA NOVA INDÚSTRIA<br/><em>ESTÁ GANHANDO ESCALA.</em></h1>
          <p>Um polo jovem, com menos de duas décadas, mais de 1.500 empresas em Franca e uma cadeia que continua em expansão.</p>
          <div className="journeyActions"><a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a><a className="outline" href={whatsappUrl} target="_blank" rel="noopener">WHATSAPP</a></div>
        </div>
        <div className="journeyScroll">ROLE DEVAGAR · O VÍDEO RESPONDE AO SCROLL <span>↓</span></div>
      </div>

      <div className={'journeyPanel manifestoPanel '+(stage===1?'isActive':'')}>
        <span className="journeyKicker">01 / UM POLO JOVEM</span>
        <h2>MENOS DE 20 ANOS.<br/><em>UMA EXPANSÃO QUE JÁ MUDOU FRANCA.</em></h2>
        <p>Confecção, insumos, impressão, máquinas, tecnologia e venda digital passaram a formar um ecossistema próprio. O Summit coloca essa cadeia no mesmo espaço.</p>
      </div>

      <div className={'journeyPanel chainPanel '+(stage===2?'isActive':'')}>
        <span className="journeyKicker">02 / DO FIO AO CLIQUE</span>
        <h2>A CADEIA AVANÇA<br/><em>ENQUANTO VOCÊ AVANÇA.</em></h2>
        <div className="chainJourney">{CHAIN.map((item,i)=><div key={item} className={i===chainIndex?'active':i<chainIndex?'passed':''}><span>{String(i+1).padStart(2,'0')}</span><b>{item}</b></div>)}</div>
      </div>

      <div className={'journeyPanel scalePanel '+(stage===3?'isActive':'')}>
        <span className="journeyKicker">03 / ESCALA REAL</span>
        <h2>FRANCA NÃO ESTÁ<br/><em>COMEÇANDO. ESTÁ ACELERANDO.</em></h2>
        <div className="floatingStats">{stats.map(([n,t])=><div key={n}><strong>{n}</strong><span>{t}</span></div>)}</div>
        <a className="journeyExit" href="#expositores">AGORA, CONHEÇA QUEM JÁ ESTÁ DENTRO ↓</a>
      </div>

      <div className="journeyLocation">{location}</div>
    </div>
  </section>;
}
