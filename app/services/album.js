const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  logger = require('../logger'),
  helpers = require('../helpers');

exports.allAlbums = (offset = 0, limit = 10, sortKey = null, sortOrder = 'ASC') =>
  axios
    .get(`${base_uri}/albums`)
    .then(response => {
      const paginated = helpers.paginated(response.data, offset, limit);
      const albums = sortKey ? helpers.order(paginated, sortKey, sortOrder) : paginated;
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

exports.photosByAlbumId = id =>
  axios
    .get(`${base_uri}/photos?albumId=${id}`)
    .then(response => response.data)
    .catch(err => {
      logger.error(err);
      throw new Error('Cannot fetch photos from external api');
    });
