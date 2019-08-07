exports.paginated = (data, params) => {
  const { offset = 0, limit = 5 } = params;
  return data.slice(offset, offset + limit);
};

exports.order = (data, sortKey, sortOrder) => {
  const sorting = sortOrder === 'ASC' ? -1 : 1;
  return data.sort((album1, album2) => (album1[sortKey] >= album2[sortKey] ? 1 : sorting));
};

exports.search = (data, search) => data.filter(album => album.title === search);
