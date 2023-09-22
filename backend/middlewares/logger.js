// eslint-disable-next-line no-undef
const winston = require('winston');
// eslint-disable-next-line no-undef
const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: '../../logs/request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: '../../logs/error.log' }),
  ],
  format: winston.format.json(),
});

// eslint-disable-next-line no-undef
module.exports = {
  requestLogger,
  errorLogger,
};
