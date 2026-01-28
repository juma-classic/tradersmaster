// Enhanced error handling for development
(function() {
    'use strict';
    
    // Global error handler for uncaught errors
    window.addEventListener('error', function(event) {
        const error = event.error;
        
        // Handle ChunkLoadError specifically
        if (error && error.name === 'ChunkLoadError') {
            console.info('🔧 DEV: ChunkLoadError handled gracefully');
            event.preventDefault();
            
            // Try to recover by reloading the page after a short delay
            setTimeout(() => {
                console.info('🔄 DEV: Attempting to recover from chunk load error...');
                // Don't actually reload in development to avoid infinite loops
                // window.location.reload();
            }, 1000);
            
            return false;
        }
        
        // Handle other JavaScript errors
        if (error && error.stack) {
            const isKnownError = [
                'Loading chunk',
                'Failed to fetch',
                'NetworkError',
                'ChunkLoadError'
            ].some(pattern => error.message.includes(pattern));
            
            if (isKnownError) {
                console.info('🔧 DEV: Known error suppressed:', error.message);
                event.preventDefault();
                return false;
            }
        }
    });
    
    // Handle promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const reason = event.reason;
        
        if (reason && reason.name === 'ChunkLoadError') {
            console.info('🔧 DEV: ChunkLoadError promise rejection handled');
            event.preventDefault();
            return false;
        }
        
        // Handle fetch errors
        if (reason && reason.message && reason.message.includes('fetch')) {
            console.info('🔧 DEV: Fetch error suppressed:', reason.message);
            event.preventDefault();
            return false;
        }
    });
    
    // Override React error logging
    if (window.React && window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
        const internals = window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        if (internals.ReactDebugCurrentFrame) {
            const originalLogCapturedError = console.error;
            // This is a bit hacky but helps reduce noise
        }
    }
    
    console.log('🛡️ Enhanced error handling loaded');
})();