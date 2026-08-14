const exhibitors=[
{name:'GOL TÊXTIL',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/DnPYEK5WquGRifJ0'},
{name:'DISTRIBUIDOR DE CAMISETAS',category:'FORNECEDOR',image:'https://at.adobe.com/Gn84AZnDTw0XA1Y0'},
{name:'ECOMMERCE VERSO',category:'ECOMMERCE',image:'https://at.adobe.com/FzrBtMRYCvnE9YYH'},
{name:'PEDROSO TÊXTIL',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/augQHZpxYYuwC8cB'},
{name:"BETINI'S",category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/jBGZheFvBBuZV61G'},
{name:'FÊNIX TÊXTIL',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/v3bfq2qyDuk5lpPR'},
{name:'TW PRINT',category:'ESTAMPARIA',image:'https://at.adobe.com/vWahSpvAbyUbIiH2'},
{name:'MARGIS TRANSPORTES',category:'TRANSPORTADORA',image:'https://at.adobe.com/lbchLBkjJX2F8ifd'},
{name:'MOURA MALHAS',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/ufHxj01piRA98l3U'},
{name:'FINAL Z',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/kTOTPNrhQnByrwk5'},
{name:'YGUAÇU MÁQUINAS',category:'MAQUINÁRIO',image:'https://at.adobe.com/nQOACmXoJNQLcigx'},
{name:'HR TÊXTIL',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/juJYPiMKnpo8zH8f'},
{name:'MECOLOUR',category:'IMPRESSÃO',image:'https://at.adobe.com/4G6mxjyMgyvK1qz2'},
{name:'MAQCENTER COSTURA',category:'MAQUINÁRIO',image:'https://at.adobe.com/wnqX7FLNYkQM6EkO'},
{name:'BM DO BRASIL',category:'MAQUINÁRIO',image:'https://at.adobe.com/jS6qqxdMUCaeEEXv'},
{name:'MAGNA TECH',category:'MAQUINÁRIO',image:'https://at.adobe.com/xV9tkZSleZGd2ezB'},
{name:'STELLAR PRINT',category:'ESTAMPARIA',image:'https://at.adobe.com/pAWmMsADqC5UuSl0'},
{name:'CONTÁBIL ZANONE',category:'CONTABILIDADE',image:'https://at.adobe.com/zVPqFQ7i17ghyUjw'},
{name:'ZANONE CURSOS',category:'CURSOS',image:'https://at.adobe.com/BkcfVVBlxh5SALl3'},
{name:'ZANONE MALHAS',category:'INDÚSTRIA TÊXTIL',image:'https://at.adobe.com/6T2s4ZNzK12GKnVF'}
];
function LogoRun({hidden=false}){return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map((item,i)=><article className="logoCard" key={`${item.name}-${hidden?'b':'a'}`}><div className="exhibitorArt"><img src={item.image} alt={hidden?'':`Expositor confirmado ${item.name}`} loading={i<6?'eager':'lazy'} decoding="async"/></div><div className="logoMeta"><b>{item.name}</b><span>{item.category}</span></div></article>)}</div>}
export default function LogoCarousel(){return <><div className="exhibitorIntro"><div><strong>20</strong><span>EXPOSITORES CONFIRMADOS</span></div><p>Indústria, máquinas, impressão, serviços, logística, formação e venda digital reunidos na mesma trama.</p></div><div className="logoCarousel" aria-label="Carrossel com 20 expositores confirmados"><div className="logoRail"><LogoRun/><LogoRun hidden/></div></div></>}
