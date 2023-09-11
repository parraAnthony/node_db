const express = require('express');
const userRouter = require('./user.router');
const movieRouter = require('./movie.router');
const genreRouter = require('./genre.router');
const directorRouter = require('./director.router');
const actorRouter = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/movies', movieRouter)
router.use("/directors", directorRouter)
router.use("/actors", actorRouter)
router.use("/genres", genreRouter)

module.exports = router;