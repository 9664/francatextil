const exhibitors=[
  {name:'GOL TÊXTIL',category:'INDÚSTRIA TÊXTIL',position:'0% 0%'},
  {name:'ECOMMERCE VERSO',category:'ECOMMERCE',position:'25% 0%'},
  {name:'PEDROSO TÊXTIL',category:'INDÚSTRIA TÊXTIL',position:'50% 0%'},
  {name:"BETINI'S",category:'INDÚSTRIA TÊXTIL',position:'75% 0%'},
  {name:'ZANONE MALHAS',category:'INDÚSTRIA TÊXTIL',position:'100% 0%'},
  {name:'ZANONE CURSOS',category:'CURSOS',position:'0% 33.3333%'},
  {name:'CONTÁBIL ZANONE',category:'CONTABILIDADE',position:'25% 33.3333%'},
  {name:'STELLAR PRINT',category:'ESTAMPARIA',position:'50% 33.3333%'},
  {name:'MAGNA TECH',category:'MAQUINÁRIO',position:'75% 33.3333%'},
  {name:'BM DO BRASIL',category:'MAQUINÁRIO',position:'100% 33.3333%'},
  {name:'MAQCENTER COSTURA',category:'MAQUINÁRIO',position:'0% 66.6667%'},
  {name:'MECOLOUR',category:'IMPRESSÃO',position:'25% 66.6667%'},
  {name:'HR TÊXTIL',category:'INDÚSTRIA TÊXTIL',position:'50% 66.6667%'},
  {name:'YGUAÇU MÁQUINAS',category:'MAQUINÁRIO',position:'75% 66.6667%'},
  {name:'FINAL Z',category:'INDÚSTRIA TÊXTIL',position:'100% 66.6667%'},
  {name:'FÊNIX TÊXTIL',category:'INDÚSTRIA TÊXTIL',position:'0% 100%'},
  {name:'MARGIS TRANSPORTES',category:'TRANSPORTADORA',position:'25% 100%'},
  {name:'TW PRINT',category:'ESTAMPARIA',position:'50% 100%'},
  {name:'MOURA MALHAS',category:'INDÚSTRIA TÊXTIL',position:'75% 100%'},
  {name:'DISTRIBUIDOR DE CAMISETAS',category:'FORNECEDOR',position:'100% 100%'}
];

function LogoRun({hidden=false}){
  return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map((item,index)=><article className="logoCard" key={`${item.name}-${hidden?'b':'a'}`} title={`${item.name} · ${item.category}`}><div className="logoSprite" style={{backgroundPosition:item.position}} role={hidden?undefined:'img'} aria-label={hidden?undefined:`Logo ${item.name}`}/></article>)}</div>;
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
