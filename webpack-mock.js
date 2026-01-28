// Webpack Runtime Mock for Development
// This helps handle missing webpack chunks gracefully

(function() {
    'use strict';
    
    console.log('🔧 Loading Webpack Runtime Mock...');
    
    // Mock webpack runtime if it doesn't exist
    if (!window.__webpack_require__) {
        window.__webpack_require__ = function(moduleId) {
            console.warn('🔧 DEV: Mock webpack require for:', moduleId);
            return {};
        };
        
        // Mock webpack chunk loading
        window.__webpack_require__.e = function(chunkId) {
            console.warn('🔧 DEV: Mock chunk load for:', chunkId);
            return Promise.resolve();
        };
        
        // Mock webpack public path
        window.__webpack_require__.p = '/';
        
        // Mock webpack cache
        window.__webpack_require__.cache = {};
        
        // Mock webpack modules
        window.__webpack_require__.modules = {};
    }
    
    // Mock webpackChunk if it doesn't exist
    if (!window.webpackChunk) {
        window.webpackChunk = [];
        
        // Override push to handle chunk loading
        const originalPush = window.webpackChunk.push;
        window.webpackChunk.push = function(chunk) {
            console.log('🔧 DEV: Processing webpack chunk:', chunk[0]);
            
            try {
                // Try to process the chunk normally
                if (originalPush) {
                    return originalPush.call(this, chunk);
                }
            } catch (error) {
                console.warn('🔧 DEV: Chunk processing failed, using mock:', error.message);
                // Return empty result to prevent errors
                return [];
            }
        };
    }
    
    // Mock self.webpackChunk for web workers
    if (typeof self !== 'undefined' && !self.webpackChunk) {
        self.webpackChunk = window.webpackChunk || [];
    }
    
    // Handle dynamic imports
    if (!window.__webpack_require__.import) {
        window.__webpack_require__.import = function(request) {
            console.warn('🔧 DEV: Mock dynamic import for:', request);
            return Promise.resolve({});
        };
    }
    
    // Mock webpack jsonp callback
    window.webpackJsonpCallback = function(data) {
        console.log('🔧 DEV: Mock JSONP callback:', data);
        return [];
    };
    
    // Override fetch to handle chunk loading
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // If it's a webpack chunk request that fails, return empty module
        if (url.includes('.js') && url.includes('core.')) {
            return originalFetch.apply(this, arguments).catch(error => {
                console.warn('🔧 DEV: Fetch failed for chunk, returning empty module:', url);
                return new Response('// Empty module mock\nexport default {};', {
                    status: 200,
                    headers: { 'Content-Type': 'application/javascript' }
                });
            });
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    console.log('✅ Webpack Runtime Mock loaded');
})();