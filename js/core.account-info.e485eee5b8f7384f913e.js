// Mock Account Info
(self["webpackChunk"] = self["webpackChunk"] || []).push([
    ["account-info"], {
        "./App/Components/AccountInfo": () => ({
            __esModule: true,
            default: () => React.createElement('div', {
                className: 'account-info',
                style: {
                    background: '#e8f5e8',
                    padding: '1rem',
                    borderRadius: '8px',
                    margin: '1rem 0'
                }
            }, [
                React.createElement('h3', {key: 'title'}, 'Account Information'),
                React.createElement('p', {key: 'demo'}, 'Demo Account - $10,000 USD'),
                React.createElement('p', {key: 'status'}, 'Status: Active (Mock)')
            ])
        })
    }
]);
console.log('💰 Mock Account Info loaded');