const { getAllGenre, postGenre, removeGenre } = require('../controllers/Genre.controlles');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route("/")
        .get(getAllGenre)
        .post(postGenre)
genreRouter.route("/:id")
        .delete(removeGenre)

module.exports = genreRouter;