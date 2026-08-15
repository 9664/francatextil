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
function LogoRun({hidden=false}){return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map(item=><figure className="exhibitorSlide" key={`${item.name}-${hidden?'b':'a'}`} title={item.name}><div className="exhibitorSprite" style={{backgroundPosition:item.position}} role={hidden?undefined:'img'} aria-label={hidden?undefined:`Expositor confirmado ${item.name}`}/></figure>)}</div>}
export default function LogoCarousel(){return <><div className="exhibitorIntro"><div><strong>20</strong><span>EXPOSITORES CONFIRMADOS</span></div><p>Indústria, máquinas, impressão, serviços, logística, formação e venda digital reunidos na mesma trama.</p></div><div className="logoCarousel" aria-label="Carrossel com 20 expositores confirmados"><div className="logoRail"><LogoRun/><LogoRun hidden/></div></div></>}
