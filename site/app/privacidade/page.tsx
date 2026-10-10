import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'Privacidade · Motion Pronto'};

export default function Privacidade() {
  return (
    <main className="page">
      <div className="wrap">
        <article className="glass">
          <span className="eyebrow">Atualizado em outubro de 2026</span>
          <h1>Privacidade</h1>
          <h2>Pagamento</h2>
          <p>
            O pagamento acontece no Mercado Pago. Nós não vemos nem guardamos dados do seu cartão. Para liberar o download, consultamos no Mercado
            Pago o status do seu pagamento e o email usado na compra.
          </p>
          <h2>O que guardamos</h2>
          <p>Nada além do que o Mercado Pago já registra da sua compra. O site não usa cookies de rastreamento nem anúncios.</p>
          <h2>Seus vídeos</h2>
          <p>O kit roda no seu computador. Seus textos, imagens e vídeos não são enviados para nós.</p>
          <h2>Seus direitos</h2>
          <p>Você pode pedir acesso ou exclusão dos dados da sua compra, conforme a LGPD, pelo contato do vendedor que aparece no comprovante do Mercado Pago.</p>
          <a href="/" className="link">
            Voltar para o início
          </a>
        </article>
      </div>
    </main>
  );
}
