const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  errors = require('../errors'),
  logger = require('../logger'),
  helpers = require('../helpers');

exports.allAlbums = params => {
  const { sortField, sortOrder } = params.order;
  const { fieldFilter, valueFilter } = params.filter || {};
  return axios
    .get(`${base_uri}/albums`)
    .then(response => response.data)
    .then(albums => (fieldFilter ? helpers.search(albums, fieldFilter, valueFilter) : albums))
    .then(albums => helpers.order(albums, sortField, sortOrder))
    .then(albums => helpers.paginate(albums, params))
    .catch(error => {
      logger.error(error);
      throw errors.externalApiError('Cannot fetch albums from external api');
    });
};

exports.albumById = id =>
  axios
    .get(`${base_uri}/albums/${id}`)
    .then(response => response.data)
    .catch(error => {
      logger.error(error);
      throw errors.externalApiError('Cannot fetch album from external api');
    });

exports.photosByAlbumId = id =>
  axios
    .get(`${base_uri}/photos?albumId=${id}`)
    .then(response => response.data)
    .catch(error => {
      logger.error(error);
      throw errors.externalApiError('Cannot fetch photos from external api');
    });
