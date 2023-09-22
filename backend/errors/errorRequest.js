// eslint-disable-next-line no-undef
const { ERROR_CODE } = require('../config/config');

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

// eslint-disable-next-line no-undef
module.exports = RequestError;
