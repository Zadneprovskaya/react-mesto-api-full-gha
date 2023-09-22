// eslint-disable-next-line no-undef
const { NOT_OWNER_CODE } = require('../config/config');

class NotOwnerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotOwnerError';
    this.statusCode = NOT_OWNER_CODE;
  }
}

// eslint-disable-next-line no-undef
module.exports = NotOwnerError;
