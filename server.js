const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

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

  // Handle payment processing
  if (req.url === '/api/create-payment-intent' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { edition, customerInfo } = JSON.parse(body);
        
        // Calculate 10% deposit
        const prices = {
          'oak': 89,
          'walnut': 99,
          'bamboo': 79
        };
        
        const fullPrice = prices[edition] || 99;
        const depositAmount = Math.round(fullPrice * 0.1 * 100); // Convert to cents
        
        // In a real implementation, you would use Stripe here
        // For now, we'll simulate a successful payment intent
        const paymentIntent = {
          id: 'pi_' + Math.random().toString(36).substr(2, 9),
          client_secret: 'pi_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9),
          amount: depositAmount,
          currency: 'eur',
          status: 'requires_payment_method'
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          paymentIntent: paymentIntent,
          depositAmount: depositAmount / 100,
          fullPrice: fullPrice,
          remainingAmount: fullPrice - (depositAmount / 100)
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid request data' }));
      }
    });
    return;
  }

  // Handle payment confirmation
  if (req.url === '/api/confirm-payment' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { paymentIntentId, customerInfo } = JSON.parse(body);
        
        // In a real implementation, you would confirm the payment with Stripe
        // For now, we'll simulate a successful confirmation
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Payment confirmed successfully',
          orderId: 'order_' + Math.random().toString(36).substr(2, 9),
          confirmationEmail: customerInfo.email
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid request data' }));
      }
    });
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

  // Handle terms page
  if (req.url === '/terms') {
    console.log('Serving terms page - DEBUG');
    const filePath = path.join(__dirname, 'public', 'terms.html');
    console.log('Terms file path:', filePath);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading terms.html:', err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Terms page not found');
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