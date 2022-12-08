const ERROR_CODE_WRONG_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_WRONG_MOVIE = 403;
const ERROR_CODE_DEFAULT = 500;
const RES_OK_CODE = 200 || 201;

const ERROR_MESSAGE = {
  USER_POST: 'Переданы некорректные данные при создании пользователя.',
  SOMETHING_WRONG: 'Ошибка по умолчанию.',
  USER_GET_ID: 'Пользователь по указанному _id не найден.',
  USER_PATCH_PROFILE_INV_DATA: 'Переданы некорректные данные при обновлении профиля.',
  USER_PATCH_ID_NOT_FOUND: 'Пользователь с указанным _id не найден.',
  PATCH_AV_INV_DATA: 'Переданы некорректные данные при обновлении аватара.',
  MOVIE_POST: 'Переданы некорректные данные при создании карточки.',
  MOVIE_DELETE_NO_ID: 'Карточка с указанным _id не найдена.',
  PUT_LIKE_INV_DATA: 'Переданы некорректные данные для постановки/снятии лайка.',
  DELETE_LIKE_NO_ID: 'Передан несуществующий _id карточки.',
  MOVIE_DEL_WRONG_ID: 'Передан некорректный _id.',
  AUTH_ERROR: 'Что-то пошло не так в процессе авторизации. Пожалуйста, попробуйте еще раз.',
  SERVER_FALL: 'Сервер сейчас упадёт',
  NOT_OWNER: 'Этот фильм удалить нельзя. Его добавил кто-то другой',
  DOUBLE_EMAIL: 'Такой email уже существует.',
  SERVER_ERROR: 'На сервере произошла ошибка',
  WRONG_LINK: 'Неправильный формат ссылки',
  WRONG_EMAIL: 'Неправильный формат почты',
  WRONG_EMAIL_OR_PASS: 'Неправильный формат почты или пароля',
  NO_SUCH_USER: 'Данный пользователь не зарегистрирован',
  RETURN_BACK: 'Вы сделали что-то не то. Вернитесь назад.',
};

const MESSAGE = {
  LOGOUT: 'Вы точно вышли из профиля',
  EXIT: 'Выход',
};

const URL_PATTERN = /^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  ERROR_CODE_WRONG_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_WRONG_MOVIE,
  ERROR_CODE_DEFAULT,
  ERROR_MESSAGE,
  RES_OK_CODE,
  URL_PATTERN,
  MESSAGE,
};
