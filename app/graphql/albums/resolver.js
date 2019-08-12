const { allAlbums, albumById, photosByAlbumId } = require('../../services/album');

exports.getAlbum = async (_, params) => {
  const album = await albumById(params.id);
  const data = {
    ...album,
    artist: album.userId,
    name: album.title,
    photos: await photosByAlbumId(params.id)
  };
  return data;
};

exports.getAlbums = async (_, params) => {
  const tempAlbums = await allAlbums(params);
  const promisesPhotos = tempAlbums.map(album => photosByAlbumId(album.id));
  const photosRensponse = await Promise.all(promisesPhotos);
  const albums = tempAlbums.map((album, index) => ({
    ...album,
    artist: album.userId,
    photos: photosRensponse[index]
  }));
  return albums;
};
