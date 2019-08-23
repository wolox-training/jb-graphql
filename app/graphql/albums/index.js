const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { typeResolvers } = require('./resolvers');

module.exports = {
  queries,
  mutations,
  typeResolvers,
  schemas: [queriesSchema, mutationSchema]
};
