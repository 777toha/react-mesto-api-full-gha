require('dotenv').config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { postUsers, login } = require('./controllers/users');
const { loginValidation, postUsersValidation } = require('./middlewares/validate');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger, } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
const PORT = 3000;

const allowedCors = [
  'https://project-mesto.antonlystso.nomoredomains.work',
  'https://mesto.antonlystsov.back.nomoredomains.work',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (req === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).send();
  }

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', postUsersValidation, postUsers);
app.post('/signin', loginValidation, login);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
