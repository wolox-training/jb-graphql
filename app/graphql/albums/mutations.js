const { gql } = require('apollo-server'),
  { buyAlbum } = require('../albums/resolvers');

module.exports = {
  mutations: {
    buyAlbum: (_, params, context) => buyAlbum(_, params, context)
  },
  schema: gql`
    extend type Mutation {
      buyAlbum(albumId: ID!): Album!
    }
  `
};
