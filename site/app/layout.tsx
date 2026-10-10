import type {Metadata, Viewport} from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import './globals.css';

const display = localFont({src: './fonts/unbounded-latin-900-normal.woff2', weight: '900', variable: '--font-display'});
const body = localFont({
  src: [
    {path: './fonts/inter-latin-400-normal.woff2', weight: '400'},
    {path: './fonts/inter-latin-600-normal.woff2', weight: '600'},
    {path: './fonts/inter-latin-800-normal.woff2', weight: '800'},
  ],
  variable: '--font-body',
});
const mono = localFont({src: './fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400', variable: '--font-mono'});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: 'Kinetiq · motion design por prompt',
  description:
    'Descreva o vídeo em português e o Claude Code cria a animação e entrega o MP4. 19 cenas, 21 transições e 4 estilos, sem After Effects.',
  openGraph: {
    title: 'Kinetiq · motion design por prompt',
    description: 'Descreva em português, receba o MP4. Sem After Effects, sem timeline.',
    images: ['/media/demo-poster.jpg'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = {themeColor: '#0a0a0c'};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <header className="nav">
          <div className="wrap nav-inner">
            <Link href="/" className="logo">
              <span className="logo-mark">
                <span>K</span>
              </span>
              Kinetiq
            </Link>
            <nav className="nav-links" aria-label="Seções">
              <a href="/#como-funciona">Como funciona</a>
              <a href="/#estilos">Estilos</a>
              <a href="/#o-que-vem">O que vem</a>
              <a href="/#requisitos">Requisitos</a>
              <a href="/#duvidas">Dúvidas</a>
            </nav>
            <a href="/#comprar" className="btn btn-primary">
              Comprar
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
