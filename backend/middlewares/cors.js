// Массив доменов, с которых разрешены кросс-доменные запросы
const ALLOWED_CORS = {
  origin: [
    'https://mestolesnoy.nomoredomains.work',
    'http://mestolesnoy.nomoredomains.work',
    'https://api.mestolesnoy.nomoredomains.work',
    'http://api.mestolesnoy.nomoredomains.work',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'origin', 'authorization'],
  credentials: true,
};

module.exports = { ALLOWED_CORS };
