const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      req.user = payload;
      next();
    } catch (e) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
  }
};

module.exports = {
  auth,
};
