const { MAP_ORDER } = require('./constants');

exports.paginate = (data, params) => {
  const { offset, limit } = params;
  return data.slice(offset, offset + limit);
};

exports.order = (data, sortKey, sortOrder) => {
  const ordering = MAP_ORDER[sortOrder];
  const sorting = (x, y) => (x >= y ? 1 : -1) * ordering;
  return data.sort((x, y) => sorting(x[sortKey], y[sortKey]));
};

exports.search = (data, filter, value) => data.filter(album => album[filter].toString() === value);
