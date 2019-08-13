const { user: User } = require('../../models'),
  errors = require('../../errors'),
  logger = require('../../logger'),
  helpers = require('../../helpers');

exports.createUser = async user => {
  try {
    const hash = await helpers.encryptPassword(user.password);
    user.password = hash;
    const storeUser = await User.create(user);
    logger.info(`The user ${user.firstName} ${user.lastName} was successfully created`);
    return storeUser;
  } catch (error) {
    logger.error(error);
    throw error.name === 'SequelizeUniqueConstraintError'
      ? errors.emailExistError('The email has already been taken.')
      : errors.defaultError();
  }
};
