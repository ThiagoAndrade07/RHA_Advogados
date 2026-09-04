import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const root = path.resolve(project, process.argv[2] || '.');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const requested = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = requested.replace(/^\/+/, '') || 'index.html';
    const target = path.resolve(root, relative);
    const confined = path.relative(root, target);
    if (confined.startsWith('..') || path.isAbsolute(confined) || relative.split('/').some(part => part.startsWith('.')) || !/^(index\.html|assets\/)/.test(relative)) {
      response.writeHead(404); response.end('Não encontrado'); return;
    }
    const info = await stat(target);
    if (!info.isFile()) throw new Error('Not a file');
    const data = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404); response.end('Não encontrado');
  }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
