const exhibitors=[
  {name:'GOL TÊXTIL',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/gol-textil.svg'},
  {name:'ECOMMERCE VERSO',category:'ECOMMERCE',src:'/exhibitors/ecommerce-verso.svg'},
  {name:'PEDROSO TÊXTIL',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/pedroso-textil.svg'},
  {name:"BETINI'S",category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/betinis.svg'},
  {name:'ZANONE MALHAS',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/zanone-malhas.svg'},
  {name:'ZANONE CURSOS',category:'CURSOS',src:'/exhibitors/zanone-cursos.svg'},
  {name:'CONTÁBIL ZANONE',category:'CONTABILIDADE',src:'/exhibitors/zanone-contabil.svg'},
  {name:'STELLAR PRINT',category:'ESTAMPARIA',src:'/exhibitors/stellar-print.svg'},
  {name:'MAGNA TECH',category:'MAQUINÁRIO',src:'/exhibitors/magna-tech.svg'},
  {name:'BM DO BRASIL',category:'MAQUINÁRIO',src:'/exhibitors/bm-do-brasil.svg'},
  {name:'MAQCENTER COSTURA',category:'MAQUINÁRIO',src:'/exhibitors/maq-center.svg'},
  {name:'MECOLOUR',category:'IMPRESSÃO',src:'/exhibitors/mecolour.svg'},
  {name:'HR TÊXTIL',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/hr-textil.svg'},
  {name:'YGUAÇU MÁQUINAS',category:'MAQUINÁRIO',src:'/exhibitors/yguacu-maquinas.svg'},
  {name:'FINAL Z',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/final-z.svg'},
  {name:'FÊNIX TÊXTIL',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/fenix-textil.svg'},
  {name:'MARGIS TRANSPORTES',category:'TRANSPORTADORA',src:'/exhibitors/margis.svg'},
  {name:'TW PRINT',category:'ESTAMPARIA',src:'/exhibitors/tw-print.svg'},
  {name:'MOURA MALHAS',category:'INDÚSTRIA TÊXTIL',src:'/exhibitors/moura-malhas.svg'},
  {name:'DISTRIBUIDOR DE CAMISETAS',category:'FORNECEDOR',src:'/exhibitors/distribuidor-de-camisetas.svg'}
];

function LogoRun({hidden=false}){
  return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map(item=><article className="logoCard" key={`${item.name}-${hidden?'b':'a'}`} title={`${item.name} · ${item.category}`}><img src={item.src} alt={hidden?'':`Logo ${item.name}`} loading="lazy" decoding="async"/></article>)}</div>;
}

export default function LogoCarousel(){
  return <>
    <div className="logoCarousel" aria-label="Carrossel com 20 expositores confirmados">
      <div className="logoRail"><LogoRun/><LogoRun hidden/></div>
    </div>
    <div className="exhibitorCount"><strong>20</strong><div><b>EMPRESAS CONFIRMADAS</b><span>Uma cadeia que já reúne indústria, máquinas, impressão, serviços, logística, formação e venda digital.</span></div></div>
    <div className="exhibitorGrid">{exhibitors.map((item,index)=><article key={item.name} className="exhibitorMini"><small>{String(index+1).padStart(2,'0')}</small><div><b>{item.name}</b><span>{item.category}</span></div></article>)}</div>
  </>;
}
