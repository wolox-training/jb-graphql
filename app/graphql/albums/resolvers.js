const { allAlbums, albumById, photosByAlbumId } = require('../../services/album');

exports.getAlbum = async (_, params) => {
  const album = await albumById(params.id);
  const data = {
    ...album,
    artist: album.userId,
    name: album.title
  };
  return data;
};

exports.getAlbums = async (_, params) => {
  const tempAlbums = await allAlbums(params);
  const albums = tempAlbums.map(album => ({
    ...album,
    artist: album.userId
  }));
  return albums;
};

exports.getPhotos = async root => {
  const { id } = root;
  const photos = await photosByAlbumId(id);
  return photos;
};

exports.typeResolvers = {
  photos: exports.getPhotos
};
