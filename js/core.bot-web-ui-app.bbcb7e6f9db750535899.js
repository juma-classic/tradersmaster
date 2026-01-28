// Mock Bot Web UI App
(self["webpackChunk"] = self["webpackChunk"] || []).push([
    ["bot-web-ui-app"], {
        "./App/Components/BotBuilder": () => ({
            __esModule: true,
            default: () => React.createElement('div', {className: 'bot-builder'}, 'Bot Builder - Mock Component')
        }),
        "./App/Containers/BotDashboard": () => ({
            __esModule: true,
            default: () => React.createElement('div', {className: 'bot-dashboard'}, 'Bot Dashboard - Mock Component')
        })
    }
]);
console.log('🤖 Mock Bot Web UI App loaded');