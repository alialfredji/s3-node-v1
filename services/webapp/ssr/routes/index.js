const express = require('express')
const { createSSRRouter } = require('create-react-app-ssr/lib/create-ssr-router')
const { createApiRouter } = require('./v1')
const { createGraphqlRouter } = require('./graphql')

const createAppRouter = (settings) => {
    const router = express.Router()

    // serve data API
    router.use('/api/graphql', createGraphqlRouter())

    // serve data API
    router.use('/api/v1', createApiRouter())

    // ssr - serve client app
    // create-react-app-ssr
    router.use(createSSRRouter(settings))

    return router
}

module.exports = {
    createAppRouter,
}
