import type {Metadata} from 'next';

export const metadata: Metadata = {title: 'Acessar minha compra · Motion Pronto', robots: {index: false}};

/** Recuperação de acesso: número do pagamento + e-mail usado no Mercado Pago. */
export default function Acesso() {
  return (
    <main>
      <section className="simple">
        <div className="wrap" style={{display: 'grid', placeItems: 'center'}}>
          <form className="card" action="/obrigado" method="get">
            <span className="mono">Já comprou?</span>
            <h2>Acessar minha compra</h2>
            <p style={{color: 'var(--muted)'}}>
              O número do pagamento está no comprovante do Mercado Pago (no app ou no e-mail que eles enviaram), com o nome “Número da operação” ou “ID do
              pagamento”.
            </p>
            <div className="field">
              <label htmlFor="payment_id">Número do pagamento</label>
              <input id="payment_id" name="payment_id" inputMode="numeric" pattern="[0-9]{5,20}" required autoComplete="off" placeholder="ex.: 123456789012" />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail usado na compra</label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="voce@email.com" />
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
