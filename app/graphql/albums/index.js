const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { typeResolvers } = require('./resolvers'),
  middleware = require('./middleware');

module.exports = {
  queries,
  mutations,
  middleware,
  typeResolvers,
  schemas: [queriesSchema, mutationSchema]
};
