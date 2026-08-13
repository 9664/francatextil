import './globals.css';

export const metadata = {
  title: 'Expo Franca Têxtil Summit 2026',
  description: 'Indústria, moda, tecnologia e negócios em Franca/SP, 16 e 17 de setembro de 2026.',
  metadataBase: new URL('https://francatextil.com.br'),
  openGraph: {
    title: 'Expo Franca Têxtil Summit 2026',
    description: 'O maior evento têxtil da região está chegando.',
    images: ['/og.svg']
  }
};

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}