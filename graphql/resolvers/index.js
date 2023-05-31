const authResolvers = require("./authResolvers");
const articleResolvers = require("./articlesResolvers");

const resolvers = {
    Query: {
        ...authResolvers.Query,
        ...articleResolvers.Query
    },
    Mutation: {
        ...authResolvers.Mutation,
        ...articleResolvers.Mutation
    }
}

module.exports = resolvers;