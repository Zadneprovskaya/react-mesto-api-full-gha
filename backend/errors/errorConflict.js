// eslint-disable-next-line no-undef
const { CONFLICT_CODE } = require('../config/config');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_CODE;
  }
}

// eslint-disable-next-line no-undef
module.exports = ConflictError;
