import {
  ArrowRight,
  ArrowsOutSimple,
  CheckCircle,
  Eye,
  FilmSlate,
  Lightning,
  Palette,
  Plus,
  ShieldCheck,
  SpeakerHigh,
  Sparkle,
  TextAa,
} from '@phosphor-icons/react/dist/ssr';
import {Logo} from '@/components/Logo';
import {Reveal} from '@/components/Reveal';
import {Tagline} from '@/components/Tagline';
import {config, formatPrice} from '@/lib/config';

const BuyButton = ({label}: {label: string}) => (
  <form action="/api/checkout" method="post">
    <button type="submit" className="btn btn-primary">
      {label}
      <ArrowRight size={18} weight="bold" aria-hidden="true" />
    </button>
  </form>
);

const styles = [
  {name: 'Ember', d: 'escuro com laranja', img: '/media/tema-0.jpg'},
  {name: 'Neon', d: 'ciano e magenta', img: '/media/tema-1.jpg'},
  {name: 'Paper', d: 'editorial claro', img: '/media/tema-2.jpg'},
  {name: 'Mono', d: 'preto e branco', img: '/media/tema-3.jpg'},
];

const scenes = ['título', 'tipografia cinética', 'impacto', 'prompt', 'código', 'cartões', 'antes e depois', 'contador', 'logo', 'legendas', 'chamada final', '+8'];

// Alturas fixas: a onda do card de som é sempre igual
const wave = [18, 34, 22, 46, 30, 14, 40, 26, 48, 20, 36, 12, 28, 44, 24, 16, 38, 30, 46, 22];

const steps = [
  {
    t: 'Instale uma vez',
    d: 'Baixe o kit, rode o instalador e pronto. Ele confere o Node.js, copia o projeto e coloca a skill no Claude Code.',
    code: 'bash instalar.sh',
  },
  {
    t: 'Descreva o vídeo',
    d: 'Fale como falaria com um editor: duração, formato, clima, textos, cores da marca. O Claude escolhe cenas, estilo e transições.',
    code: '› vinheta de 15s pro meu Reels, tema neon',
  },
  {
    t: 'Ajuste e receba o MP4',
    d: 'Acompanhe a prévia no navegador, peça mudanças por conversa e receba o vídeo com som na pasta do projeto.',
    code: '✓ out/vinheta.mp4 · 15,2 s · 1080×1920',
  },
];

const includes = [
  'Skill Motion Pronto para o Claude Code',
  'Projeto de vídeo com 19 cenas e 21 transições',
  '4 estilos prontos e tema com as cores da sua marca',
  'Efeitos sonoros próprios, livres para uso comercial',
  'Instalador para macOS, Windows e Linux',
  'Atualizações da versão 1',
];

const faqs = [
  {q: 'Preciso saber programar?', a: 'Não. Você descreve o vídeo em português e o Claude Code escreve o código. Na instalação você cola dois comandos, e o guia mostra cada um.'},
  {q: 'O Claude Code está incluso?', a: 'Não. O Claude Code é da Anthropic e pede um plano pago (Pro, Max, Team, Enterprise ou créditos no Console), contratado direto com eles. O Motion Pronto é a skill e o projeto de vídeo que você usa junto.'},
  {q: 'O que eu preciso ter no computador?', a: 'macOS 13 ou mais novo, Windows 10 ou mais novo, ou Linux. Node.js 18 ou mais novo (gratuito, em nodejs.org) e uns 600 MB livres. O instalador confere tudo antes de começar.'},
  {q: 'O vídeo é gerado na nuvem?', a: 'Não. Tudo roda no seu computador, com o Remotion. Seus arquivos não saem da sua máquina.'},
  {q: 'Os vídeos têm som?', a: 'Sim. Transições, impactos, digitação e contadores vêm com efeitos sonoros no tempo certo. Você pode baixar o volume, desligar ou colocar a sua música.'},
  {q: 'Posso usar os vídeos comercialmente?', a: 'Sim, os vídeos que você cria são seus. O Remotion é gratuito para pessoas físicas e empresas com até 3 funcionários; empresas maiores precisam de uma licença do Remotion.'},
  {q: 'O que o Motion Pronto não faz?', a: 'Não gera imagens ou vídeos realistas por IA e não edita filmagem com cortes de câmera. Ele faz motion design: tipografia, formas, interfaces e legendas, e pode usar suas fotos e vídeos dentro das cenas.'},
  {q: 'Como recebo o kit?', a: 'Assim que o Mercado Pago aprovar o pagamento, você volta para o site e baixa o ZIP. Pix costuma aprovar na hora. Se fechar a página, use o número do pagamento e seu email em “Acessar minha compra”.'},
  {q: 'E se eu me arrepender?', a: 'Você tem 7 dias a partir da compra para pedir o dinheiro de volta, sem precisar explicar o motivo. Peça pelo próprio Mercado Pago, na tela do pagamento.'},
  {q: 'O Motion Pronto é da Anthropic?', a: 'Não. É um produto independente, sem afiliação com a Anthropic ou com o Remotion.'},
];

export default async function Home({searchParams}: {searchParams: Promise<{pagamento?: string}>}) {
  const {pagamento} = await searchParams;
  const price = formatPrice(config.price);

  return (
    <main>
      {/* ---------------- Hero ---------------- */}
      <div className="ambient" aria-hidden="true">
        <video src="/media/demo.mp4" autoPlay muted loop playsInline preload="metadata" tabIndex={-1} />
      </div>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Reveal className="chip glass">
              <b>Novo</b> Skill para o Claude Code
            </Reveal>
            <Reveal delay={80}>
              <h1>
                <span>Seu próximo motion</span> <span>sai de uma frase.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead">
                Descreva o vídeo em português. O Claude Code monta as cenas, coloca os sons e entrega o MP4 no seu computador. Sem After Effects,
                sem timeline.
              </p>
            </Reveal>
            {pagamento ? (
              <p className="notice" role="status">
                {pagamento === 'falhou'
                  ? 'O pagamento não foi concluído. Você pode tentar de novo quando quiser.'
                  : 'O checkout está indisponível agora. Tente de novo em alguns minutos.'}
              </p>
            ) : null}
            <Reveal delay={240} className="hero-actions">
              <BuyButton label={`Quero o Motion Pronto · ${price}`} />
              <a href="#como-funciona" className="link">
                Como funciona
              </a>
            </Reveal>
            <Reveal delay={320} className="proof">
              <span>
                <Lightning size={16} weight="fill" aria-hidden="true" /> Pagamento único
              </span>
              <span>
                <ShieldCheck size={16} weight="fill" aria-hidden="true" /> 7 dias para pedir reembolso
              </span>
              <span>
                <SpeakerHigh size={16} weight="fill" aria-hidden="true" /> Vídeos com som
              </span>
            </Reveal>
          </div>

          <Reveal delay={200} className="stage">
            <div className="phone glass">
              <video
                src="/media/demo.mp4"
                poster="/media/demo-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label="Vídeo de demonstração feito com o Motion Pronto"
              />
            </div>
            <div className="float float-prompt glass mono" aria-hidden="true">
              <span>›</span> cria um vídeo de 25s apresentando o Motion Pronto, tema ember
            </div>
            <div className="float float-done glass mono" aria-hidden="true">
              <CheckCircle size={18} weight="fill" /> out/demo.mp4 · 28,3 s
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Frase ---------------- */}
      <section className="tagline" aria-label="O que o Motion Pronto faz">
        <div className="wrap">
          <Tagline text="Você escreve uma frase. O Claude escreve cada cena em código. Seu computador transforma tudo em *vídeo,* quadro a quadro." />
        </div>
      </section>

      {/* ---------------- Como funciona ---------------- */}
      <section id="como-funciona">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Como funciona</span>
            <h2>Três passos, uma conversa</h2>
            <p>O Claude não “desenha” o vídeo como uma IA de imagem. Ele escreve cada cena, confere os quadros e só então renderiza.</p>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100} className="step glass">
                <span className="n">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <code>{s.code}</code>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- O que vem ---------------- */}
      <section id="o-que-vem">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">O que vem no kit</span>
            <h2>Tudo que um motion precisa, já pronto</h2>
            <p>Cenas, transições, estilos e sons pensados juntos. O Claude combina as peças; você decide o tom.</p>
          </Reveal>
          <div className="bento">
            <Reveal className="cell glass b-styles">
              <div className="icon">
                <Palette size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>4 estilos e o da sua marca</h3>
              <p>Troque o visual inteiro com uma palavra, ou passe as cores da marca e ganhe um tema só seu.</p>
              <div className="styles-grid">
                {styles.map((s) => (
                  <figure key={s.name}>
                    <img src={s.img} alt={`Título no estilo ${s.name}`} loading="lazy" />
                    <figcaption>
                      <strong>{s.name}</strong> · {s.d}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="cell glass b-trans">
              <div className="icon">
                <FilmSlate size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>21 transições</h3>
              <p>Rápidas para Reels, lentas para clima de cinema. Glitch, whip, iris, flash, portas e mais.</p>
              <video
                className="trans-video"
                src="/media/transicoes.mp4"
                poster="/media/transicoes-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="As 21 transições em sequência"
              />
            </Reveal>

            <Reveal className="cell glass b-sound">
              <div className="icon">
                <SpeakerHigh size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>Som no tempo certo</h3>
              <p>Whoosh nos cortes, impacto nas palavras grandes, teclas na digitação.</p>
              <div className="wave" aria-hidden="true">
                {wave.map((h, i) => (
                  <i key={i} style={{height: h}} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="cell glass b-fit">
              <div className="icon">
                <TextAa size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>Texto que sempre cabe</h3>
              <p>Palavras longas diminuem sozinhas para não sair da tela no celular.</p>
              <div className="fit-demo" aria-hidden="true">
                INACREDITAVELMENTE
              </div>
            </Reveal>

            <Reveal className="cell glass b-scenes">
              <div className="icon">
                <Sparkle size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>19 cenas prontas</h3>
              <p>Cada uma com animação, ritmo e som já ajustados. O Claude cria cenas novas quando precisa.</p>
              <div className="tags">
                {scenes.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="cell glass b-formats">
              <div className="icon">
                <Eye size={22} weight="duotone" aria-hidden="true" />
              </div>
              <h3>Prévia ao vivo, 3 formatos</h3>
              <p>Veja o vídeo no navegador enquanto ele é montado. Vertical, horizontal e quadrado do mesmo roteiro.</p>
              <div className="formats" aria-hidden="true">
                <div style={{width: 45, height: 80}}>9:16</div>
                <div style={{width: 128, height: 72}}>16:9</div>
                <div style={{width: 72, height: 72}}>1:1</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Exemplo ---------------- */}
      <section id="exemplo">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Na prática</span>
            <h2>O vídeo do topo saiu desta conversa</h2>
            <p>E os ajustes também são por conversa: mais lento, outro estilo, versão horizontal.</p>
          </Reveal>
          <div className="convo">
            <Reveal className="glass terminal">
              <div className="term-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span className="mono">~/motion-pronto · claude</span>
              </div>
              <div className="term-body">
                <p>
                  <span className="you">› </span>cria um vídeo vertical de 25 segundos apresentando o Motion Pronto. Abre com uma palavra de impacto, mostra
                  alguém digitando um pedido, o código, o fluxo até o MP4, o que vem no kit, um antes e depois, o logo e um botão de compra. Tema
                  ember.
                </p>
                <p className="claude">● Abri a prévia no navegador. Escolhi 8 cenas e 7 transições.</p>
                <p className="claude">● Conferi os quadros: nenhum texto saindo da tela.</p>
                <p className="claude">● Pronto: out/demo.mp4 (28,3 s · 1080×1920 · com som)</p>
                <p>
                  <span className="you">› </span>deixa o final mais lento e faz uma versão horizontal
                </p>
              </div>
            </Reveal>
            <div className="facts">
              {[
                ['19', 'cenas prontas'],
                ['21', 'transições'],
                ['10', 'efeitos sonoros'],
                ['3', 'formatos de vídeo'],
              ].map(([n, l], i) => (
                <Reveal key={l} delay={i * 80} className="fact glass">
                  <strong>{n}</strong>
                  <span>{l}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Preço ---------------- */}
      <section id="preco">
        <div className="wrap">
          <Reveal className="glass price-card">
            <span className="eyebrow">Pagamento único</span>
            <div className="price">
              {price}
              <small>sem mensalidade · Pix ou cartão pelo Mercado Pago</small>
            </div>
            <ul className="includes">
              {includes.map((i) => (
                <li key={i}>
                  <CheckCircle size={18} weight="fill" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <BuyButton label="Quero o Motion Pronto" />
            <div className="guarantee">
              <ShieldCheck size={20} weight="fill" aria-hidden="true" />
              <span>
                <strong>7 dias para pedir reembolso.</strong> Não gostou? Peça o dinheiro de volta pelo Mercado Pago, sem precisar explicar.
              </span>
            </div>
            <p className="muted" style={{fontSize: 14, lineHeight: '20px'}}>
              Requer Claude Code, vendido à parte pela Anthropic. Já comprou?{' '}
              <a href="/acesso" className="accent">
                Acessar minha compra
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Dúvidas ---------------- */}
      <section id="duvidas">
        <div className="wrap">
          <Reveal className="head">
            <span className="eyebrow">Dúvidas</span>
            <h2>Perguntas frequentes</h2>
          </Reveal>
          <div className="faq">
            {faqs.map((f, i) => (
              <Reveal key={f.q} as="details" delay={Math.min(i, 4) * 60} className="glass">
                <summary>
                  {f.q}
                  <Plus size={18} weight="bold" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA final ---------------- */}
      <section className="final">
        <div className="wrap">
          <Reveal className="glass">
            <span className="eyebrow">Comece hoje</span>
            <h2>O próximo vídeo do seu perfil pode sair de uma frase</h2>
            <BuyButton label={`Quero o Motion Pronto · ${price}`} />
            <p className="muted" style={{fontSize: 14, lineHeight: '20px', display: 'inline-flex', alignItems: 'center', gap: 8}}>
              <ArrowsOutSimple size={16} aria-hidden="true" /> Funciona com qualquer plano pago do Claude Code
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <span className="brand">
            <Logo />
          </span>
          <nav aria-label="Rodapé">
            <a href="/acesso">Acessar minha compra</a>
            <a href="/termos">Termos de uso</a>
            <a href="/privacidade">Privacidade</a>
          </nav>
          <p>
            Motion Pronto é um produto independente, sem afiliação, patrocínio ou aprovação da Anthropic ou do Remotion. Claude e Claude Code são
            marcas da Anthropic.
          </p>
        </div>
      </footer>
    </main>
  );
}
