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
  
  // Handle translations.js specifically
  if (req.url === '/translations.js') {
    console.log('Serving translations.js');
    const filePath = path.join(__dirname, 'public', 'translations.js');
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading translations.js:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Translations file not found');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

  // Handle preorder page
  if (req.url === '/preorder') {
    console.log('Serving preorder page');
    const filePath = path.join(__dirname, 'public', 'preorder.html');
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading preorder.html:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Preorder page not found');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }
  
  // Handle all other routes - serve index.html
  const filePath = path.join(__dirname, 'public', 'index.html');
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Index file not found');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
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