const logger = require('../logger');
const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.createModel = user =>
    User.create(user).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.getOne = user =>
    User.findOne({ where: user }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.getAll = () =>
    User.findAll().catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.getByUsername = username =>
    User.getOne({ username }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.prototype.updateModel = props =>
    this.update(props).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  return User;
};
