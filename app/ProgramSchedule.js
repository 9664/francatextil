'use client';

import { useMemo, useState } from 'react';

export default function ProgramSchedule({items16=[],items17=[]}){
  const [day,setDay]=useState('16');
  const items=useMemo(()=>day==='16'?items16:items17,[day,items16,items17]);
  return <div className="programTimeline">
    <div className="programTabs" role="tablist" aria-label="Dias da programação">
      <button type="button" role="tab" aria-selected={day==='16'} className={day==='16'?'active':''} onClick={()=>setDay('16')}>16 SET</button>
      <button type="button" role="tab" aria-selected={day==='17'} className={day==='17'?'active':''} onClick={()=>setDay('17')}>17 SET</button>
    </div>
    <div className="programDay" key={day}>
      {items.length?items.map((item,i)=><article key={`${day}-${item.time}-${i}`}>
        <time>{item.time}</time>
        <div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</div>
      </article>):<div className="programEmpty"><strong>PROGRAMAÇÃO EM ATUALIZAÇÃO</strong><span>Os conteúdos deste dia serão publicados pela organização.</span></div>}
    </div>
  </div>;
}
