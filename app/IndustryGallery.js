export default function IndustryGallery(){
  const images=[
    {src:'/industry/01-bordado-industrial.webp',alt:'Máquinas têxteis industriais em operação'},
    {src:'/industry/02-costura-close.webp',alt:'Detalhe de costura industrial'},
    {src:'/industry/03-fabrica-costura.webp',alt:'Linha de produção e máquinas de costura'},
    {src:'/industry/04-maquina-industrial.webp',alt:'Máquina industrial de confecção'}
  ];
  return <section className="industryGallery" aria-label="Indústria têxtil em movimento">
    <div className="v3wrap industryHead"><span>02 / INDÚSTRIA EM MOVIMENTO</span><h2>DO CHÃO DE FÁBRICA<br/><em>À NOVA ECONOMIA TÊXTIL.</em></h2><p>Máquinas, processos e produção real dão escala ao polo que Franca está construindo.</p></div>
    <div className="industryMosaic v3wrap">
      {images.map((img,i)=><figure key={img.src} className={`industryShot shot${i+1}`}><img src={img.src} alt={img.alt}/><span>0{i+1}</span></figure>)}
    </div>
  </section>;
}
