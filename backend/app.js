require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000, MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// Защита сервера
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const cors = require('./middlewares/cors');
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

mongoose.connect(MONGODB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(cors);

app.use(mainRouter);

app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
