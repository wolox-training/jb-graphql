const { purchase: Purchase } = require('../models'),
  error = require('../errors'),
  logger = require('../logger');

exports.createPurchase = buy =>
  Purchase.createModel(buy)
    .then(([user, created]) => {
      if (!created) {
        throw error.alreadyExistsError(`The user has already bought album with id ${buy.albumId}`);
      }
      logger.info(`the user bought the book ${buy.albumId}!`);
      return user;
    })
    .catch(err => {
      logger.error(`Could not create purchase for book: ${buy.albumId}`);
      throw error.dbError(err.message);
    });
