const jwt = require('jwt-simple'),
  config = require('../../config'),
  { secret_key } = config.common.jwt;

exports.generateToken = user => {
  const tokenPayload = {
    id: user.id,
    username: user.username
  };
  return jwt.encode(tokenPayload, secret_key);
};
