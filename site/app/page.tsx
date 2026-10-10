import {config, formatPrice} from '@/lib/config';

const BuyForm = ({label, big}: {label: string; big?: boolean}) => (
  <form action="/api/checkout" method="post">
    <button type="submit" className="btn btn-primary" style={big ? {padding: '18px 36px', fontSize: 19} : undefined}>
      {label}
    </button>
  </form>
);

const steps = [
  {t: 'Prepare o computador', d: 'Instale o Node.js e o Claude Code. O guia do kit mostra o passo a passo no macOS, Windows e Linux.'},
  {t: 'Rode o instalador', d: 'Um comando confere o kit, copia o projeto, instala a skill e baixa as dependências.'},
  {t: 'Descreva o vídeo', d: 'Em português, do seu jeito: duração, formato, clima, textos. O Claude escolhe cenas, estilo e transições.'},
  {t: 'Receba o MP4', d: 'O Claude escreve o roteiro em código, confere os quadros e renderiza o vídeo no seu computador.'},
];

const themes = [
  {name: 'Ember', d: 'Escuro, laranja, interface técnica', img: '/media/tema-0.jpg'},
  {name: 'Neon', d: 'Ciano e magenta, synthwave', img: '/media/tema-1.jpg'},
  {name: 'Paper', d: 'Editorial claro com serifa', img: '/media/tema-2.jpg'},
  {name: 'Mono', d: 'Brutalista, preto e branco', img: '/media/tema-3.jpg'},
];

const transitions = ['fade', 'slide', 'push', 'zoom', 'zoomBlur', 'whip', 'wipe', 'iris', 'diamond', 'blinds', 'shutter', 'glitch', 'flash', 'dip', 'flip', 'spin', 'stretch', 'clock', 'doors', 'lightLeak', 'bars'];

const uses = [
  {t: 'Vinhetas e aberturas', d: 'Intro do canal, abertura de aula, assinatura de marca.'},
  {t: 'Reels, TikTok e Shorts', d: 'Vídeos verticais com gancho forte nos primeiros segundos.'},
  {t: 'Anúncios animados', d: 'Oferta, benefícios, preço e chamada para ação em 15 segundos.'},
  {t: 'Legendas animadas', d: 'Legendas palavra por palavra por cima do seu vídeo.'},
];

const kit = [
  {t: 'Skill Motion Pronto para o Claude Code', d: 'Ensina o Claude a dirigir motion: ritmo, tipografia, paleta e receitas por tipo de vídeo.'},
  {t: 'Projeto de vídeo pronto (Remotion)', d: '19 cenas editáveis: título, tipografia cinética, prompt, código, cartões, comparação, contador, logo, legendas e mais.'},
  {t: '21 transições', d: 'Glitch, whip, iris, flash, light leak, portas, persianas e outras, todas configuráveis.'},
  {t: '4 estilos visuais + tema da sua marca', d: 'Troque o visual inteiro com uma palavra, ou peça as cores da sua marca.'},
  {t: 'Efeitos sonoros automáticos', d: 'Whoosh nas transições, impacto, teclas e pops no tempo certo. Sons próprios, livres para uso comercial.'},
  {t: 'Texto que se ajusta sozinho', d: 'Títulos diminuem para caber na tela, mesmo com palavras longas no vertical.'},
  {t: 'Prévia ao vivo', d: 'Acompanhe o vídeo sendo montado no navegador e peça ajustes antes de gerar o MP4.'},
  {t: '3 formatos', d: 'Vertical 9:16, horizontal 16:9 e quadrado 1:1 a partir do mesmo roteiro.'},
  {t: 'Instalador para macOS, Windows e Linux', d: 'Confere o kit e o Node.js antes de copiar qualquer coisa.'},
  {t: 'Guia de problemas comuns', d: 'O Claude consulta sozinho quando algo dá errado e explica a solução.'},
];

const faqs = [
  {q: 'Preciso saber programar?', a: 'Não. Você descreve o vídeo em português e o Claude Code escreve o código. Você só precisa copiar e colar alguns comandos na instalação, e o guia mostra cada um.'},
  {q: 'O Claude Code está incluso?', a: 'Não. O Claude Code é da Anthropic e exige um plano pago (Pro, Max, Team, Enterprise ou créditos de API no Console), contratado direto com eles. O Motion Pronto é a skill e o projeto de vídeo que você usa junto com ele.'},
  {q: 'O vídeo é gerado na nuvem?', a: 'Não. A renderização acontece no seu computador, com o Remotion. Seus arquivos não saem da sua máquina.'},
  {q: 'Funciona no Windows?', a: 'Sim. O kit tem instalador para Windows 10 ou mais novo, macOS 13 ou mais novo e Linux.'},
  {q: 'Posso usar os vídeos comercialmente?', a: 'Sim, os vídeos que você cria são seus. O Remotion é gratuito para pessoas físicas e empresas com até 3 funcionários; empresas maiores precisam de uma licença do Remotion.'},
  {q: 'O que o Motion Pronto não faz?', a: 'Não gera imagens ou vídeos realistas por IA, nem faz edição de filmagem com cortes de câmera. Ele cria motion design: tipografia, formas, interfaces e legendas, e pode usar suas fotos e vídeos como parte das cenas.'},
  {q: 'Como recebo o kit?', a: 'Assim que o Mercado Pago aprovar o pagamento, você volta para o site e baixa o ZIP. Pix costuma aprovar na hora. Se fechar a página, use o número do pagamento e seu e-mail em “Acessar minha compra”.'},
  {q: 'O Motion Pronto é da Anthropic?', a: 'Não. O Motion Pronto é um produto independente, sem afiliação com a Anthropic ou com o Remotion.'},
];

export default async function Home({searchParams}: {searchParams: Promise<{pagamento?: string}>}) {
  const {pagamento} = await searchParams;
  const price = formatPrice(config.price);

  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="badge mono">Skill para Claude Code</span>
            <h1>
              Motion design <span className="accent">profissional</span>. Você só descreve.
            </h1>
            <p className="lead">
              Peça o vídeo em português e o Claude Code cria a animação, confere cada cena e entrega o MP4. Sem After Effects, sem timeline, sem keyframe.
            </p>
            {pagamento ? (
              <p className="notice" role="status">
                {pagamento === 'falhou'
                  ? 'O pagamento não foi concluído. Você pode tentar de novo quando quiser.'
                  : 'O checkout está indisponível agora. Tente de novo em alguns minutos.'}
              </p>
            ) : null}
            <div className="hero-actions">
              <BuyForm label={`Comprar por ${price}`} />
              <a href="#exemplo" className="btn btn-ghost">
                Ver um exemplo
              </a>
            </div>
            <p className="fineprint">Pagamento único via Mercado Pago (Pix ou cartão). Requer Claude Code, vendido à parte pela Anthropic.</p>
          </div>
          <div className="phone">
            <video src="/media/demo.mp4" poster="/media/demo-poster.jpg" autoPlay muted loop playsInline controls aria-label="Vídeo de demonstração feito com o Motion Pronto" />
          </div>
        </div>
      </section>

      <section id="exemplo">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">Exemplo</span>
            <h2>Um pedido. Um vídeo.</h2>
            <p>O vídeo de demonstração aqui no topo foi feito assim, com o próprio Motion Pronto. Os ajustes também são por conversa.</p>
          </div>
          <div className="prompt-demo">
            <div className="terminal">
              <div className="dim">~/motion-pronto $ claude</div>
              <br />
              <div>
                <span className="you">› </span>cria um vídeo vertical de 25 segundos apresentando o Motion Pronto: abre com uma palavra de impacto, mostra alguém digitando
                um pedido, o código, o fluxo até o MP4, o que vem no kit, um antes e depois, o logo e um botão de compra. Tema ember.
              </div>
              <br />
              <div className="dim">● Escolhi 8 cenas e 7 transições, conferi os quadros e renderizei.</div>
              <div className="dim">● Pronto: out/demo.mp4 (26,7 s, 1080×1920)</div>
              <br />
              <div>
                <span className="you">› </span>deixa o final mais rápido e faz uma versão horizontal
              </div>
            </div>
            <div className="grid grid-2">
              {uses.map((u) => (
                <div className="card" key={u.t}>
                  <h3>{u.t}</h3>
                  <p>{u.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">Como funciona</span>
            <h2>Do pedido ao MP4</h2>
            <p>O Claude não “gera” o vídeo como uma imagem de IA. Ele escreve cada cena em código, e o seu computador transforma esse código em vídeo, quadro a quadro.</p>
          </div>
          <div className="grid grid-4">
            {steps.map((s, i) => (
              <div className="card" key={s.t}>
                <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="estilos">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">4 estilos + o da sua marca</span>
            <h2>O mesmo roteiro, outro visual</h2>
            <p>Troque o estilo do vídeo inteiro com uma palavra. Ou passe as cores da sua marca e o Claude cria um tema só seu.</p>
          </div>
          <div className="grid grid-4">
            {themes.map((t) => (
              <div className="card theme" key={t.name}>
                <img src={t.img} alt={`Exemplo do tema ${t.name}`} loading="lazy" />
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="transicoes">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">21 transições</span>
            <h2>Cortes com intenção</h2>
            <p>Rápidas para Reels, lentas para clima de cinema. O Claude escolhe de acordo com o que você pedir, ou você escolhe pelo nome.</p>
          </div>
          <video className="wide-video" src="/media/transicoes.mp4" autoPlay muted loop playsInline preload="none" aria-label="Todas as transições em sequência" />
          <div className="chips">
            {transitions.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="o-que-vem">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">O que vem no kit</span>
            <h2>Tudo pronto para usar</h2>
          </div>
          <ul className="checklist">
            {kit.map((k) => (
              <li key={k.t}>
                <div>
                  <strong>{k.t}</strong>
                  <span>{k.d}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="requisitos">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">Requisitos</span>
            <h2>O que você precisa ter</h2>
          </div>
          <div className="grid grid-4">
            <div className="card">
              <h3>Sistema</h3>
              <p>macOS 13+, Windows 10+ ou Linux</p>
            </div>
            <div className="card">
              <h3>Claude Code</h3>
              <p>Plano pago da Anthropic: Pro, Max, Team, Enterprise ou Console. Vendido à parte.</p>
            </div>
            <div className="card">
              <h3>Node.js 18+</h3>
              <p>Gratuito, em nodejs.org. O instalador confere a versão.</p>
            </div>
            <div className="card">
              <h3>Espaço</h3>
              <p>Cerca de 600 MB livres para o projeto e o navegador de renderização.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="comprar">
        <div className="wrap">
          <div className="card price-box">
            <span className="mono">Pagamento único</span>
            <div className="price">
              {price}
              <small>à vista, sem mensalidade</small>
            </div>
            <p style={{color: 'var(--muted)'}}>Skill + projeto com 19 cenas, 21 transições e 4 estilos. Atualizações da versão 1 incluídas.</p>
            <BuyForm label="Comprar agora" big />
            <p className="fineprint">
              Pix ou cartão pelo Mercado Pago. Já comprou? <a href="/acesso">Acessar minha compra</a>
            </p>
          </div>
        </div>
      </section>

      <section id="duvidas">
        <div className="wrap">
          <div className="section-head">
            <span className="mono">Dúvidas</span>
            <h2>Perguntas frequentes</h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <span className="logo">Motion Pronto</span>
          <p>
            Motion Pronto é um produto independente e não tem afiliação, patrocínio ou aprovação da Anthropic ou do Remotion. Claude e Claude Code são marcas da
            Anthropic. Remotion é marca de seus respectivos donos.
          </p>
          <p>
            <a href="/acesso">Acessar minha compra</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
