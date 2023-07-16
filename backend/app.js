// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

// Защита сервера
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cors = require('./middlewares/cors');

const { MONGODB, PORT } = require('./config');

// Роуты
const mainRouter = require('./routes/index');

const app = express();

// https://www.npmjs.com/package/express-rate-limit
// Для ограничения кол-ва запросов. Для защиты от DoS-атак.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const responseHandler = require('./middlewares/res-handler');

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(mainRouter);

app.use(errorLogger);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
