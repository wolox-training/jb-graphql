const { gql } = require('apollo-server'),
  { DEFAULT_OFFSET, DEFAULT_LIMIT, DEFAULT_SORTKEY, DEFAULT_SORTORDER } = require('../../app/constants');

const getAlbum = id => gql`
  query {
    album(id: ${id}) {
      id
      title
      artist
      photos {
        id
        title
      }
    }
  }
`;

const getAlbums = params => {
  const {
    offset,
    limit,
    fieldFilter = '',
    valueFilter = '',
    sortField = DEFAULT_SORTKEY,
    sortOrder = DEFAULT_SORTORDER
  } = params;
  return gql`
  query {
    albums(
      offset: ${offset || DEFAULT_OFFSET}, 
      limit: ${limit || DEFAULT_LIMIT},
      filter: {fieldFilter:"${fieldFilter}", valueFilter:"${valueFilter}"},
      order: {sortField:"${sortField}", sortOrder:"${sortOrder}"}
      ) {
      id
      title
      artist
      photos {
        id, title
      }
    }
  }
`;
};

const buyAlbum = albumId => ({
  mutation: gql`
    mutation buyAlbum($albumId: ID!) {
      buyAlbum(albumId: $albumId) {
        id
        title
      }
    }
  `,
  variables: { albumId }
});

module.exports = { getAlbum, getAlbums, buyAlbum };
