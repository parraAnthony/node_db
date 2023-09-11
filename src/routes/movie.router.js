const { getAllMovies, moviePost, setMovieActors, setMovieDirectors, setMovieGenres, updateMovie, removeMovie } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route("/")
	.get(getAllMovies)
        .post(moviePost)
movieRouter.route("/:id")
        .put(updateMovie)
        .delete(removeMovie)

movieRouter.route("/:id/genres")
        .post(setMovieGenres)

movieRouter.route("/:id/directors")
        .post(setMovieDirectors)

movieRouter.route("/:id/actors")
        .post(setMovieActors)

module.exports = movieRouter;