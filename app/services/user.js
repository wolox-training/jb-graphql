const { user: User } = require('../models'),
  { checkPassword } = require('../helpers'),
  logger = require('../logger'),
  errors = require('../errors'),
  { generateToken } = require('./jwt-encryption');

exports.checkLogin = credentials => {
  const { username, password } = credentials;
  return User.getByUsername(username)
    .then(user => {
      if (!user) {
        logger.error(`The username provided is incorrect for the user ${username}`);
        throw errors.signInError('The username provided is incorrect');
      }

      if (!checkPassword(password, user.password)) {
        logger.error(`The password provided is incorrect for the user ${username}`);
        throw errors.signInError('The password provided is incorrect');
      }
      logger.error(`user ${username} authenticated correctly`);
      return generateToken(user);
    })
    .catch(error => {
      logger.error(`Failed to authenticate. Error: ${error}`);
      throw errors.unauthorizedError(error);
    });
};
