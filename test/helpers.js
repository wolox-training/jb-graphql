const usersFactory = require('./factories/user');
const { mutate } = require('./server.spec');
const { createUser } = require('./users/graphql');

exports.createUser = () => usersFactory.attributes().then(user => mutate(createUser(user)));
