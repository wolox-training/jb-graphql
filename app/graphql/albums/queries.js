const { gql } = require('apollo-server'),
  { dataAlbum } = require('./resolver');

module.exports = {
  queries: {
    album: (_, params) => dataAlbum(_, params)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
    }
  `
};
