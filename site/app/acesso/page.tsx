import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'Acessar minha compra · Motion Pronto', robots: {index: false}};

/** Recuperação de acesso: número do pagamento + e-mail usado no Mercado Pago. */
export default function Acesso() {
  return (
    <main>
      <section className="page">
        <div className="wrap">
          <form className="glass" action="/obrigado" method="get">
            <span className="eyebrow">Já comprou?</span>
            <h1>Acessar minha compra</h1>
            <p className="muted">
              O número do pagamento está no comprovante do Mercado Pago (no app ou no e-mail que eles enviaram), com o nome “Número da operação” ou “ID do
              pagamento”.
            </p>
            <div className="field">
              <label htmlFor="payment_id">Número do pagamento</label>
              <input id="payment_id" name="payment_id" inputMode="numeric" pattern="[0-9]{5,20}" required autoComplete="off" placeholder="ex.: 123456789012" />
              <span className="err">Use só os números do pagamento, entre 5 e 20 dígitos.</span>
            </div>
            <div className="field">
              <label htmlFor="email">E-mail usado na compra</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="voce@email.com" />
              <span className="err">Digite um email válido, como nome@provedor.com.</span>
            </div>
            <button className="btn btn-primary" type="submit">
              Liberar download
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
