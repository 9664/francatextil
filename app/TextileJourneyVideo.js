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

const JOURNEY_PARTS=[
  '/journey-v5/part00.b64','/journey-v5/part01.b64',
  '/journey-v5/fix02a.b64','/journey-v5/fix02b.b64',
  '/journey-v5/part03.b64','/journey-v5/part04.b64','/journey-v5/part05.b64','/journey-v5/part06.b64','/journey-v5/part07.b64',
  '/journey-v5/fix08a.b64','/journey-v5/fix08b.b64',
  '/journey-v5/fix09a.b64','/journey-v5/fix09b.b64',
  '/journey-v5/good10.b64','/journey-v5/part11.b64','/journey-v5/part12.b64'
];

const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));

export default function TextileJourneyVideo(){
  const sectionRef=useRef(null);
  const videoRef=useRef(null);
  const rafRef=useRef(0);
  const targetTimeRef=useRef(0);
  const [src,setSrc]=useState('');
  const [progress,setProgress]=useState(0);
  const [chapter,setChapter]=useState(0);
  const [status,setStatus]=useState('loading');

  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    Promise.all(JOURNEY_PARTS.map(url=>fetch(url,{cache:'force-cache'}).then(r=>{
      if(!r.ok)throw new Error(`journey:${url}`);
      return r.text();
    })))
      .then(parts=>{
        if(!alive)return;
        const encoded=parts.join('').replace(/\s+/g,'');
        const binary=atob(encoded);
        const bytes=new Uint8Array(binary.length);
        for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
        objectUrl=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
        setSrc(objectUrl);
      })
      .catch(err=>{
        console.error('Journey media failed',err);
        if(alive)setStatus('error');
      });
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  useEffect(()=>{
    const section=sectionRef.current;
    const video=videoRef.current;
    if(!section||!video||!src)return;
    let queued=false;

    const update=()=>{
      queued=false;
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      const p=clamp(-rect.top/travel);
      setProgress(prev=>Math.abs(prev-p)>.003?p:prev);
      section.style.setProperty('--journey-progress',p.toFixed(4));

      let idx=0;
      for(let i=0;i<CHAPTERS.length;i++)if(p>=CHAPTERS[i].at)idx=i;
      setChapter(prev=>prev===idx?prev:idx);

      if(video.readyState>=1&&Number.isFinite(video.duration)&&video.duration>0){
        video.pause();
        const t=Math.min(video.duration-.04,Math.max(.01,p*(video.duration-.08)));
        targetTimeRef.current=t;
        if(Math.abs(video.currentTime-t)>.008){
          try{video.currentTime=t;}catch{}
        }
      }
    };

    const onScroll=()=>{
      if(queued)return;
      queued=true;
      rafRef.current=requestAnimationFrame(update);
    };
    const onMeta=()=>{
      video.pause();
      setStatus('ready');
      try{video.currentTime=.01;}catch{}
      update();
    };
    const onError=()=>setStatus('error');

    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    video.addEventListener('loadedmetadata',onMeta);
    video.addEventListener('error',onError);
    if(video.readyState>=1)onMeta(); else update();

    return()=>{
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onScroll);
      video.removeEventListener('loadedmetadata',onMeta);
      video.removeEventListener('error',onError);
      cancelAnimationFrame(rafRef.current);
    };
  },[src]);

  const c=CHAPTERS[chapter];
  return <section ref={sectionRef} id="do-fio-ao-clique" className="cinematicJourney">
    <div className="cinematicSticky">
      <div className="cinematicPoster" aria-hidden="true"/>
      <video ref={videoRef} className={`cinematicVideo ${status==='ready'?'isReady':''}`} src={src||undefined} muted playsInline preload="auto" aria-label="Jornada visual do fio ao produto"/>
      <div className="cinematicShade" aria-hidden="true"/>
      <div className="cinematicLight" aria-hidden="true"/>

      <div className="cinematicCopy" key={chapter}>
        <span>{c.kicker}</span>
        <h2>{c.title}</h2>
        <p>{c.copy}</p>
      </div>

      <div className="cinematicProgress" aria-hidden="true"><b style={{transform:`scaleX(${progress})`}}/></div>
      <div className="cinematicDots" aria-hidden="true">{CHAPTERS.map((_,i)=><i key={i} className={i===chapter?'active':i<chapter?'passed':''}/>)}</div>
      <div className="cinematicHint">ROLE DEVAGAR · PARE PARA CONGELAR A CENA</div>
      {status==='loading'&&<div className="cinematicStatus">CARREGANDO JORNADA</div>}
      {status==='error'&&<div className="cinematicStatus error">RECARREGUE A PÁGINA PARA ATIVAR A JORNADA</div>}
    </div>
  </section>;
}
