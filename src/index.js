const http = require('http');
const path = require('path');
const fs = require('fs');
const PBTEngine = require('./pbt_engine');

const PORT = parseInt(process.env.PORT, 10) || 7073;
const startTime = Date.now();

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
  const pathname = reqUrl.pathname;

  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'UP', service: 'InvariantShrink-PBT', uptimeSeconds: Math.floor((Date.now() - startTime) / 1000) }));
  }

  if (req.method === 'POST' && pathname === '/api/check') {
    const pbt = new PBTEngine(Date.now());
    const intGen = pbt.genInteger(0, 500);
    // Injected property bug for demo
    const result = pbt.check(intGen, (x) => x < 64, 100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  }

  let filePath = path.join(__dirname, '..', 'public', pathname === '/' ? 'index.html' : pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return fs.createReadStream(filePath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log('InvariantShrink-PBT running on port ' + PORT);
});
