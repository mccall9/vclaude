import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'Termos de uso · Motion Pronto'};

export default function Termos() {
  return (
    <main className="page">
      <div className="wrap">
        <article className="glass">
          <span className="eyebrow">Atualizado em outubro de 2026</span>
          <h1>Termos de uso</h1>
          <h2>O que você compra</h2>
          <p>
            Uma licença de uso pessoal e comercial do kit Motion Pronto: a skill para o Claude Code, o projeto de vídeo, os efeitos sonoros e os
            instaladores. Os vídeos que você cria com o kit são seus.
          </p>
          <h2>O que não é permitido</h2>
          <p>Revender, compartilhar ou publicar o kit, inteiro ou em partes, para outras pessoas usarem.</p>
          <h2>O que não está incluso</h2>
          <p>
            O Claude Code, vendido pela Anthropic, e a licença do Remotion para empresas com mais de 3 funcionários. O Motion Pronto não tem
            afiliação com a Anthropic nem com o Remotion.
          </p>
          <h2>Reembolso</h2>
          <p>
            Você tem 7 dias a partir da compra para pedir o dinheiro de volta, sem precisar justificar, como prevê o Código de Defesa do
            Consumidor. O pedido é feito pelo Mercado Pago.
          </p>
          <h2>Atualizações</h2>
          <p>Correções e melhorias da versão 1 ficam disponíveis para download na página de acesso à compra.</p>
          <a href="/" className="link">
            Voltar para o início
          </a>
        </article>
      </div>
    </main>
  );
}
