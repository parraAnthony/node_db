const express = require('express');
const movieRouter = require('./movie.router');
const genreRouter = require('./genre.router');
const directorRouter = require('./director.router');
const actorRouter = require('./actor.router');
const CrudRouter = require('./crud.router');
const userRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/cruds', CrudRouter)
router.use('/movies', movieRouter)
router.use("/directors", directorRouter)
router.use("/actors", actorRouter)
router.use("/genres", genreRouter)
router.use("/users", userRouter)

module.exports = router;