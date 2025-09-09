const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }));
    return;
  }
  
  // Determine file path and content type
  let filePath;
  let contentType = 'text/html';
  
  if (req.url === '/translations.js') {
    console.log('Serving translations.js');
    filePath = path.join(__dirname, 'public', 'translations.js');
    contentType = 'application/javascript';
  } else if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'public', 'index.html');
    contentType = 'text/html';
  } else {
    // For any other route, serve index.html (for client-side routing)
    filePath = path.join(__dirname, 'public', 'index.html');
    contentType = 'text/html';
  }
  
  console.log('File path:', filePath, 'Content type:', contentType);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Nook website running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

module.exports = server;