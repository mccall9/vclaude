import type {NextConfig} from 'next';

const config: NextConfig = {
  // O ZIP do kit fica fora de public/ e só é servido pela rota protegida de download
  outputFileTracingIncludes: {'/api/download': ['./private/**']},
};

export default config;
