
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
        },
    },
})

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        hello: {
            type: GraphQLString,
        },
    },
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

module.exports = schema
