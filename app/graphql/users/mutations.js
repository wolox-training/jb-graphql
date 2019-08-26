const { gql } = require('apollo-server'),
  { createUser, signIn } = require('../users/resolvers');

module.exports = {
  mutations: {
    createUser: (_, { user }) => createUser(user),
    login: (_, { credentials }) => signIn(credentials)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};
