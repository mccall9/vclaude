/** Configuração lida das variáveis de ambiente (veja .env.example). */
export const config = {
  price: Number(process.env.KIT_PRICE ?? '19.90'),
  siteUrl: (process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  productId: 'kinetiq-kit',
  productTitle: 'Kinetiq · kit de motion design por prompt',
  /** Prefixo do external_reference: garante que o pagamento é deste produto */
  refPrefix: 'kinetiq-',
};

export const formatPrice = (n: number) =>
  n.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

export const requireEnv = (name: string) => {
  const v = process.env[name];
  if (!v) throw new Error(`Variável de ambiente ${name} não configurada`);
  return v;
};
