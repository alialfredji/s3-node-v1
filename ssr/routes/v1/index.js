const express = require('express')
const bodyParser = require('body-parser')

/**
 * Import sub routers
 */

const { createUploadRouter } = require('./upload')
const { createDownloadRouter } = require('./download')

/**
 * Router creator
 * it can receive configuration as parameter
 */

const createApiRouter = () => {
    const router = express.Router()

    router.use(bodyParser.json())

    router.use('/upload', [
        createUploadRouter(),
    ])

    router.use('/download', [
        createDownloadRouter(),
    ])

    router.get('/', (req, res) => res.send('+ok api v1'))

    return router
}

module.exports = {
    createApiRouter,
}
