
// Setup winston log level
const winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'verbose'
winston.verbose('[boot] warming up...')

// SSR - ES6 Compatibility (for client-side code)
// (this is needed only for **SSR_ENABLED=yes**)
// (you can comment it out if not using SSR for better memory footprint)
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: [
        [ 'env', {'targets': { 'node': 'current', 'browsers': [ 'last 2 versions', 'safari >= 7' ] }}], // eslint-disable-line
        'react-app',
    ],
    plugins: [
        [ 'module-resolver', { root: ['./src'] } ],
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
    ],
})
// <--> ES6 Compatibility (for client-side code)

// SSR - Handle Images
require('create-react-app-ssr/lib/create-ignore-styles').createIgnoreStyles()

// SSR - Isomorphic Fetch
require('es6-promise').polyfill()
require('isomorphic-fetch')
// <--> Isomorphic Fetch

// Boot the app
require('./boot')

// Almost gracefully exit
process.on('SIGTERM', function () {
    process.exit(0)
})
