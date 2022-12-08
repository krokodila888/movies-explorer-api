require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const router = require('./routes');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  ERROR_MESSAGE,
} = require('./utils/utils');
const { MONGO_URL } = require('./utils/configUrl');

const { PORT = 3001 } = process.env;
mongoose.connect(MONGO_URL);

const app = express();
const { cors } = require('./middlewares/corsHandler');

app.use(cors);

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const errorsHandler = require('./middlewares/errorsHandler');

app.use(requestLogger);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(ERROR_MESSAGE.SERVER_FALL);
  }, 0);
});

app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
});
