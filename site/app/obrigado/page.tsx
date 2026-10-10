import type {Metadata} from 'next';
import {checkPayment} from '@/lib/mercadopago';
import {createDownloadToken} from '@/lib/token';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title: 'Sua compra · Motion Pronto', robots: {index: false}};

type Search = {payment_id?: string; collection_id?: string; email?: string; external_reference?: string};

export default async function Obrigado({searchParams}: {searchParams: Promise<Search>}) {
  const sp = await searchParams;
  const paymentId = (sp.payment_id ?? sp.collection_id ?? '').trim();
  const fromRecovery = sp.email !== undefined;

  const retry = new URLSearchParams({payment_id: paymentId});
  if (sp.external_reference) retry.set('external_reference', sp.external_reference);
  if (sp.email) retry.set('email', sp.email);
  const retryHref = `/obrigado?${retry.toString()}`;

  let state: 'missing' | 'ok' | 'pending' | 'invalid' | 'error' = 'missing';
  let token = '';
  if (paymentId) {
    try {
      const check = await checkPayment(paymentId);
      if (check.ok) {
        // Vindo do Mercado Pago, a referência aleatória da compra precisa bater.
        // Na recuperação de acesso, o e-mail precisa bater com o do pagamento.
        const allowed = fromRecovery
          ? (check.email ?? '').toLowerCase() === (sp.email ?? '').trim().toLowerCase()
          : sp.external_reference === check.externalReference;
        state = allowed ? 'ok' : 'invalid';
        if (allowed) token = createDownloadToken(paymentId);
      } else {
        state = check.reason === 'pending' ? 'pending' : 'invalid';
      }
    } catch (err) {
      console.error('obrigado', err);
      state = 'error';
    }
  }

  return (
    <main>
      <section className="page">
        <div className="wrap">
          <div className="glass">
            {state === 'ok' ? (
              <>
                <span className="eyebrow">Pagamento aprovado</span>
                <h1>Obrigado! Seu kit está pronto.</h1>
                <a className="btn btn-primary" href={`/api/download?t=${encodeURIComponent(token)}`}>
                  Baixar o Motion Pronto (.zip)
                </a>
                <p className="muted">
                  Extraia o ZIP e siga o arquivo <strong>LEIA-ME.md</strong>. Guarde o número do pagamento <strong>{paymentId}</strong>: com ele e seu
                  e-mail você baixa de novo quando quiser, em “Acessar minha compra”.
                </p>
              </>
            ) : state === 'pending' ? (
              <>
                <span className="eyebrow">Aguardando aprovação</span>
                <h1>Quase lá</h1>
                <p className="muted">
                  O Mercado Pago ainda está processando o pagamento <strong>{paymentId}</strong>. Pix costuma levar segundos; boleto, até 2 dias úteis.
                  Atualize esta página daqui a pouco.
                </p>
                <a className="link" href={retryHref}>
                  Verificar de novo
                </a>
              </>
            ) : state === 'error' ? (
              <>
                <h1>Não conseguimos verificar agora</h1>
                <p className="muted">O Mercado Pago não respondeu. Seu pagamento está seguro. Tente de novo em alguns minutos.</p>
                <a className="link" href={retryHref}>
                  Tentar de novo
                </a>
              </>
            ) : (
              <>
                <h1>Compra não encontrada</h1>
                <p className="muted">
                  {state === 'missing'
                    ? 'Informe o número do pagamento para acessar sua compra.'
                    : 'Não encontramos um pagamento aprovado do Motion Pronto com esses dados. Confira o número do pagamento no comprovante do Mercado Pago e o e-mail usado na compra.'}
                </p>
                <a className="btn btn-primary" href="/acesso">
                  Acessar minha compra
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
