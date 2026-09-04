import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'IDs duplicados');
for (const [, attribute, value] of html.matchAll(/\b(src|href)="([^"]+)"/g)) {
  if (value.startsWith('#')) assert(ids.includes(value.slice(1)), `Âncora inexistente: ${value}`);
  if (value.startsWith('./')) await access(path.join(root, value));
  if (attribute === 'src') assert(!value.startsWith('http'), `Dependência remota de execução: ${value}`);
}
assert(!html.includes('cdn.tailwindcss.com'), 'Tailwind de desenvolvimento presente');
assert(!html.includes('mailto:'), 'Contato com destino ativado antes da configuração');
assert(!html.includes('AQ.Ab'), 'Credencial não deve estar no site');
assert(html.includes('hero-equipe.png'), 'Imagem principal ausente');
const css = await readFile(path.join(root, 'assets/fonts.css'), 'utf8');
for (const [, font] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) await access(path.join(root, 'assets', font));
const built = await readFile(path.join(root, 'dist/index.html'), 'utf8');
assert(built.includes('RHM Advogados') && built.includes('contact-form'), 'Build incompleto');
console.log(`OK: ${ids.length} IDs, links locais, fontes, imagens, contatos inativos e build estático verificados.`);
