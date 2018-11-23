const {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql')

module.exports = {
    description: 'upload a file to s3',
    args: {
        file: {
            type: GraphQLString,
        },
    },
    type: new GraphQLNonNull(GraphQLBoolean),
    resolve: async (params, args, { req }) => {
        return true
    },
}
