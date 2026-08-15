'use client';

import { useEffect, useState } from 'react';

const heroParts=['/hero-v6/part00.b64','/hero-v6/part01.b64','/hero-v6/part02.b64','/hero-v6/part03.b64','/hero-v6/part04.b64','/hero-v6/part05.b64'];

function decodeBase64ToBlob(encoded,type='image/webp'){
  const clean=encoded.replace(/\s+/g,'');
  const binary=atob(clean);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new Blob([bytes],{type});
}

export default function HeroVideo({ticketUrl,whatsappUrl,location='LOCAL EM BREVE'}){
  const [heroUrl,setHeroUrl]=useState('');
  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    Promise.all(heroParts.map(src=>fetch(src,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(src);return r.text();})))
      .then(parts=>{
        if(!alive)return;
        objectUrl=URL.createObjectURL(decodeBase64ToBlob(parts.join('')));
        setHeroUrl(objectUrl);
      })
      .catch(err=>console.error('Falha ao carregar hero em alta',err));
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  return <section id="inicio" className="heroStaticSection">
    <img className="heroStaticBg" src={heroUrl||'/scene1.webp'} alt="Expo Franca Têxtil Summit em Franca" fetchPriority="high"/>
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
