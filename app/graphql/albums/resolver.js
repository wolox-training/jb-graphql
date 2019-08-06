const { allAlbums, albumById, photosPerAlbum } = require('../../services/album');

const albumPhotos = id => photosPerAlbum(id);

exports.getAlbum = async (_, params) => {
  const album = await albumById(params.id);
  const data = {
    ...album,
    artist: album.userId,
    name: album.title,
    photos: await photosPerAlbum(params.id)
  };
  return data;
};

exports.getAlbums = async (_, params) => {
  const tempAlbums = await allAlbums(params.offset, params.limit, params.orderBy);
  const promisesPhotos = tempAlbums.map(album => albumPhotos(album.id));
  const photosRensponse = await Promise.all(promisesPhotos);
  const albums = tempAlbums.map((album, index) => ({
    ...album,
    artist: album.userId,
    photos: photosRensponse[index]
  }));
  return albums;
};
