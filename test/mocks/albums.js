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

exports.getPhotosFourTimes = albumsIds => {
  albumsIds.map(albumId => exports.getPhotos(albumId));
};

exports.getPhotosTwoTimes = albumsIds => {
  albumsIds.map(albumId => exports.getPhotos(albumId));
};
