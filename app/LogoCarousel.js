const exhibitors=[
{name:'GOL TÊXTIL',image:'https://at.adobe.com/DnPYEK5WquGRifJ0'},
{name:'DISTRIBUIDOR DE CAMISETAS',image:'https://at.adobe.com/Gn84AZnDTw0XA1Y0'},
{name:'ECOMMERCE VERSO',image:'https://at.adobe.com/FzrBtMRYCvnE9YYH'},
{name:'PEDROSO TÊXTIL',image:'https://at.adobe.com/augQHZpxYYuwC8cB'},
{name:"BETINI'S",image:'https://at.adobe.com/jBGZheFvBBuZV61G'},
{name:'FÊNIX TÊXTIL',image:'https://at.adobe.com/v3bfq2qyDuk5lpPR'},
{name:'TW PRINT',image:'https://at.adobe.com/vWahSpvAbyUbIiH2'},
{name:'MARGIS TRANSPORTES',image:'https://at.adobe.com/lbchLBkjJX2F8ifd'},
{name:'MOURA MALHAS',image:'https://at.adobe.com/ufHxj01piRA98l3U'},
{name:'FINAL Z',image:'https://at.adobe.com/kTOTPNrhQnByrwk5'},
{name:'YGUAÇU MÁQUINAS',image:'https://at.adobe.com/nQOACmXoJNQLcigx'},
{name:'HR TÊXTIL',image:'https://at.adobe.com/juJYPiMKnpo8zH8f'},
{name:'MECOLOUR',image:'https://at.adobe.com/4G6mxjyMgyvK1qz2'},
{name:'MAQCENTER COSTURA',image:'https://at.adobe.com/wnqX7FLNYkQM6EkO'},
{name:'BM DO BRASIL',image:'https://at.adobe.com/jS6qqxdMUCaeEEXv'},
{name:'MAGNA TECH',image:'https://at.adobe.com/xV9tkZSleZGd2ezB'},
{name:'STELLAR PRINT',image:'https://at.adobe.com/pAWmMsADqC5UuSl0'},
{name:'CONTÁBIL ZANONE',image:'https://at.adobe.com/zVPqFQ7i17ghyUjw'},
{name:'ZANONE CURSOS',image:'https://at.adobe.com/BkcfVVBlxh5SALl3'},
{name:'ZANONE MALHAS',image:'https://at.adobe.com/6T2s4ZNzK12GKnVF'}
];
function LogoRun({hidden=false}){return <div className="logoRun" aria-hidden={hidden||undefined}>{exhibitors.map((item,i)=><figure className="exhibitorSlide" key={`${item.name}-${hidden?'b':'a'}`}><img src={item.image} alt={hidden?'':`Expositor confirmado ${item.name}`} loading={i<6?'eager':'lazy'} decoding="async"/></figure>)}</div>}
export default function LogoCarousel(){return <><div className="exhibitorIntro"><div><strong>20</strong><span>EXPOSITORES CONFIRMADOS</span></div><p>Indústria, máquinas, impressão, serviços, logística, formação e venda digital reunidos na mesma trama.</p></div><div className="logoCarousel" aria-label="Carrossel com 20 expositores confirmados"><div className="logoRail"><LogoRun/><LogoRun hidden/></div></div></>}
