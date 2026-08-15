'use client';

import { useEffect, useState } from 'react';

const exhibitors=[
{name:'GOL TÊXTIL',position:'0% 0%'},
{name:'DISTRIBUIDOR DE CAMISETAS',position:'100% 100%'},
{name:'ECOMMERCE VERSO',position:'25% 0%'},
{name:'PEDROSO TÊXTIL',position:'50% 0%'},
{name:"BETINI'S",position:'75% 0%'},
{name:'FÊNIX TÊXTIL',position:'0% 100%'},
{name:'TW PRINT',position:'50% 100%'},
{name:'MARGIS TRANSPORTES',position:'25% 100%'},
{name:'MOURA MALHAS',position:'75% 100%'},
{name:'FINAL Z',position:'100% 66.6667%'},
{name:'YGUAÇU MÁQUINAS',position:'75% 66.6667%'},
{name:'HR TÊXTIL',position:'50% 66.6667%'},
{name:'MECOLOUR',position:'25% 66.6667%'},
{name:'MAQCENTER COSTURA',position:'0% 66.6667%'},
{name:'BM DO BRASIL',position:'100% 33.3333%'},
{name:'MAGNA TECH',position:'75% 33.3333%'},
{name:'STELLAR PRINT',position:'50% 33.3333%'},
{name:'CONTÁBIL ZANONE',position:'25% 33.3333%'},
{name:'ZANONE CURSOS',position:'0% 33.3333%'},
{name:'ZANONE MALHAS',position:'100% 0%'}
];

const spriteParts=['/exhibitor-sprite-v3/part00.b64','/exhibitor-sprite-v3/part01.b64'];

function decodeBase64ToBlob(encoded,type='image/webp'){
  const clean=encoded.replace(/\s+/g,'');
  const binary=atob(clean);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
  return new Blob([bytes],{type});
}

function LogoRun({hidden=false,spriteUrl}){
  return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map(item=><figure className="exhibitorSlide" key={`${item.name}-${hidden?'b':'a'}`} title={item.name}><div className="exhibitorSprite" style={{backgroundPosition:item.position,backgroundImage:spriteUrl?`url(${spriteUrl})`:undefined}} role={hidden?undefined:'img'} aria-label={hidden?undefined:`Expositor confirmado ${item.name}`}/></figure>)}</div>;
}

export default function LogoCarousel(){
  const [spriteUrl,setSpriteUrl]=useState('');
  useEffect(()=>{
    let alive=true;
    let objectUrl='';
    Promise.all(spriteParts.map(src=>fetch(src,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(src);return r.text();})))
      .then(parts=>{
        if(!alive)return;
        objectUrl=URL.createObjectURL(decodeBase64ToBlob(parts.join('')));
        setSpriteUrl(objectUrl);
      })
      .catch(err=>console.error('Falha ao carregar sprite dos expositores',err));
    return()=>{alive=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
  },[]);

  return <><div className="exhibitorIntro"><div><strong>20</strong><span>EXPOSITORES CONFIRMADOS</span></div><p>Indústria, máquinas, impressão, serviços, logística, formação e venda digital reunidos na mesma trama.</p></div><div className={`logoCarousel ${spriteUrl?'isReady':''}`} aria-label="Carrossel com 20 expositores confirmados"><div className="logoRail"><LogoRun spriteUrl={spriteUrl}/><LogoRun hidden spriteUrl={spriteUrl}/></div></div></>;
}
