// Mock Header Components
(self["webpackChunk"] = self["webpackChunk"] || []).push([
    ["default-Header"], {
        "./App/Components/Layout/Header/index.js": () => ({
            __esModule: true,
            default: () => React.createElement('header', {
                className: 'mock-header',
                style: {
                    background: '#2c3e50',
                    color: 'white',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }
            }, [
                React.createElement('div', {key: 'logo'}, '🚀 Trading Bot'),
                React.createElement('div', {key: 'nav'}, 'Navigation - Mock')
            ])
        }),
        "./App/Components/Layout/Header/toggle-menu-drawer.js": () => ({
            __esModule: true,
            default: () => React.createElement('button', {className: 'menu-toggle'}, '☰')
        })
    }
]);
console.log('🎯 Mock Header Components loaded');