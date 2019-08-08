exports.paginate = (data, params) => {
  const { offset, limit } = params;
  return data.slice(offset, offset + limit);
};

exports.order = (data, sortKey, sortOrder) => {
  const ordering = { DESC: -1, ASC: 1 }[sortOrder] || 1;
  const sorting = (x, y) => (x >= y ? 1 : -1) * ordering;
  return data.sort((x, y) => sorting(x[sortKey], y[sortKey]));
};

exports.search = (data, filter, value) => data.filter(album => album[filter].toString() === value);
