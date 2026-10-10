import {NextResponse} from 'next/server';
import {config} from '@/lib/config';
import {createCheckout} from '@/lib/mercadopago';

export const dynamic = 'force-dynamic';

/** O botão "Comprar" envia um formulário para cá; redirecionamos para o Checkout Pro. */
export async function POST() {
  try {
    const url = await createCheckout();
    return NextResponse.redirect(url, 303);
  } catch (err) {
    console.error('checkout', err);
    return NextResponse.redirect(`${config.siteUrl}/?pagamento=indisponivel`, 303);
  }
}
