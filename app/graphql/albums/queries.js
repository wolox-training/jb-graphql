const { gql } = require('apollo-server'),
  { getAlbum, getAlbums } = require('./resolver'),
  { DEFAULT_OFFSET, DEFAULT_LIMIT, DEFAULT_SORTKEY, DEFAULT_SORTORDER } = require('../../constants');

module.exports = {
  queries: {
    album: (_, params) => getAlbum(_, params),
    albums: (_, params) => getAlbums(_, params)
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
      albums(offset: Int = ${DEFAULT_OFFSET}, 
      limit: Int = ${DEFAULT_LIMIT}, 
      order: SortingInput = { sortField: "${DEFAULT_SORTKEY}", sortOrder: "${DEFAULT_SORTORDER}" },
      filter: FilterInput
      ): [Album]!
    }
  `
};
