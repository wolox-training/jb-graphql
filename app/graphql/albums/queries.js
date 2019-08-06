const { gql } = require('apollo-server'),
  { getAlbum, getAlbums } = require('./resolver');

module.exports = {
  queries: {
    album: (_, params) => getAlbum(_, params),
    albums: (_, params) => getAlbums(_, params)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
      albums(offset: Int, limit: Int, orderBy: String!): [Album]!
    }
  `
};
