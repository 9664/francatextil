'use client';

const exhibitors = [
  {name:'GOL TÊXTIL',src:'/media/expositores/gol%20textil.jpg.jpeg'},
  {name:'DISTRIBUIDOR DE CAMISETAS',src:'/media/expositores/distribuidor%20de%20camisetas.jpg.jpeg'},
  {name:'ECOMMERCE VERSO',src:'/media/expositores/ecommerce%20verso.jpg.jpeg'},
  {name:'PEDROSO TÊXTIL',src:'/media/expositores/pedroso%20textil.jpg.jpeg'},
  {name:"BETINI'S",src:'/media/expositores/betini%C2%B4s.jpg.jpeg'},
  {name:'FÊNIX TÊXTIL',src:'/media/expositores/fenix%20textil.jpg.jpeg'},
  {name:'TW PRINT',src:'/media/expositores/tw%20peint.jpg.jpeg'},
  {name:'MARGIS TRANSPORTES',src:'/media/expositores/margis.jpg.jpeg'},
  {name:'MOURA MALHAS',src:'/media/expositores/moura.jpg.jpeg'},
  {name:'FINAL Z',src:'/media/expositores/finalz.jpg.jpeg'},
  {name:'YGUAÇU MÁQUINAS',src:'/media/expositores/ygua%C3%A7u.jpg.jpeg'},
  {name:'HR TÊXTIL',src:'/media/expositores/hr.jpg.jpeg'},
  {name:'MECOLOUR',src:'/media/expositores/mecolour.jpg.jpeg'},
  {name:'MAQCENTER COSTURA',src:'/media/expositores/maqcenter.jpg.jpeg'},
  {name:'BM DO BRASIL',src:'/media/expositores/bm%20do%20brasil.jpg.jpeg'},
  {name:'MAGNA TECH',src:'/media/expositores/magnatech.jpg.jpeg'},
  {name:'STELLAR PRINT',src:'/media/expositores/stellar.jpg.jpeg'},
  {name:'CONTÁBIL ZANONE',src:'/media/expositores/zanonecontabil.jpg.jpeg'},
  {name:'ZANONE CURSOS',src:'/media/expositores/zanone%20cursos.jpg.jpeg'},
  {name:'ZANONE MALHAS',src:'/media/expositores/zanone.jpg.jpeg'}
];

function LogoRun({hidden=false}){
  return <div className="logoRun" aria-hidden={hidden||undefined}>
    {exhibitors.map(item=><figure className="exhibitorSlide" key={`${item.name}-${hidden?'b':'a'}`} title={item.name}>
      <img
        className="exhibitorImage"
        src={item.src}
        alt={hidden?'':`Expositor confirmado ${item.name}`}
        loading="lazy"
        decoding="async"
      />
    </figure>)}
  </div>;
}

export default function LogoCarousel(){
  return <>
    <div className="exhibitorIntro">
      <div><strong>20</strong><span>EXPOSITORES CONFIRMADOS</span></div>
      <p>Indústria, máquinas, impressão, serviços, logística, formação e venda digital reunidos na mesma trama.</p>
    </div>
    <div className="logoCarousel isReady" aria-label="Carrossel com 20 expositores confirmados">
      <div className="logoRail"><LogoRun/><LogoRun hidden/></div>
    </div>
  </>;
}
