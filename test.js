const jwt = require('jsonwebtoken');

const YOUR_JWT = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdlZjE0YmE5MDZkNWZlMzQ3MGYxYTgiLCJpYXQiOjE2NjkzMjIwMjcsImV4cCI6MTY2OTkyNjgyN30.eqZbcShW_X31sWvc2UiLuXZHGaIo0qP691d-UPy50Go'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = '5cdd18319448956087jhbfaf8a81541e'; // вставьте сюда секретный ключ для разработки из кода
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
