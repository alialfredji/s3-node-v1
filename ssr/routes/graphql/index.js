
const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema')

const graphQLHandler = () => (req, res) => graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res },
})(req, res)

const createGraphqlRouter = (settings) => {
    const router = express.Router()

    router.use('/', [
        graphQLHandler(),
    ])

    return router
}

module.exports = {
    createGraphqlRouter,
}
