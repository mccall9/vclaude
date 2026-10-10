import type {Metadata, Viewport} from 'next';
import {GeistMono} from 'geist/font/mono';
import {GeistSans} from 'geist/font/sans';
import {IslandNav} from '@/components/IslandNav';
import './globals.css';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Motion Pronto · motion design por prompt',
  description:
    'Descreva o vídeo em português e o Claude Code monta as cenas, coloca os sons e entrega o MP4. 19 cenas, 21 transições e 4 estilos, sem After Effects.',
  openGraph: {
    title: 'Motion Pronto · seu próximo motion sai de uma frase',
    description: 'Descreva em português, receba o MP4. Sem After Effects, sem timeline.',
    images: ['/media/demo-poster.jpg'],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {card: 'summary_large_image'},
};

export const viewport: Viewport = {themeColor: '#131209'};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Liga as animações de entrada só quando há JavaScript */}
        <script dangerouslySetInnerHTML={{__html: "document.documentElement.classList.add('js')"}} />
      </head>
      <body>
        <a href="#conteudo" className="skip">
          Pular para o conteúdo
        </a>
        <IslandNav />
        <div id="conteudo">{children}</div>
      </body>
    </html>
  );
}
