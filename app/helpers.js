exports.paginated = (data, offset, limit) => data.slice(offset, offset + limit);

exports.order = (data, sortKey, sortOrder) => {
  const sorting = sortOrder === 'ASC' ? -1 : 1;
  return data.sort((album1, album2) => (album1[sortKey] >= album2[sortKey] ? 1 : sorting));
};
