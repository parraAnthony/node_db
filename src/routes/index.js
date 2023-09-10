const express = require('express');
const userRouter = require('./user.router');
const movieRouter = require('./movie.router')
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter)
router.use('/movies', movieRouter)

module.exports = router;