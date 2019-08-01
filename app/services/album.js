const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url;

exports.getAlbum = params =>
  axios.get(`${base_uri}/albums?id=${params.id}`).then(response => response.data[0]);

exports.getAlbumPhotos = id => axios.get(`${base_uri}/photos?albumId=${id}`).then(response => response.data);
