const { user: User } = require('../../models'),
  logger = require('../../logger'),
  helpers = require('../../helpers');

exports.createUser = async user => {
  try {
    user.password = helpers.encryptPassword(user.password);
    const storeUser = await User.create(user);
    logger.info(`The user ${user.firstName} ${user.lastName} was successfully created`);
    return storeUser;
  } catch (error) {
    logger.error(error);
    return error;
  }
};
