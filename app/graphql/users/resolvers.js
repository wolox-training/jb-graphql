const { user: User } = require('../../models'),
  errors = require('../../errors'),
  logger = require('../../logger'),
  { checkLogin } = require('../../services/user'),
  { addFullName, encryptPassword } = require('../../helpers');

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
  const accessToken = await checkLogin(user);
  return { accessToken };
};
exports.getUser = user => User.getOne(user).then(addFullName);

exports.getUsers = () => User.getAll().then(users => users.map(addFullName));
