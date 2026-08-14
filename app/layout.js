import './globals.css';
import './v3.css';
import './program.css';
import './audience-v3.css';
import './journey-video.css';

export const metadata={
 title:'Expo Franca Têxtil Summit 2026',
 description:'Indústria, moda, tecnologia e negócios em Franca/SP, 16 e 17 de setembro de 2026.',
 metadataBase:new URL('https://francatextil.com.br'),
 openGraph:{title:'Expo Franca Têxtil Summit 2026',description:'A nova indústria têxtil acontece aqui.',type:'website',locale:'pt_BR',images:[{url:'/opengraph-image',width:1200,height:630,alt:'Expo Franca Têxtil Summit 2026'}]},
 twitter:{card:'summary_large_image',images:['/opengraph-image']}
};
export default function RootLayout({children}){return <html lang="pt-BR"><body>{children}</body></html>}
