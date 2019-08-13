const { user: User } = require('../../models'),
  errors = require('../../errors'),
  logger = require('../../logger'),
  helpers = require('../../helpers');

exports.createUser = async user => {
  try {
    const hashedPassword = await helpers.encryptPassword(user.password);
    const storedUser = await User.create({ ...user, password: hashedPassword });
    logger.info(`The user ${user.firstName} ${user.lastName} was successfully created`);
    return storedUser;
  } catch (error) {
    logger.error(error);
    throw error.name === 'SequelizeUniqueConstraintError'
      ? errors.emailExistError('The email has already been taken.')
      : errors.defaultError();
  }
};
