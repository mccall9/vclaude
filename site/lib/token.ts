import {createHmac, timingSafeEqual} from 'node:crypto';
import {requireEnv} from './config';

/** Link de download assinado: válido por pouco tempo e preso a um pagamento. */
const TTL_MS = 2 * 60 * 60 * 1000;

const sign = (payload: string) => createHmac('sha256', requireEnv('DOWNLOAD_SECRET')).update(payload).digest('base64url');

export const createDownloadToken = (paymentId: string) => {
  const payload = `${paymentId}.${Date.now() + TTL_MS}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
};

/** Devolve o id do pagamento se o token for válido e não tiver expirado. */
export const verifyDownloadToken = (token: string): string | null => {
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return null;
  const payload = Buffer.from(b64, 'base64url').toString();
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const [paymentId, exp] = payload.split('.');
  if (!paymentId || !exp || Number(exp) < Date.now()) return null;
  return paymentId;
};
