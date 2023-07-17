require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// Защита сервера
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB);
app.use(requestLogger);
app.use(cors({
  origin: 'https://mestolesnoy.nomoredomains.work',
}));

app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(mainRouter);
app.use(errors());
app.use(responseHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
