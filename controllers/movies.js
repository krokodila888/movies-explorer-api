const Movie = require('../models/movie');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const WrongMovieError = require('../errors/WrongMovieError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  // const { name, link } = req.body;
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.MOVIE_POST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ERROR_MESSAGE.MOVIE_DELETE_NO_ID);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new WrongMovieError('Этот фильм удалить нельзя. Его добавил кто-то другой.');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ data: movie }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.MOVIE_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};
