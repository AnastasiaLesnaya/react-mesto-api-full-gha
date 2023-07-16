// Переменные окружения из .env
require('dotenv').config();

const { PORT = 3000 } = process.env;
const { MONGODB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { JWT_SECRET = 'supersecret' } = process.env;

module.exports = {
  PORT,
  MONGODB,
  JWT_SECRET,
};
