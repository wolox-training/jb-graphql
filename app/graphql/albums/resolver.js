const { getAlbum, getAlbumPhotos } = require('../../services/album');

exports.dataAlbum = async (_, params) => {
  const albums = await getAlbum(params);
  const albumsPhotos = await getAlbumPhotos(params.id);
  return {
    ...albums,
    artist: albums.userId,
    name: albums.title,
    photos: albumsPhotos.map(photo => ({ ...photo, name: photo.title }))
  };
};
