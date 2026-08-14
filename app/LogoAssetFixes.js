'use client';
import {useLayoutEffect} from 'react';

export default function LogoAssetFixes(){
  useLayoutEffect(()=>{
    document.querySelectorAll('.logoRun .logoCard:nth-child(3) img').forEach(img=>{
      img.removeAttribute('srcset');
      img.src='/pedroso-logo.webp';
      img.alt=img.alt||'PEDROSO TÊXTIL';
    });
  },[]);
  return null;
}
