import {existsSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {NextRequest, NextResponse} from 'next/server';
import {checkPayment} from '@/lib/mercadopago';
import {verifyDownloadToken} from '@/lib/token';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('t') ?? '';
  const paymentId = verifyDownloadToken(token);
  if (!paymentId) {
    return new NextResponse('Link expirado ou inválido. Volte para a página de acesso para gerar um novo.', {status: 403});
  }
  // Confere de novo: um pagamento estornado deixa de liberar o download
  const check = await checkPayment(paymentId);
  if (!check.ok) return new NextResponse('Pagamento não está aprovado.', {status: 403});

  const kitPath = path.join(process.cwd(), 'private', 'motion-pronto-kit.zip');
  if (!existsSync(kitPath)) {
    console.error('download: private/motion-pronto-kit.zip não está no deploy');
    return new NextResponse('O download está temporariamente indisponível. Seu pagamento está confirmado; tente de novo mais tarde.', {status: 503});
  }
  const file = await readFile(kitPath);
  return new NextResponse(new Uint8Array(file), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="motion-pronto-kit.zip"',
      'Cache-Control': 'private, no-store',
    },
  });
}
