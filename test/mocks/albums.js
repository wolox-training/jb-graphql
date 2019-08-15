const nock = require('nock'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  albumsFactory = require('../factories/album'),
  photosFactory = require('../factories/photos');

exports.getAlbum = (albumId, responseAlbum = albumsFactory.oneAlbum) => {
  nock(base_uri)
    .get(`/albums/${albumId}`)
    .reply(200, responseAlbum);
};

exports.getAlbumsApiError = albumId => {
  nock(base_uri)
    .get(`/albums}/${albumId}`)
    .replyWithError('Cannot fetch albums from external api');
};

exports.getAlbums = (responseAlbums = albumsFactory.allAlbums) => {
  nock(base_uri)
    .get('/albums')
    .reply(200, responseAlbums);
};

exports.getPhotos = (albumId, responsePhotos = photosFactory.allPhotos) => {
  nock(base_uri)
    .get('/photos')
    .query({ albumId })
    .reply(200, responsePhotos);
};

exports.getPhotosFiveTimes = () => {
  exports.getPhotos(1);
  exports.getPhotos(2);
  exports.getPhotos(3);
  exports.getPhotos(4);
  exports.getPhotos(5);
};

exports.getPhotosTwoTimes = () => {
  exports.getPhotos(2);
  exports.getPhotos(3);
};
