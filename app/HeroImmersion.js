'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const CHAIN = ['FIO','TECIDO','CORTE','CONFECÇÃO','ESTAMPARIA','MARCA','E-COMMERCE','CONSUMIDOR'];

function clamp(v,min=0,max=1){return Math.min(max,Math.max(min,v));}

export default function HeroImmersion({ticketUrl, whatsappUrl, location='LOCAL EM BREVE', exhibitorsCount=19}){
  const sectionRef=useRef(null);
  const canvasRef=useRef(null);
  const videoRef=useRef(null);
  const frameRef=useRef(0);
  const progressRef=useRef(0);
  const [stage,setStage]=useState(0);
  const [chainIndex,setChainIndex]=useState(0);
  const [videoSrc,setVideoSrc]=useState('');

  useEffect(()=>{
    let alive=true;
    fetch('/hero-video.b64')
      .then(r=>r.text())
      .then(encoded=>{
        if(!alive)return;
        const clean=encoded.trim();
        const binary=atob(clean);
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
        const url=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
        setVideoSrc(url);
        return url;
      })
      .catch(()=>{});
    return()=>{alive=false;};
  },[]);

  useEffect(()=>{
    const el=sectionRef.current;
    const canvas=canvasRef.current;
    if(!el||!canvas)return;
    const ctx=canvas.getContext('2d',{alpha:true});
    let w=0,h=0,dpr=1;
    let lastStage=-1,lastChain=-1;

    function resize(){
      dpr=Math.min(window.devicePixelRatio||1,1.5);
      w=window.innerWidth; h=window.innerHeight;
      canvas.width=Math.floor(w*dpr); canvas.height=Math.floor(h*dpr);
      canvas.style.width=w+'px'; canvas.style.height=h+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function readScroll(){
      const rect=el.getBoundingClientRect();
      const travel=Math.max(1,el.offsetHeight-window.innerHeight);
      const p=clamp((-rect.top)/travel);
      progressRef.current=p;
      el.style.setProperty('--journey',p.toFixed(4));
      const s=p<.22?0:p<.45?1:p<.72?2:3;
      if(s!==lastStage){lastStage=s;setStage(s);}
      if(s===2){
        const local=clamp((p-.45)/.27);
        const idx=Math.min(CHAIN.length-1,Math.floor(local*CHAIN.length));
        if(idx!==lastChain){lastChain=idx;setChainIndex(idx);}
      }
    }

    function draw(time){
      const p=progressRef.current;
      ctx.clearRect(0,0,w,h);
      const cx=w*(.52+Math.sin(time*.00025)*.015);
      const cy=h*(.49-Math.cos(time*.00018)*.01);
      const palette=['#00c8ff','#ff168a','#ffd500'];
      ctx.globalCompositeOperation='screen';
      for(let i=0;i<42;i++){
        const side=i%2===0?-1:1;
        const rank=Math.floor(i/2);
        const baseY=(rank/21-.5)*h*1.35;
        const swing=Math.sin(time*.00045+i*.72+p*7)*35;
        const startX=side<0?-w*.15:w*1.15;
        const startY=h*.5+baseY+swing;
        const depth=.24+(i%7)*.035+p*.35;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        const cp1x=side<0?w*.18:w*.82;
        const cp1y=startY*(.88-depth*.12)+cy*depth*.12;
        const cp2x=cx+side*w*(.09-.055*p);
        const cp2y=cy+(baseY*.12)*(1-p*.65);
        ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,cx,cy);
        ctx.strokeStyle=palette[i%3];
        ctx.globalAlpha=.08+(i%5)*.022+p*.09;
        ctx.lineWidth=.45+(i%4)*.25;
        ctx.stroke();
      }
      ctx.globalAlpha=1;
      ctx.globalCompositeOperation='source-over';
      frameRef.current=requestAnimationFrame(draw);
    }

    resize(); readScroll();
    window.addEventListener('resize',resize,{passive:true});
    window.addEventListener('scroll',readScroll,{passive:true});
    frameRef.current=requestAnimationFrame(draw);
    return()=>{
      window.removeEventListener('resize',resize);
      window.removeEventListener('scroll',readScroll);
      cancelAnimationFrame(frameRef.current);
    };
  },[]);

  useEffect(()=>{
    const v=videoRef.current;
    if(v&&videoSrc){v.play().catch(()=>{});}
  },[videoSrc]);

  const stats=useMemo(()=>[
    ['+2.000','indústrias e empresas D2C*'],
    ['2º','polo nacional de e-commerce D2C*'],
    ['100+','anos de tradição produtiva*'],
    [String(exhibitorsCount),'expositores confirmados']
  ],[exhibitorsCount]);

  return <section ref={sectionRef} className="immersionJourney" id="inicio">
    <div className="immersionSticky">
      <video ref={videoRef} className="immersionVideo" src={videoSrc||undefined} poster="/scene1.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <canvas ref={canvasRef} className="threadCanvas" aria-hidden="true" />
      <div className="immersionVignette" aria-hidden="true" />
      <div className="immersionGrain" aria-hidden="true" />

      <div className={'journeyPanel arrival '+(stage===0?'isActive':'')}>
        <div className="arrivalBrand"><img src="/brand-lockup.webp" alt="Expo Franca Têxtil Summit" /></div>
        <div className="arrivalCopy">
          <span className="journeyKicker">16 — 17 SETEMBRO 2026 · FRANCA/SP</span>
          <h1>A NOVA INDÚSTRIA<br/>TÊXTIL <em>ACONTECE AQUI.</em></h1>
          <p>Do fio ao clique. Da fábrica ao consumidor. Dois dias reunindo quem produz, transforma, vende e acelera a nova economia têxtil.</p>
          <div className="journeyActions"><a href={ticketUrl} target="_blank" rel="noopener">GARANTA SEU INGRESSO ↗</a><a className="outline" href={whatsappUrl} target="_blank" rel="noopener">WHATSAPP</a></div>
        </div>
        <div className="journeyScroll">ROLE PARA ENTRAR <span>↓</span></div>
      </div>

      <div className={'journeyPanel manifestoPanel '+(stage===1?'isActive':'')}>
        <span className="journeyKicker">01 / O MOVIMENTO</span>
        <h2>UMA NOVA ECONOMIA<br/><em>ESTÁ SENDO TECIDA.</em></h2>
        <p>Franca aprendeu a fabricar para o Brasil. Agora produção, tecnologia, marca própria e venda direta se encontram em uma nova cadeia de valor.</p>
      </div>

      <div className={'journeyPanel chainPanel '+(stage===2?'isActive':'')}>
        <span className="journeyKicker">02 / DO FIO AO CLIQUE</span>
        <h2>UMA CADEIA.<br/><em>OITO TRANSFORMAÇÕES.</em></h2>
        <div className="chainJourney">{CHAIN.map((item,i)=><div key={item} className={i===chainIndex?'active':i<chainIndex?'passed':''}><span>{String(i+1).padStart(2,'0')}</span><b>{item}</b></div>)}</div>
      </div>

      <div className={'journeyPanel scalePanel '+(stage===3?'isActive':'')}>
        <span className="journeyKicker">03 / ESCALA</span>
        <h2>FRANCA EM<br/><em>MOVIMENTO.</em></h2>
        <div className="floatingStats">{stats.map(([n,t])=><div key={n}><strong>{n}</strong><span>{t}</span></div>)}</div>
        <a className="journeyExit" href="#expositores">CONHEÇA QUEM JÁ ESTÁ DENTRO ↓</a>
      </div>

      <div className="journeyLocation">{location}</div>
    </div>
  </section>;
}
