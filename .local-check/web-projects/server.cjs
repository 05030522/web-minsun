const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.mp4':'video/mp4'};
const freezeDir = path.join(__dirname, 'frozen');
fs.mkdirSync(freezeDir, {recursive:true});
const before = fs.readFileSync(path.join(__dirname,'index.before.html'),'utf8');
const frozen = new Map();
for (const match of before.matchAll(/(?:href|src)="\.\/([^"?]+\.(?:css|js))(?:\?[^"]*)?"/g)) {
  const relative = match[1];
  const dest = path.join(freezeDir, relative);
  if (!fs.existsSync(dest)) {fs.mkdirSync(path.dirname(dest), {recursive:true}); fs.copyFileSync(path.join(root,relative),dest);}
  frozen.set('/'+relative, dest);
}
const html = before.replace(/((?:href|src)=")\.\/([^"?]+\.(?:css|js))(\?[^\"]*)?"/g, '$1/__baseline/$2$3"');
http.createServer((request,response) => {
  try {
    let name = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    if (name === '/baseline.html') { response.writeHead(200,{'Content-Type':types['.html'],'Cache-Control':'no-store'}); response.end(html); return; }
    let file;
    if(name.startsWith('/__baseline/')) {name=name.slice('/__baseline'.length); file=frozen.get(name);}
    if(!file) file=path.resolve(root,'.'+name);
    if(!file.startsWith(root+path.sep) && file!==root) {response.writeHead(403); response.end(); return;}
    if(fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
    response.writeHead(200,{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(response);
  } catch(error) {response.writeHead(404);response.end('Not found');}
}).listen(8765,'127.0.0.1',()=>console.log('Local verification server on http://127.0.0.1:8765'));
