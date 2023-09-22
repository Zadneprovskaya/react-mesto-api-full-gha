// eslint-disable-next-line no-undef
const { UNAUTHORIZED_CODE } = require('../config/config');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

// eslint-disable-next-line no-undef
module.exports = AuthError;
