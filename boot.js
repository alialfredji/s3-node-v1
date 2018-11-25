
const winston = require('winston')
const { get: getConfig } = require('@marcopeg/utils/lib/config')

// Include Services
const env = require('./ssr/services/env')
const server = require('./ssr/services/server')
const s3 = require('./ssr/services/s3')

// Env Defaults
const defaultEnv = {
    ssrPort: 8080,
}

const boot = async () => {
    try {
        // init services
        winston.verbose('[boot] init services...')
        await env.init()

        await s3.init({
            AWS_ACCESS_KEY: getConfig('AWS_ACCESS_KEY'),
            AWS_SECRET_ACCESS_KEY: getConfig('AWS_SECRET_ACCESS_KEY'),
            AWS_REGION: getConfig('AWS_REGION'),
            AWS_S3_BUCKET_NAME: getConfig('AWS_S3_BUCKET_NAME'),
        })
        await s3.start()

        const Loadable = require('react-loadable') // eslint-disable-line
        await Loadable.preloadAll()

        // start services
        winston.verbose('[boot] start services...')
        await server.start({
            port: getConfig('SSR_PORT', defaultEnv.ssrPort),
        })

        winston.verbose('[boot] complete!')
    } catch (err) {
        winston.error('===== BOOT ERROR ======')
        winston.error(err.message)
        winston.debug(err)
        console.log(err)
    }
}

module.exports = boot()
