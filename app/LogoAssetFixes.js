'use client';
import {useEffect} from 'react';

async function b64ToBlobUrl(path,type='image/webp'){
  const r=await fetch(path,{cache:'force-cache'});
  if(!r.ok) throw new Error(path);
  const encoded=(await r.text()).replace(/\s+/g,'');
  const binary=atob(encoded);
  const bytes=new Uint8Array(binary.length);
  for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes],{type}));
}

export default function LogoAssetFixes(){
  useEffect(()=>{
    let alive=true;
    let url='';
    b64ToBlobUrl('/pedroso-logo.b64').then(blobUrl=>{
      if(!alive){URL.revokeObjectURL(blobUrl);return;}
      url=blobUrl;
      document.querySelectorAll('img[alt="PEDROSO TÊXTIL"]').forEach(img=>{
        img.removeAttribute('srcset');
        img.src=blobUrl;
      });
    }).catch(err=>console.error('Pedroso logo fix failed',err));
    return()=>{alive=false;if(url)URL.revokeObjectURL(url)};
  },[]);
  return null;
}
