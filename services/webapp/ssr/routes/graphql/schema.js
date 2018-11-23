
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')

const s3Upload = require('./s3-upload.mutation')

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
        },
    },
    // fields: () => ({}),
})

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        hello: {
            type: GraphQLString,
        },
        s3Upload,
    }),
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

module.exports = schema
