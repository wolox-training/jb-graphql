const { user: User } = require('../../models'),
  errors = require('../../errors'),
  logger = require('../../logger'),
  { encryptPassword } = require('../../helpers'),
  { checkLogin } = require('../../services/user');

exports.createUser = async user => {
  try {
    const hashedPassword = await encryptPassword(user.password);
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

exports.signIn = async user => {
  const token = await checkLogin(user);
  return { accessToken: token };
};
