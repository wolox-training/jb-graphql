const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  logger = require('../logger'),
  helpers = require('../helpers');

exports.allAlbums = params =>
  axios
    .get(`${base_uri}/albums`)
    .then(response => {
      const { sortKey, sortOrder = 'ASC', filter } = params;
      const dataAlbums = filter ? helpers.search(response.data, filter) : response.data;
      const paginated = helpers.paginated(dataAlbums, params);
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
