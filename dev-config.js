// Development configuration to handle missing resources
window.DEV_CONFIG = {
    // Disable external API calls in development
    DISABLE_EXTERNAL_APIS: true,
    
    // Mock API responses
    MOCK_API_RESPONSES: true,
    
    // Disable analytics and tracking
    DISABLE_TRACKING: true,
    
    // Override console errors for missing resources
    SUPPRESS_MISSING_RESOURCE_ERRORS: true
};

// Override console.error to suppress known missing resource errors
if (window.DEV_CONFIG.SUPPRESS_MISSING_RESOURCE_ERRORS) {
    const originalError = console.error;
    console.error = function(...args) {
        const message = args.join(' ');
        
        // Suppress known missing resource errors
        if (message.includes('Failed to load resource') ||
            message.includes('ChunkLoadError') ||
            message.includes('Remote Config Server is out of reach') ||
            message.includes('Loading chunk') ||
            message.includes('404')) {
            // Log as warning instead
            console.warn('DEV: Suppressed error -', ...args);
            return;
        }
        
        // Allow other errors through
        originalError.apply(console, args);
    };
}

// Mock missing APIs
if (window.DEV_CONFIG.MOCK_API_RESPONSES) {
    // Mock fetch for API calls
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // Mock remote config API
        if (url.includes('remote-config') || url.includes('api.')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ status: 'mocked', data: {} }),
                text: () => Promise.resolve('{"status":"mocked"}')
            });
        }
        
        // Use original fetch for local resources
        return originalFetch.apply(this, arguments);
    };
}

console.log('Development configuration loaded:', window.DEV_CONFIG);