const { allAlbums, albumById, photosByAlbumId } = require('../../services/album'),
  { changeUserIdByArtist } = require('../../helpers');

exports.getAlbum = async (_, params) => {
  const album = await albumById(params.id);
  return changeUserIdByArtist(album);
};

exports.getAlbums = async (_, params) => {
  const tempAlbums = await allAlbums(params);
  return tempAlbums.map(album => changeUserIdByArtist(album));
};

exports.getPhotos = root => {
  const { id } = root;
  return photosByAlbumId(id);
};

exports.typeResolvers = {
  photos: exports.getPhotos
};
