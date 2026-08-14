'use client';

import {useEffect,useRef,useState} from 'react';

const CHAPTERS=[
  {at:0,kicker:'01 / ORIGEM',title:'TUDO COMEÇA NO FIO.',copy:'A matéria-prima abre caminho para uma cadeia que cresce, se conecta e ganha escala.'},
  {at:.18,kicker:'02 / PRECISÃO',title:'A LINHA ENCONTRA A AGULHA.',copy:'Detalhe, técnica e conhecimento transformam intenção em construção.'},
  {at:.36,kicker:'03 / INDÚSTRIA',title:'TECNOLOGIA ENTRA EM MOVIMENTO.',copy:'Máquinas, processos e pessoas fazem a produção avançar.'},
  {at:.56,kicker:'04 / TRANSFORMAÇÃO',title:'DO TECIDO NASCE O PRODUTO.',copy:'A cadeia deixa de ser matéria-prima e passa a ganhar forma, valor e identidade.'},
  {at:.74,kicker:'05 / MERCADO',title:'DA PEÇA À ENTREGA.',copy:'Produto pronto, operação conectada e novos caminhos até o consumidor.'},
  {at:.89,kicker:'DO FIO AO CLIQUE',title:'TODA A CADEIA NO MESMO MOVIMENTO.',copy:'Produção, tecnologia, marca e mercado se encontram no Franca Têxtil Summit.'}
];

const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));

export default function TextileJourneyVideo(){
  const sectionRef=useRef(null);
  const videoRef=useRef(null);
  const rafRef=useRef(0);
  const [src,setSrc]=useState('');
  const [progress,setProgress]=useState(0);
  const [chapter,setChapter]=useState(0);

  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    const parts=Array.from({length:7},(_,i)=>`/journey-video/part${String(i).padStart(2,'0')}.b64`);
    Promise.all(parts.map(url=>fetch(url).then(r=>{if(!r.ok)throw new Error(url);return r.text();})))
      .then(chunks=>{
        if(!alive)return;
        const binary=atob(chunks.join('').replace(/\s+/g,''));
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
        objectUrl=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
        setSrc(objectUrl);
      }).catch(()=>{});
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  useEffect(()=>{
    const section=sectionRef.current;
    const video=videoRef.current;
    if(!section||!video)return;
    let queued=false;

    const update=()=>{
      queued=false;
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      const p=clamp(-rect.top/travel);
      setProgress(prev=>Math.abs(prev-p)>.004?p:prev);
      section.style.setProperty('--journey-progress',p.toFixed(4));

      let idx=0;
      for(let i=0;i<CHAPTERS.length;i++)if(p>=CHAPTERS[i].at)idx=i;
      setChapter(prev=>prev===idx?prev:idx);

      if(video.readyState>=1 && Number.isFinite(video.duration) && video.duration>0){
        video.pause();
        const t=Math.min(video.duration-.035,Math.max(.01,p*(video.duration-.07)));
        if(Math.abs(video.currentTime-t)>.012){
          try{video.currentTime=t;}catch{}
        }
      }
    };

    const onScroll=()=>{
      if(queued)return;
      queued=true;
      rafRef.current=requestAnimationFrame(update);
    };
    const onMeta=()=>{video.pause();try{video.currentTime=.01;}catch{};update();};

    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    video.addEventListener('loadedmetadata',onMeta);
    update();
    return()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      video.removeEventListener('loadedmetadata',onMeta);
      cancelAnimationFrame(rafRef.current);
    };
  },[src]);

  const c=CHAPTERS[chapter];
  return <section ref={sectionRef} id="do-fio-ao-clique" className="cinematicJourney">
    <div className="cinematicSticky">
      <video ref={videoRef} className="cinematicVideo" src={src||undefined} muted playsInline preload="auto" aria-label="Jornada visual do fio ao produto"/>
      <div className="cinematicShade" aria-hidden="true"/>
      <div className="cinematicLight" aria-hidden="true"/>

      <div className="cinematicCopy" key={chapter}>
        <span>{c.kicker}</span>
        <h2>{c.title}</h2>
        <p>{c.copy}</p>
      </div>

      <div className="cinematicProgress" aria-hidden="true">
        <b style={{transform:`scaleX(${progress})`}}/>
      </div>
      <div className="cinematicDots" aria-hidden="true">
        {CHAPTERS.map((_,i)=><i key={i} className={i===chapter?'active':i<chapter?'passed':''}/>) }
      </div>
      <div className="cinematicHint">ROLE DEVAGAR · PARE PARA CONGELAR A CENA</div>
    </div>
  </section>;
}
