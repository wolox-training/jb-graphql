const { gql } = require('apollo-server'),
  { getAlbum, getAlbumPhotos } = require('../../services/album');

module.exports = {
  queries: {
    album: async (_, params) => {
      const album = await getAlbum(params);
      const albumPhotos = await getAlbumPhotos(params.id);
      album.artist = album.userId;
      delete album.userId;
      album.photos = albumPhotos;
      return album;
    }
  },
  schema: gql`
    extend type Query {
      album(id: ID): Album!
    }
  `
};
