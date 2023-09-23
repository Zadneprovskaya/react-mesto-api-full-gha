// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const helmet = require('helmet');
// eslint-disable-next-line no-undef
const { errors } = require('celebrate');
// eslint-disable-next-line no-undef
//const cors = require('cors');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
// eslint-disable-next-line no-undef
const { userRouter } = require('./routes/users');
// eslint-disable-next-line no-undef
const { cardRouter } = require('./routes/cards');
// eslint-disable-next-line no-undef
const { ERROR_DEFAULT_CODE } = require('./config/config');
// eslint-disable-next-line no-undef
const { createUser, login } = require('./controllers/users');
// eslint-disable-next-line no-undef
const NotFoundError = require('./errors/errorNotFound');
// eslint-disable-next-line no-undef
const auth = require('./middlewares/auth');
// eslint-disable-next-line no-undef
const cors = require('./middlewares/cors');
// eslint-disable-next-line no-undef
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
// eslint-disable-next-line no-undef
const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();

mongoose.connect(URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(cors);
app.use(auth);

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_DEFAULT_CODE
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
