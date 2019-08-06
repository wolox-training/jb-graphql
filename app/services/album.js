const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  logger = require('../logger');

exports.allAlbums = () =>
  axios
    .get(`${base_uri}/albums`)
    .then(response => response.data)
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
