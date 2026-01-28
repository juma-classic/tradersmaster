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
    const originalWarn = console.warn;
    
    console.error = function(...args) {
        const message = args.join(' ');
        
        // Suppress known missing resource errors
        if (message.includes('Failed to load resource') ||
            message.includes('ChunkLoadError') ||
            message.includes('Remote Config Server is out of reach') ||
            message.includes('Loading chunk') ||
            message.includes('404') ||
            message.includes('The above error occurred in one of your React components') ||
            message.includes('Unexpected token') ||
            message.includes('SyntaxError')) {
            // Log as info instead
            console.info('DEV: Suppressed error -', ...args);
            return;
        }
        
        // Allow other errors through
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        const message = args.join(' ');
        
        // Suppress known warnings
        if (message.includes('componentWillMount has been renamed') ||
            message.includes('Resource size is not correct') ||
            message.includes('was preloaded using link preload') ||
            message.includes('Missing JavaScript module loaded')) {
            // Suppress these warnings
            return;
        }
        
        // Allow other warnings through
        originalWarn.apply(console, args);
    };
}

// Mock missing APIs
if (window.DEV_CONFIG.MOCK_API_RESPONSES) {
    // Mock fetch for API calls
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        // Mock remote config API
        if (url.includes('remote-config') || url.includes('api.') || url.includes('config')) {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ 
                    status: 'success', 
                    data: {
                        feature_flags: {},
                        remote_config: {},
                        settings: {}
                    },
                    message: 'Mocked for development'
                }),
                text: () => Promise.resolve(JSON.stringify({
                    status: 'success',
                    data: {},
                    message: 'Mocked for development'
                }))
            });
        }
        
        // Use original fetch for local resources
        return originalFetch.apply(this, arguments);
    };
}

// Handle chunk loading errors
window.addEventListener('error', function(event) {
    if (event.error && event.error.name === 'ChunkLoadError') {
        console.info('DEV: ChunkLoadError caught and suppressed:', event.error.message);
        event.preventDefault();
        return false;
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && event.reason.name === 'ChunkLoadError') {
        console.info('DEV: ChunkLoadError promise rejection caught and suppressed:', event.reason.message);
        event.preventDefault();
        return false;
    }
});

console.log('Development configuration loaded:', window.DEV_CONFIG);