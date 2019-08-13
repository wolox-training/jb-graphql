const { makeExecutableSchema } = require('graphql-tools'),
  ConstraintDirective = require('graphql-constraint-directive'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  albums = require('./albums'),
  healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...albums.schemas];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...healthCheck.queries,
      ...albums.queries
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.typeResolvers
    }
  },
  schemaDirectives: {
    constraint: ConstraintDirective
  }
});
