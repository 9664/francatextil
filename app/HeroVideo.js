'use client';

import { useEffect, useRef, useState } from 'react';

const HERO_PARTS=[
  '/hero-v6/v2-00-0.b64','/hero-v6/v2-00-1.b64','/hero-v6/v2-00-2.b64','/hero-v6/v2-00-3.b64',
  '/hero-v6/v2-01-0.b64','/hero-v6/v2-01-1.b64','/hero-v6/v2-01-2.b64','/hero-v6/v2-01-3.b64',
  '/hero-v6/part02.b64','/hero-v6/part03.b64','/hero-v6/part04.b64','/hero-v6/part05.b64'
];

export default function HeroVideo({ticketUrl,whatsappUrl,location='LOCAL EM BREVE'}){
  const videoRef=useRef(null);
  const [videoSrc,setVideoSrc]=useState('');
  const [mediaStatus,setMediaStatus]=useState('loading');

  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    Promise.all(HERO_PARTS.map(url=>fetch(url,{cache:'force-cache'}).then(r=>{
      if(!r.ok) throw new Error(`hero:${url}`);
      return r.text();
    })))
      .then(parts=>{
        if(!alive)return;
        const clean=parts.join('').replace(/\s+/g,'');
        const binary=atob(clean);
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
        objectUrl=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
        setVideoSrc(objectUrl);
      })
      .catch(err=>{
        console.error('Hero media failed',err);
        if(alive)setMediaStatus('error');
      });
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video||!videoSrc)return;
    const ready=()=>{
      setMediaStatus('ready');
      video.muted=true;
      video.play().catch(()=>setMediaStatus('ready'));
    };
    const failed=()=>setMediaStatus('error');
    if(video.readyState>=2)ready();
    else video.addEventListener('canplay',ready,{once:true});
    video.addEventListener('error',failed,{once:true});
    return()=>{
      video.removeEventListener('canplay',ready);
      video.removeEventListener('error',failed);
    };
  },[videoSrc]);

  return <section id="inicio" className="heroVideoSection">
    <img className="heroVideoPoster" src="/scene1.webp" alt="" aria-hidden="true"/>
    <video ref={videoRef} className="heroVideoBg" src={videoSrc||undefined} autoPlay muted loop playsInline preload="auto" aria-hidden="true"/>
    <div className="heroVideoShade" aria-hidden="true"/>
    <div className="heroVideoThreads" aria-hidden="true"><i/><i/><i/></div>
    <div className="heroVideoContent">
      <span className="heroEyebrow">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
      <h1>UMA NOVA INDÚSTRIA<br/><em>ESTÁ GANHANDO ESCALA.</em></h1>
      <p>Um polo jovem, com menos de duas décadas, mais de 1.500 empresas em Franca e uma cadeia que continua em expansão.</p>
      <div className="heroVideoActions"><a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a><a className="outline" href={whatsappUrl} target="_blank" rel="noopener">WHATSAPP</a></div>
    </div>
    <div className="heroVideoLocation">{location}</div>
    <a className="heroNext" href="#do-fio-ao-clique">ENTRE NA JORNADA <span>↓</span></a>
    <div className={`heroMediaStatus ${mediaStatus==='ready'?'ready':''}`}>{mediaStatus==='loading'?'CARREGANDO EXPERIÊNCIA':mediaStatus==='error'?'VÍDEO EM MODO DE SEGURANÇA':''}</div>
  </section>;
}
