const { getAllMovies, moviePost, setMovieActors, setMovieDirectors, setMovieGenres } = require('../controllers/movie.controllers');
const {getAllActors, actorPost, removeActor, updateActor} = require("../controllers/Actor.controllers");
const { getAllDirectors, directorPost, removeDirector, updateDirector } = require('../controllers/Director.controllers');
const express = require('express');
const { getAllGenre, postGenre } = require('../controllers/Genre.controlles');

const movieRouter = express.Router();

movieRouter.route("/")
	.get(getAllMovies)
        .post(moviePost)

movieRouter.route("/actors")
        .get(getAllActors)
        .post(actorPost)
movieRouter.route("/actors/:id")
        .delete(removeActor)
        .put(updateActor)

movieRouter.route("/directors")
        .get(getAllDirectors)
        .post(directorPost)
movieRouter.route("/directors/:id")
        .delete(removeDirector)
        .put(updateDirector)

movieRouter.route("/genres")
        .get(getAllGenre)
        .post(postGenre)

movieRouter.route("/:id/genres")
        .post(setMovieGenres)

movieRouter.route("/:id/directors")
        .post(setMovieDirectors)

movieRouter.route("/:id/actors")
        .post(setMovieActors)

module.exports = movieRouter;