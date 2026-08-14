'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const stages=[
  ['01','TUDO COMEÇA NO FIO.','O novelo libera a matéria-prima e a jornada começa.'],
  ['02','A LINHA ENCONTRA A AGULHA.','Precisão e técnica transformam matéria em possibilidade.'],
  ['03','A PRECISÃO ENTRA NA MÁQUINA.','A agulha deixa de ser um detalhe e passa a fazer parte de um processo industrial.'],
  ['04','O PROCESSO VIRA PRODUTO.','A costura ganha forma, volume e identidade até se transformar em roupa.'],
  ['05','A PEÇA GANHA MERCADO.','O produto deixa a produção e segue para a etapa que conecta marca e consumidor.'],
  ['06','DO FIO AO CLIQUE.','Produção, tecnologia e mercado em uma única cadeia.']
];

export default function TextileJourney3D(){
  const sectionRef=useRef(null);
  const canvasRef=useRef(null);
  const [stage,setStage]=useState(0);

  useEffect(()=>{
    const section=sectionRef.current;
    const canvas=canvasRef.current;
    if(!section||!canvas)return;

    let disposed=false;
    let raf=0;
    let targetProgress=0;
    let smoothProgress=0;
    let lastStage=-1;

    const scene=new THREE.Scene();
    scene.background=new THREE.Color(0x020526);
    scene.fog=new THREE.FogExp2(0x020526,.032);

    const camera=new THREE.PerspectiveCamera(42,window.innerWidth/window.innerHeight,.1,80);
    camera.position.set(-10,2.2,7.5);

    const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setSize(window.innerWidth,window.innerHeight,false);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.12;

    scene.add(new THREE.AmbientLight(0x7684b8,1.25));
    const key=new THREE.DirectionalLight(0xffffff,3.2); key.position.set(4,8,6); scene.add(key);
    const cyan=new THREE.PointLight(0x00c8ff,35,16); cyan.position.set(-5,2,4); scene.add(cyan);
    const pink=new THREE.PointLight(0xff168a,30,14); pink.position.set(4,2,-2); scene.add(pink);
    const yellow=new THREE.PointLight(0xffd500,30,14); yellow.position.set(10,3,2); scene.add(yellow);

    const root=new THREE.Group(); scene.add(root);
    const metallic=new THREE.MeshStandardMaterial({color:0xd8dce7,metalness:.92,roughness:.2});
    const navyMat=new THREE.MeshStandardMaterial({color:0x101a57,metalness:.45,roughness:.35});
    const yellowMat=new THREE.MeshStandardMaterial({color:0xffd500,metalness:.18,roughness:.55});
    const cyanMat=new THREE.MeshStandardMaterial({color:0x00bde8,metalness:.1,roughness:.55});
    const kraftMat=new THREE.MeshStandardMaterial({color:0x9a6a36,metalness:.05,roughness:.78});

    // NOVELO
    const yarn=new THREE.Group(); yarn.position.set(-8,0,0); root.add(yarn);
    const core=new THREE.Mesh(new THREE.SphereGeometry(1.25,32,24),new THREE.MeshStandardMaterial({color:0x141f61,roughness:.9,metalness:.05}));
    yarn.add(core);
    for(let i=0;i<18;i++){
      const ringMat=new THREE.MeshStandardMaterial({color:i%3===0?0xffd500:i%3===1?0x00c8ff:0xff168a,roughness:.58,metalness:.08,emissive:i%3===0?0x4b3600:i%3===1?0x002c38:0x39001e,emissiveIntensity:.35});
      const ring=new THREE.Mesh(new THREE.TorusGeometry(1.18,.055,8,80),ringMat);
      ring.rotation.set((i*.41)%Math.PI,(i*.63)%Math.PI,(i*.27)%Math.PI);
      yarn.add(ring);
    }

    // FIO PRINCIPAL
    const threadCurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7.1,.3,.1),new THREE.Vector3(-5.6,1.25,.3),new THREE.Vector3(-3.8,.7,-.25),
      new THREE.Vector3(-1.8,.15,0),new THREE.Vector3(.6,.55,.15),new THREE.Vector3(2.1,.15,0),
      new THREE.Vector3(4.7,-.15,.15),new THREE.Vector3(6.8,.25,0),new THREE.Vector3(8.7,.45,.1),new THREE.Vector3(10.9,.05,0)
    ]);
    const threadPts=threadCurve.getPoints(340);
    const threadGeo=new THREE.BufferGeometry().setFromPoints(threadPts);
    const threadMat=new THREE.LineBasicMaterial({color:0xffd500,transparent:true,opacity:.95});
    const threadLine=new THREE.Line(threadGeo,threadMat); threadGeo.setDrawRange(0,1); root.add(threadLine);
    const tracer=new THREE.Mesh(new THREE.SphereGeometry(.12,16,16),new THREE.MeshBasicMaterial({color:0xffd500})); root.add(tracer);

    // AGULHA
    const needle=new THREE.Group(); needle.position.set(-1.8,.15,0); root.add(needle);
    const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.065,.065,3.1,14),metallic); shaft.rotation.z=Math.PI/2; needle.add(shaft);
    const tip=new THREE.Mesh(new THREE.ConeGeometry(.1,.48,18),metallic); tip.rotation.z=-Math.PI/2; tip.position.x=1.78; needle.add(tip);
    const eye=new THREE.Mesh(new THREE.TorusGeometry(.22,.055,10,28),metallic); eye.rotation.y=Math.PI/2; eye.position.x=-1.45; needle.add(eye);

    // MÁQUINA
    const machine=new THREE.Group(); machine.position.set(2.25,0,0); root.add(machine);
    const base=new THREE.Mesh(new THREE.BoxGeometry(3.4,.38,2.25),navyMat); base.position.y=-1.15; machine.add(base);
    const pillar=new THREE.Mesh(new THREE.BoxGeometry(.55,2.5,1.05),navyMat); pillar.position.set(1.25,.05,0); machine.add(pillar);
    const arm=new THREE.Mesh(new THREE.BoxGeometry(3.05,.72,1.05),navyMat); arm.position.set(-.05,1.05,0); machine.add(arm);
    const machineNeedle=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,1.85,12),metallic); machineNeedle.position.set(-1.33,.02,0); machine.add(machineNeedle);
    const presser=new THREE.Mesh(new THREE.BoxGeometry(.5,.09,.5),metallic); presser.position.set(-1.33,-.9,0); machine.add(presser);
    const wheel=new THREE.Mesh(new THREE.TorusGeometry(.62,.09,12,40),metallic); wheel.rotation.y=Math.PI/2; wheel.position.set(1.58,1.05,-.58); machine.add(wheel);

    // ROUPA
    const shirt=new THREE.Group(); shirt.position.set(7,0,0); root.add(shirt);
    const torso=new THREE.Mesh(new THREE.BoxGeometry(1.75,2.35,.18),cyanMat); torso.position.y=0; shirt.add(torso);
    const sleeveL=new THREE.Mesh(new THREE.BoxGeometry(.85,1.15,.18),cyanMat); sleeveL.position.set(-1.12,.52,0); sleeveL.rotation.z=-.58; shirt.add(sleeveL);
    const sleeveR=new THREE.Mesh(new THREE.BoxGeometry(.85,1.15,.18),cyanMat); sleeveR.position.set(1.12,.52,0); sleeveR.rotation.z=.58; shirt.add(sleeveR);
    const collar=new THREE.Mesh(new THREE.TorusGeometry(.32,.055,10,26,Math.PI),new THREE.MeshStandardMaterial({color:0x020526,roughness:.7})); collar.rotation.z=Math.PI; collar.position.set(0,1.08,.1); shirt.add(collar);

    // CAIXA
    const box=new THREE.Group(); box.position.set(11,0,0); root.add(box);
    const boxBase=new THREE.Mesh(new THREE.BoxGeometry(2.9,1.75,2.45),kraftMat); boxBase.position.y=-.25; box.add(boxBase);
    const flapGeo=new THREE.BoxGeometry(1.45,.08,2.38);
    const flapL=new THREE.Mesh(flapGeo,kraftMat); flapL.position.set(-.72,.65,0); flapL.rotation.z=-.18; box.add(flapL);
    const flapR=new THREE.Mesh(flapGeo,kraftMat); flapR.position.set(.72,.65,0); flapR.rotation.z=.18; box.add(flapR);
    const mark=new THREE.Mesh(new THREE.BoxGeometry(1.35,.02,.7),yellowMat); mark.position.set(0,-.2,1.235); box.add(mark);

    // partículas discretas
    const pCount=180;
    const pGeo=new THREE.BufferGeometry();
    const arr=new Float32Array(pCount*3);
    for(let i=0;i<pCount;i++){arr[i*3]=THREE.MathUtils.randFloat(-12,14);arr[i*3+1]=THREE.MathUtils.randFloat(-5,6);arr[i*3+2]=THREE.MathUtils.randFloat(-7,5);}
    pGeo.setAttribute('position',new THREE.BufferAttribute(arr,3));
    const particles=new THREE.Points(pGeo,new THREE.PointsMaterial({color:0x91a1d8,size:.025,transparent:true,opacity:.42})); scene.add(particles);

    const camCurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9.7,2.1,7.2),new THREE.Vector3(-6.2,1.5,6.1),new THREE.Vector3(-2.2,1.05,5.1),
      new THREE.Vector3(2.0,1.65,5.8),new THREE.Vector3(6.7,1.45,5.2),new THREE.Vector3(10.8,1.9,6.2)
    ]);
    const targetCurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8,0,0),new THREE.Vector3(-5,.6,0),new THREE.Vector3(-1.8,.1,0),
      new THREE.Vector3(2.2,0,0),new THREE.Vector3(7,0,0),new THREE.Vector3(11,0,0)
    ]);

    function resize(){
      const w=window.innerWidth,h=window.innerHeight;
      camera.aspect=w/h; camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,w<720?1.15:1.5));
      renderer.setSize(w,h,false);
    }
    resize(); window.addEventListener('resize',resize,{passive:true});

    function readProgress(){
      const rect=section.getBoundingClientRect();
      const travel=Math.max(1,section.offsetHeight-window.innerHeight);
      targetProgress=clamp((-rect.top)/travel);
      const s=Math.min(5,Math.floor(targetProgress*6));
      if(s!==lastStage){lastStage=s;setStage(s);}
    }
    window.addEventListener('scroll',readProgress,{passive:true}); readProgress();

    const clock=new THREE.Clock();
    function animate(){
      if(disposed)return;
      smoothProgress+= (targetProgress-smoothProgress)*.065;
      const p=clamp(smoothProgress);
      const t=clock.getElapsedTime();

      const camPos=camCurve.getPointAt(p); camera.position.lerp(camPos,.13);
      const look=targetCurve.getPointAt(Math.min(.995,p+.025)); camera.lookAt(look);

      yarn.rotation.y=t*.22; yarn.rotation.x=Math.sin(t*.3)*.08;
      const drawP=clamp((p-.025)/.91); threadGeo.setDrawRange(0,Math.max(1,Math.floor(drawP*threadPts.length)));
      tracer.position.copy(threadCurve.getPointAt(drawP));
      tracer.scale.setScalar(.8+Math.sin(t*5)*.16);

      needle.rotation.y=Math.sin(t*.7)*.06;
      const machineP=clamp((p-.36)/.28);
      machineNeedle.position.y=.02-Math.abs(Math.sin(t*13))*1.0*machineP;
      wheel.rotation.x=t*4*machineP;

      const shirtIn=clamp((p-.58)/.16); shirt.scale.setScalar(.18+.82*shirtIn);
      shirt.rotation.y=-.7+shirtIn*.7+Math.sin(t*.8)*.05;
      const pack=clamp((p-.78)/.17);
      shirt.position.x=7+pack*3.25; shirt.position.y=-pack*.35; shirt.scale.setScalar(Math.max(.28,(.18+.82*shirtIn)*(1-pack*.58)));
      flapL.rotation.z=-.18-pack*1.18; flapR.rotation.z=.18+pack*1.18;
      box.rotation.y=Math.sin(t*.3)*.025;

      particles.rotation.y=t*.008;
      renderer.render(scene,camera);
      raf=requestAnimationFrame(animate);
    }
    animate();

    return()=>{
      disposed=true; cancelAnimationFrame(raf);
      window.removeEventListener('resize',resize); window.removeEventListener('scroll',readProgress);
      scene.traverse(obj=>{if(obj.geometry)obj.geometry.dispose?.();if(obj.material){const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(m=>m.dispose?.());}});
      renderer.dispose();
    };
  },[]);

  const [n,title,copy]=stages[stage];
  return <section ref={sectionRef} id="do-fio-ao-clique" className="textileJourney3D">
    <div className="textileJourneySticky">
      <canvas ref={canvasRef} className="textileJourneyCanvas"/>
      <div className="textileJourneyShade"/>
      <div className="textileJourneyCopy" key={stage}>
        <span>{n} / DO FIO AO CLIQUE</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="journeyStageDots">{stages.map((_,i)=><i key={i} className={i===stage?'active':i<stage?'passed':''}/>)}</div>
      <div className="journey3dHint">ROLE DEVAGAR · A CÂMERA AVANÇA COM VOCÊ</div>
    </div>
  </section>;
}
