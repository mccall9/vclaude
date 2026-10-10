// Monta private/kinetiq-kit.zip a partir de ../kit, ../skill e ../template.
// Roda antes do build (npm run build), localmente e no Vercel.
import {zipSync} from 'fflate';
import {existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(site, '..');
const out = path.join(site, 'private', 'kinetiq-kit.zip');
const skip = new Set(['node_modules', 'out', '.git', '.DS_Store']);

if (!existsSync(path.join(root, 'template'))) {
  if (existsSync(out)) {
    console.log('build-kit: pasta template/ não encontrada, usando o ZIP existente');
    process.exit(0);
  }
  // Sem o kit, o site sobe normalmente e o download avisa que está indisponível
  console.warn('build-kit: template/ não encontrada e não há ZIP em private/: o site sobe sem o kit para download.');
  process.exit(0);
}

const files = {};
const add = (src, dest) => {
  for (const name of readdirSync(src)) {
    if (skip.has(name)) continue;
    const s = path.join(src, name);
    const d = `${dest}/${name}`;
    if (statSync(s).isDirectory()) add(s, d);
    else files[d] = readFileSync(s);
  }
};

for (const f of ['LEIA-ME.md', 'instalar.sh', 'instalar.ps1']) files[`kinetiq/${f}`] = readFileSync(path.join(root, 'kit', f));
add(path.join(root, 'skill', 'kinetiq'), 'kinetiq/skill/kinetiq');
add(path.join(root, 'template'), 'kinetiq/projeto');

mkdirSync(path.dirname(out), {recursive: true});
writeFileSync(out, zipSync(files, {level: 9}));
console.log(`build-kit: ${Object.keys(files).length} arquivos -> private/kinetiq-kit.zip (${(statSync(out).size / 1024).toFixed(0)} KB)`);
