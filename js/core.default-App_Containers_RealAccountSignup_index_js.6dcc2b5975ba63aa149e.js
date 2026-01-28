// Mock Real Account Signup
(self["webpackChunk"] = self["webpackChunk"] || []).push([
    ["default-RealAccountSignup"], {
        "./App/Containers/RealAccountSignup/index.js": () => ({
            __esModule: true,
            default: () => React.createElement('div', {className: 'account-signup'}, 'Account Signup - Mock Component')
        })
    }
]);
console.log('👤 Mock Real Account Signup loaded');