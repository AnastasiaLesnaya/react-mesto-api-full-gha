// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Защита сервера
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ALLOWED_CORS } = require('./middlewares/cors');

// Роуты
const mainRouter = require('./routes/index');

const app = express();
app.use(cors(ALLOWED_CORS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// https://www.npmjs.com/package/express-rate-limit
// Для ограничения кол-ва запросов. Для защиты от DoS-атак.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const responseHandler = require('./middlewares/res-handler');

const MONGODB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.connect(MONGODB);

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

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
