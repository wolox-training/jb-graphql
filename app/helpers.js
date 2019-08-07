const { SORT_ORDER, ASC, DESC } = require('./constants');

exports.paginate = (data, params) => {
  const { offset, limit } = params;
  return data.slice(offset, offset + limit);
};

exports.order = (data, sortKey, sortOrder) => {
  const sorting = sortOrder === SORT_ORDER ? DESC : ASC;
  return data.sort((album1, album2) => (album1[sortKey] >= album2[sortKey] ? 1 : sorting));
};

exports.search = (data, search) => data.filter(album => album.title === search);
