// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.place.nomoredomains.work',
  'http://mesto.place.nomoredomains.work',
  'https://api.mesto.place.nomoredomains.work',
  'http://api.mesto.place.nomoredomains.work',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = allowedCors;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  // предварительный запрос
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
