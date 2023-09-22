// eslint-disable-next-line no-undef
const { NOT_FOUND_CODE } = require('../config/config');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

// eslint-disable-next-line no-undef
module.exports = NotFoundError;
