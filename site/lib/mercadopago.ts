import {randomUUID} from 'node:crypto';
import {config, requireEnv} from './config';

// MP_API_BASE só existe para testes locais com um servidor falso
const API = process.env.MP_API_BASE ?? 'https://api.mercadopago.com';

const headers = () => ({
  Authorization: `Bearer ${requireEnv('MP_ACCESS_TOKEN')}`,
  'Content-Type': 'application/json',
});

/** Cria uma preferência do Checkout Pro e devolve a URL de pagamento. */
export const createCheckout = async (): Promise<string> => {
  const res = await fetch(`${API}/checkout/preferences`, {
    method: 'POST',
    headers: {...headers(), 'X-Idempotency-Key': randomUUID()},
    body: JSON.stringify({
      items: [
        {
          id: config.productId,
          title: config.productTitle,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: config.price,
        },
      ],
      external_reference: `${config.refPrefix}${randomUUID()}`,
      back_urls: {
        success: `${config.siteUrl}/obrigado`,
        pending: `${config.siteUrl}/obrigado`,
        failure: `${config.siteUrl}/?pagamento=falhou`,
      },
      auto_return: 'approved',
      statement_descriptor: 'MOTIONPRONTO',
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Mercado Pago respondeu ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {init_point?: string};
  if (!data.init_point) throw new Error('Mercado Pago não devolveu init_point');
  return data.init_point;
};

export type PaymentCheck =
  | {ok: true; email?: string; externalReference: string}
  | {ok: false; reason: 'not_found' | 'pending' | 'rejected' | 'other_product'};

/**
 * Confere no Mercado Pago se o pagamento existe, é deste produto e está aprovado.
 * Como a consulta usa o token da sua conta, pagamentos de outras contas não são encontrados.
 */
export const checkPayment = async (paymentId: string): Promise<PaymentCheck> => {
  if (!/^\d{5,20}$/.test(paymentId)) return {ok: false, reason: 'not_found'};
  const res = await fetch(`${API}/v1/payments/${paymentId}`, {headers: headers(), cache: 'no-store'});
  if (res.status === 404 || res.status === 400) return {ok: false, reason: 'not_found'};
  if (!res.ok) throw new Error(`Mercado Pago respondeu ${res.status}`);
  const p = (await res.json()) as {
    status: string;
    external_reference?: string | null;
    transaction_amount?: number;
    currency_id?: string;
    payer?: {email?: string};
  };
  if (!p.external_reference?.startsWith(config.refPrefix)) return {ok: false, reason: 'other_product'};
  if (p.status === 'pending' || p.status === 'in_process' || p.status === 'authorized') return {ok: false, reason: 'pending'};
  if (p.status !== 'approved') return {ok: false, reason: 'rejected'};
  return {ok: true, email: p.payer?.email, externalReference: p.external_reference};
};
