const jwt = require('jwt-simple'),
  config = require('../../config'),
  { secret_key } = config.common.jwt;

exports.generateToken = user => {
  const tokenPayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
  return jwt.encode(tokenPayload, secret_key);
};
