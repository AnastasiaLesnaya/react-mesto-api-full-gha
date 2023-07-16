const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const Unauthorized = require('../utils/errors/Unauthorized');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходимо авторизоваться'));
  }

  let payload;
  // токен
  const userToken = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(userToken, NODE_ENV === 'production' ? JWT_SECRET : 'supersecret');
  } catch (_) {
    return next(new Unauthorized('Необходимо авторизоваться'));
  }

  req.user = payload;
  next();
};
