module.exports = (err, req, res, next) => {
  const { responseStatus = err.status || 500, message } = err;
  res.status(responseStatus).send({ message: responseStatus === 500 ? 'Ошибка на сервере' : message });
  next();
};
