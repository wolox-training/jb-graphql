const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  logger = require('../logger');

exports.allAlbums = (offset, limit, orderedBy) =>
  axios
    .get(`${base_uri}/albums`)
    .then(response => {
      const pagination = response.data.slice(offset, offset + limit);
      const albums = pagination.sort((album1, album2) => (album1[orderedBy] >= album2[orderedBy] ? 1 : -1));
      return albums;
    })
    .catch(error => {
      logger.error(error);
      throw new Error('Cannot fetch albums from external api');
    });

exports.albumById = id =>
  axios
    .get(`${base_uri}/albums/${id}`)
    .then(response => response.data)
    .catch(error => {
      logger.error(error);
      throw new Error('Cannot fetch album from external api');
    });

exports.photosPerAlbum = id =>
  axios
    .get(`${base_uri}/photos?albumId=${id}`)
    .then(response => response.data)
    .catch(err => {
      logger.error(err);
      throw new Error('Cannot fetch photos from external api');
    });
