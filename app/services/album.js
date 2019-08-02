const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  logger = require('../logger');

exports.getAlbum = params =>
  axios
    .get(`${base_uri}/albums?id=${params.id}`)
    .then(response => response.data[0])
    .catch(error => {
      logger.error(error);
    });

exports.getAlbumPhotos = id =>
  axios
    .get(`${base_uri}/photos?albumId=${id}`)
    .then(response => response.data)
    .catch(err => {
      logger.error(err);
    });
