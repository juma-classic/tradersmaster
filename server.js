const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

// Create a simple 1x1 transparent PNG for missing images
const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77zgAAAABJRU5ErkJggg==', 'base64');

// Create empty JS module for missing JavaScript files
const emptyJsModule = '// Missing module placeholder\nconsole.warn("Missing JavaScript module loaded");';

// Create empty CSS for missing stylesheets
const emptyCss = '/* Missing CSS file placeholder */';

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to bot.html if accessing root
    if (pathname === '/') {
        pathname = '/status.html';
    } else if (pathname === '/bot' || pathname === '/app') {
        pathname = '/bot.html';
    }
    
    // Remove leading slash and resolve file path
    const filePath = path.join(__dirname, pathname.substring(1));
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Handle missing files gracefully
            if (ext === '.js') {
                // Return empty JavaScript module for missing JS files
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(emptyJsModule);
                console.log(`Missing JS file: ${pathname} - served placeholder`);
                return;
            } else if (ext === '.css') {
                // Return empty CSS for missing stylesheets
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(emptyCss);
                console.log(`Missing CSS file: ${pathname} - served placeholder`);
                return;
            } else if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.ico') {
                // Return transparent PNG for missing images
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(transparentPng);
                console.log(`Missing image: ${pathname} - served transparent placeholder`);
                return;
            } else if (ext === '.svg') {
                // Return empty SVG for missing SVG files
                const emptySvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';
                res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
                res.end(emptySvg);
                console.log(`Missing SVG: ${pathname} - served empty SVG`);
                return;
            } else if (pathname.includes('api') || pathname.includes('config')) {
                // Return mock JSON for API endpoints
                const mockResponse = JSON.stringify({ 
                    status: 'success', 
                    data: {}, 
                    message: 'Mock response for development' 
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(mockResponse);
                console.log(`API call: ${pathname} - served mock JSON`);
                return;
            }
            
            // For other missing files, return 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Not Found</h1><p>File not found: ${pathname}</p>`);
            console.log(`404: ${pathname}`);
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
    console.log('Note: Missing files will be served as placeholders to prevent errors');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nServer stopped.');
    process.exit(0);
});