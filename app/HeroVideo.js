'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo({ticketUrl,whatsappUrl,location='LOCAL EM BREVE'}){
  const videoRef=useRef(null);
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
      })
      .catch(()=>{});
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video||!videoSrc)return;
    const start=()=>video.play().catch(()=>{});
    if(video.readyState>=2)start();
    else video.addEventListener('canplay',start,{once:true});
    return()=>video.removeEventListener('canplay',start);
  },[videoSrc]);

  return <section id="inicio" className="heroVideoSection">
    <video ref={videoRef} className="heroVideoBg" src={videoSrc||undefined} poster="/scene1.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true"/>
    <div className="heroVideoShade" aria-hidden="true"/>
    <div className="heroVideoThreads" aria-hidden="true"><i/><i/><i/></div>
    <div className="heroVideoContent">
      <span className="heroEyebrow">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
      <h1>UMA NOVA INDÚSTRIA<br/><em>ESTÁ GANHANDO ESCALA.</em></h1>
      <p>Um polo jovem, com menos de duas décadas, mais de 1.500 empresas em Franca e uma cadeia que continua em expansão.</p>
      <div className="heroVideoActions"><a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a><a className="outline" href={whatsappUrl} target="_blank" rel="noopener">WHATSAPP</a></div>
    </div>
    <div className="heroVideoLocation">{location}</div>
    <a className="heroNext" href="#do-fio-ao-clique">DESCUBRA A JORNADA 3D <span>↓</span></a>
  </section>;
}
